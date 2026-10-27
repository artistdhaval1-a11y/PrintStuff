import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash, timingSafeEqual } from 'node:crypto';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function respond(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return respond(res, 405, { error: 'Method not allowed' });
  }
  if (!supabaseUrl || !serviceKey) return respond(res, 503, { error: 'Order tracking is not configured yet.' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const orderNumber = typeof body?.orderNumber === 'string' ? body.orderNumber.trim().slice(0, 40) : '';
  const token = typeof body?.trackingToken === 'string' ? body.trackingToken : '';
  if (!/^PS-[A-Z0-9-]{6,30}$/.test(orderNumber) || token.length < 20 || token.length > 100) {
    return respond(res, 404, { error: 'Order not found. Check your order number and tracking link.' });
  }

  try {
    const url = new URL(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/orders`);
    url.searchParams.set('select', 'order_number,order_status,payment_status,total_quantity,subtotal,created_at,updated_at,courier_name,courier_tracking_number');
    url.searchParams.set('order_number', `eq.${orderNumber}`);
    url.searchParams.set('limit', '1');
    const response = await fetch(url, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }
    });
    if (!response.ok) return respond(res, 502, { error: 'Tracking is temporarily unavailable.' });
    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length !== 1) return respond(res, 404, { error: 'Order not found. Check your order number and tracking link.' });

    const expected = String(rows[0].tracking_token_hash || '');
    const actual = createHash('sha256').update(token).digest('hex');
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(actual, 'hex');
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return respond(res, 404, { error: 'Order not found. Check your order number and tracking link.' });
    }

    const row = rows[0];
    return respond(res, 200, {
      orderNumber: row.order_number,
      status: row.order_status,
      paymentStatus: row.payment_status,
      totalQuantity: row.total_quantity,
      subtotal: row.subtotal,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      courierName: row.courier_name,
      courierTrackingNumber: row.courier_tracking_number
    });
  } catch {
    return respond(res, 500, { error: 'Tracking is temporarily unavailable.' });
  }
}
