import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const msg91Authkey = process.env.MSG91_AUTHKEY;

function respond(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(body);
}

function normalizeDigits(value: unknown): string {
  return typeof value === 'string' ? value.replace(/\D/g, '').slice(0, 15) : '';
}

function phoneCandidates(value: string): string[] {
  const digits = normalizeDigits(value);
  const candidates = new Set<string>([digits]);
  if (digits.startsWith('91') && digits.length === 12) candidates.add(digits.slice(2));
  if (digits.length === 10) candidates.add(`91${digits}`);
  if (digits.length === 12 && digits.startsWith('91')) candidates.add(`+${digits}`);
  if (digits.length === 10) candidates.add(`+91${digits}`);
  return [...candidates].filter(Boolean);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return respond(res, 405, { error: 'Method not allowed' });
  }
  if (!supabaseUrl || !serviceKey) return respond(res, 503, { error: 'Order tracking is not configured yet.' });
  if (!msg91Authkey) return respond(res, 503, { error: 'OTP verification is not configured on the server.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const accessToken = typeof body?.accessToken === 'string' ? body.accessToken.trim() : '';
    if (accessToken.length < 20 || accessToken.length > 5000) {
      return respond(res, 401, { error: 'Verify your mobile number with OTP before tracking your order.' });
    }

    // Never trust a phone number supplied by the browser. MSG91 returns the identifier
    // associated with this access token after validating it with the private Authkey.
    const verificationResponse = await fetch('https://control.msg91.com/api/v5/widget/verifyAccessToken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authkey: msg91Authkey
      },
      body: JSON.stringify({ 'access-token': accessToken })
    });
    const verification = await verificationResponse.json().catch(() => null);
    if (!verificationResponse.ok || !verification || verification.type !== 'success' || verification.code === '201') {
      return respond(res, 401, { error: 'Mobile verification failed or expired. Please verify again.' });
    }

    const verifiedIdentifier = typeof verification.message === 'string' ? verification.message : '';
    const verifiedPhone = normalizeDigits(verifiedIdentifier);
    if (verifiedPhone.length < 10 || verifiedPhone.length > 15) {
      return respond(res, 401, { error: 'MSG91 did not return a verified mobile number. Please try again.' });
    }

    const candidates = phoneCandidates(verifiedPhone);
    const url = new URL(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/orders`);
    url.searchParams.set('select', 'order_number,order_status,payment_status,total_quantity,subtotal,created_at,updated_at,courier_name,courier_tracking_number');
    if (candidates.length === 1) {
      url.searchParams.set('customer_phone', `eq.${candidates[0]}`);
    } else {
      url.searchParams.set('or', `(${candidates.map(value => `customer_phone.eq.${value}`).join(',')})`);
    }
    url.searchParams.set('order', 'created_at.desc');
    url.searchParams.set('limit', '20');

    const response = await fetch(url, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }
    });
    if (!response.ok) return respond(res, 502, { error: 'Tracking is temporarily unavailable.' });
    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return respond(res, 404, { error: 'No orders found for this verified mobile number.' });
    }

    return respond(res, 200, {
      orders: rows.map((row: any) => ({
        orderNumber: row.order_number,
        status: row.order_status,
        paymentStatus: row.payment_status,
        totalQuantity: row.total_quantity,
        subtotal: row.subtotal,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        courierName: row.courier_name,
        courierTrackingNumber: row.courier_tracking_number
      }))
    });
  } catch {
    return respond(res, 400, { error: 'Please try again. If the issue continues, contact PrintStuff support.' });
  }
}
