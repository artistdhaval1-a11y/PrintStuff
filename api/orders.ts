import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash, randomBytes, randomInt } from 'node:crypto';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function respond(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(body);
}

function clean(value: unknown, max = 500): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return respond(res, 405, { error: 'Method not allowed' });
  }
  if (!supabaseUrl || !serviceKey) {
    return respond(res, 503, { error: 'Order service is not configured yet.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const customer = body?.customer ?? {};
    const items = Array.isArray(body?.items) ? body.items : [];
    const name = clean(customer.name, 120);
    const phone = clean(customer.phone, 30);
    const address = clean(customer.address, 500);
    const city = clean(customer.city, 100);
    const pincode = clean(customer.pincode, 12);
    const email = clean(customer.email, 180);
    const notes = clean(customer.notes, 1000);

    if (name.length < 2 || !/^[+()\d\s-]{7,30}$/.test(phone) || address.length < 5 || city.length < 2 || !/^[A-Za-z0-9 -]{4,12}$/.test(pincode)) {
      return respond(res, 400, { error: 'Please provide a valid name, phone, address, city and PIN code.' });
    }
    if (!items.length || items.length > 30) {
      return respond(res, 400, { error: 'Your order must contain between 1 and 30 items.' });
    }

    const safeItems = items.map((item: any) => {
      const qty = Number(item.totalQuantity);
      const price = Number(item.totalPrice);
      if (!Number.isInteger(qty) || qty < 1 || qty > 10000 || !Number.isFinite(price) || price < 0 || price > 10000000) {
        throw new Error('An item has an invalid quantity or price.');
      }
      return {
        productId: clean(item.productId, 100),
        productName: clean(item.productName, 160),
        selectedColor: clean(item.selectedColor?.name, 80),
        sizeBreakdown: item.sizeBreakdown && typeof item.sizeBreakdown === 'object' ? item.sizeBreakdown : {},
        totalQuantity: qty,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(price),
        appliedTierLabel: clean(item.appliedTierLabel, 80),
        artworks: Array.isArray(item.artworks) ? item.artworks.slice(0, 12).map((art: any) => ({
          name: clean(art.name, 160),
          view: art.view === 'back' ? 'back' : 'front',
          placementPreset: clean(art.placementPreset, 80),
          printSize: clean(art.printSize, 20),
          x: Number(art.x) || 0,
          y: Number(art.y) || 0,
          width: Number(art.width) || 0
        })) : []
      };
    });

    const totalQuantity = safeItems.reduce((sum: number, item: any) => sum + item.totalQuantity, 0);
    const subtotal = safeItems.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
    const orderNumber = `PS-${new Date().toISOString().slice(2,10).replace(/-/g, '')}-${randomInt(100000, 999999)}`;
    const trackingToken = randomBytes(24).toString('base64url');
    const trackingTokenHash = createHash('sha256').update(trackingToken).digest('hex');

    const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        order_number: orderNumber,
        tracking_token_hash: trackingTokenHash,
        customer_name: name,
        customer_phone: phone,
        customer_email: email || null,
        delivery_address: address,
        city,
        pincode,
        order_items: safeItems,
        total_quantity: totalQuantity,
        subtotal,
        customer_notes: notes || null
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Supabase order insert failed', response.status, detail.slice(0, 500));
      return respond(res, 502, { error: 'We could not save your order. Please try again in a moment.' });
    }

    return respond(res, 201, { orderNumber, trackingToken, status: 'received' });
  } catch (error) {
    return respond(res, 400, { error: error instanceof Error ? error.message : 'Invalid order details.' });
  }
}
