import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import express, { type Request, type Response } from 'express';
import {
  CUSTOM_TEE_PRINT_TIERS,
  SHOPIFY_PRODUCTS,
  type CustomPrintTierKey,
} from './src/data/shopifyCatalog.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const FREE_SHIPPING_THRESHOLD = 1999;
const FLAT_SHIPPING_INR = 99;

interface OrderItemInput {
  productId: string;
  size: string;
  color?: string;
  frontPrint?: CustomPrintTierKey;
  backPrint?: CustomPrintTierKey;
  quantity: number;
}

interface VerifiedOrderLine {
  productId: string;
  title: string;
  size: string;
  color?: string;
  printSummary?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

interface StoredOrder {
  orderId: string;
  createdAt: string;
  paymentMethod: 'razorpay';
  paymentStatus: 'paid';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  customerName: string;
  customerPhoneE164: string;
  addressLine: string;
  items: VerifiedOrderLine[];
  subtotalInr: number;
  shippingInr: number;
  grandTotalInr: number;
}


function normalizeIndianPhoneE164(raw: string): string {
  const digits = String(raw || '').replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  if (digits.length >= 10 && digits.length <= 15) return `+${digits}`;
  return '';
}

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function computeCanonicalOrder(rawItems: unknown): {
  lines: VerifiedOrderLine[];
  subtotalInr: number;
  shippingInr: number;
  grandTotalInr: number;
} | null {
  if (!Array.isArray(rawItems) || rawItems.length === 0 || rawItems.length > 50) {
    return null;
  }

  const lines: VerifiedOrderLine[] = [];
  let subtotalInr = 0;

  for (const entry of rawItems) {
    if (!entry || typeof entry !== 'object') return null;
    const item = entry as Partial<OrderItemInput>;
    const product = SHOPIFY_PRODUCTS.find((p) => p.id === String(item.productId || ''));
    if (!product) return null;

    const qty = Number(item.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > 100) return null;

    const size = String(item.size || '').trim().slice(0, 24) || 'M';
    let unitPrice = product.minPrice;
    let printSummary: string | undefined;

    if (product.isCustomTee) {
      const fTier = CUSTOM_TEE_PRINT_TIERS.find((t) => t.key === item.frontPrint) || CUSTOM_TEE_PRINT_TIERS[0];
      const bTier = CUSTOM_TEE_PRINT_TIERS.find((t) => t.key === item.backPrint) || CUSTOM_TEE_PRINT_TIERS[0];
      unitPrice = 199 + fTier.charge + bTier.charge;
      printSummary = `Front: ${fTier.key} | Back: ${bTier.key}`;
    } else if (product.variants.length > 0) {
      const matched = product.variants.find(
        (v) => v.option1.toLowerCase() === size.toLowerCase()
      );
      if (matched) {
        unitPrice = matched.price;
      }
    }

    const lineTotal = unitPrice * qty;
    subtotalInr += lineTotal;
    lines.push({
      productId: product.id,
      title: product.title,
      size,
      color: item.color ? String(item.color).trim().slice(0, 40) : undefined,
      printSummary,
      unitPrice,
      quantity: qty,
      lineTotal,
    });
  }

  const shippingInr = subtotalInr >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_INR;
  const grandTotalInr = subtotalInr + shippingInr;
  return { lines, subtotalInr, shippingInr, grandTotalInr };
}

function buildCustomerReceiptText(order: StoredOrder): string {
  const statusLine = `Payment: PAID via Razorpay (${order.razorpayPaymentId})`;

  const itemsText = order.items
    .map(
      (it, idx) =>
        `${idx + 1}. ${it.title} (${it.size}${it.color ? `, ${it.color}` : ''}${
          it.printSummary ? `, ${it.printSummary}` : ''
        }) × ${it.quantity} = ${formatINR(it.lineTotal)}`
    )
    .join('\n');

  return [
    `Hi ${order.customerName}, your PrintStuff order *#${order.orderId}* is confirmed!`,
    statusLine,
    '',
    'Items:',
    itemsText,
    '',
    `Shipping: ${order.shippingInr === 0 ? 'FREE' : formatINR(order.shippingInr)}`,
    `Total Amount: ${formatINR(order.grandTotalInr)}`,
    `Delivery To: ${order.addressLine}`,
    '',
    'Thank you for shopping with PrintStuff!',
  ].join('\n');
}

async function dispatchAutomatedCustomerNotification(
  _order: StoredOrder,
  _messageText: string
): Promise<{ apiSent: boolean; provider: string; detail: string }> {
  return { apiSent: false, provider: 'disabled', detail: 'Automated WhatsApp and SMS confirmations are disabled.' };
}

async function startServer(shouldListen = true) {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  // Public gateway configuration status (never exposes secret keys)
  app.get('/api/orders/config', (_req: Request, res: Response) => {
    const keyId = process.env.RAZORPAY_KEY_ID?.trim() || '';
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() || '';


    res.json({
      razorpayConfigured: Boolean(keyId && keySecret),
      razorpayKeyId: keyId && keySecret ? keyId : '',
    });
  });

  // Step 1 of Razorpay checkout: compute authoritative total & create Razorpay order
  app.post('/api/orders/create-razorpay-order', async (req: Request, res: Response) => {
    const computed = computeCanonicalOrder(req.body?.items);
    if (!computed) {
      res.status(400).json({ error: 'Invalid cart items provided.' });
      return;
    }

    const keyId = process.env.RAZORPAY_KEY_ID?.trim() || '';
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() || '';
    const receiptRef = `PS-${Math.floor(100000 + Math.random() * 900000)}`;

    if (!keyId || !keySecret) {
      res.status(503).json({ error: 'Razorpay is not configured. Please try again later.' });
      return;
    }

    try {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const rzpResp = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: computed.grandTotalInr * 100,
          currency: 'INR',
          receipt: receiptRef,
          notes: {
            store: 'PrintStuff',
            itemCount: String(computed.lines.length),
          },
        }),
      });

      const rzpJson = (await rzpResp.json()) as {
        id?: string;
        amount?: number;
        currency?: string;
        error?: { description?: string };
      };

      if (!rzpResp.ok || !rzpJson.id) {
        res.status(502).json({
          error: rzpJson?.error?.description || 'Failed to create Razorpay order.',
        });
        return;
      }



      res.json({
        mode: 'live',
        razorpayKeyId: keyId,
        razorpayOrderId: rzpJson.id,
        amountPaise: rzpJson.amount,
        currency: rzpJson.currency || 'INR',
        receiptRef,
        subtotalInr: computed.subtotalInr,
        shippingInr: computed.shippingInr,
        grandTotalInr: computed.grandTotalInr,
      });
    } catch (err) {
      console.error('Razorpay order creation failed:', err);
      res.status(502).json({ error: 'Unable to reach Razorpay gateway right now.' });
    }
  });

  // Step 2: Verify Razorpay signature and confirm paid order
  app.post('/api/orders/verify-and-notify', async (req: Request, res: Response) => {
    const computed = computeCanonicalOrder(req.body?.items);
    if (!computed) {
      res.status(400).json({ error: 'Invalid order items.' });
      return;
    }

    const customer = req.body?.customer || {};
    const name = String(customer.name || '').trim().slice(0, 80);
    const city = String(customer.city || '').trim().slice(0, 60);
    const address = String(customer.address || '').trim().slice(0, 200);
    const postalCode = String(customer.postalCode || '').trim().slice(0, 12);
    const phoneE164 = normalizeIndianPhoneE164(String(customer.phone || ''));

    if (!name || !city || !address || !postalCode || !phoneE164) {
      res.status(400).json({
        error: 'Please enter a valid name, 10-digit mobile number, address, city, and PIN code.',
      });
      return;
    }

    const rzpOrderId = String(req.body?.razorpay_order_id || '').trim();
    const rzpPaymentId = String(req.body?.razorpay_payment_id || '').trim();
    const rzpSignature = String(req.body?.razorpay_signature || '').trim();
    const keyId = process.env.RAZORPAY_KEY_ID?.trim() || '';
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() || '';

    if (!keyId || !keySecret || !rzpOrderId || !rzpPaymentId || !rzpSignature) {
      res.status(400).json({ error: 'Missing Razorpay configuration or payment verification fields.' });
      return;
    }

    const expectedSig = crypto.createHmac('sha256', keySecret)
      .update(`${rzpOrderId}|${rzpPaymentId}`).digest('hex');
    const expectedBuf = Buffer.from(expectedSig, 'utf8');
    const actualBuf = Buffer.from(rzpSignature, 'utf8');
    if (expectedBuf.length !== actualBuf.length || !crypto.timingSafeEqual(expectedBuf, actualBuf)) {
      res.status(400).json({ error: 'Razorpay payment signature verification failed.' });
      return;
    }

    // Fetch the payment from Razorpay itself; this works across serverless instances.
    try {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const paymentResp = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(rzpPaymentId)}`, {
        headers: { Authorization: `Basic ${auth}` },
      });
      const payment = await paymentResp.json() as { id?: string; order_id?: string; amount?: number; currency?: string; status?: string };
      if (!paymentResp.ok || payment.id !== rzpPaymentId || payment.order_id !== rzpOrderId || payment.amount !== computed.grandTotalInr * 100 || payment.currency !== 'INR' || !['captured', 'authorized'].includes(payment.status || '')) {
        res.status(400).json({ error: 'Razorpay payment, order, amount, or status could not be verified.' });
        return;
      }
    } catch (err) {
      console.error('Razorpay payment lookup failed:', err);
      res.status(502).json({ error: 'Unable to verify payment with Razorpay. Please contact the store before retrying.' });
      return;
    }

    const paymentMethod: 'razorpay' = 'razorpay';
    const paymentStatus: StoredOrder['paymentStatus'] = 'paid';
    const razorpayOrderId = rzpOrderId;
    const razorpayPaymentId = rzpPaymentId;

    const orderId = `PS-${Math.floor(10000 + Math.random() * 90000)}`;
    const storedOrder: StoredOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      paymentMethod,
      paymentStatus,
      razorpayOrderId,
      razorpayPaymentId,
      customerName: name,
      customerPhoneE164: phoneE164,
      addressLine: `${address}, ${city} - ${postalCode}`,
      items: computed.lines,
      subtotalInr: computed.subtotalInr,
      shippingInr: computed.shippingInr,
      grandTotalInr: computed.grandTotalInr,
    };

    const receiptText = buildCustomerReceiptText(storedOrder);
    const notifyResult = { apiSent: false, provider: 'disabled', detail: 'Automated WhatsApp and SMS confirmations are disabled.' };

    res.json({
      verified: true,
      order: storedOrder,
      receiptText,
      notification: notifyResult,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  if (shouldListen) {
    app.listen(PORT, '0.0.0.0', () => console.log(`PrintStuff storefront running on http://0.0.0.0:${PORT}`));
  }
  return app;
}

export const appPromise = startServer(false);
const isDirectRun = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isDirectRun) {
  appPromise.then((app) => app.listen(PORT, '0.0.0.0', () => console.log(`PrintStuff storefront running on http://0.0.0.0:${PORT}`)))
    .catch((err) => { console.error('Failed to start server:', err); process.exit(1); });
}
