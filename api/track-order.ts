import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function respond(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(body);
}

function normalizePhone(value: unknown): string {
  return typeof value === 'string' ? value.replace(/[^+\d]/g, '').slice(0, 30) : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return respond(res, 405, { error: 'Method not allowed' });
  }
  if (!supabaseUrl || !serviceKey) return respond(res, 503, { error: 'Order tracking is not configured yet.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const phone = normalizePhone(body?.phone);
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      return respond(res, 400, { error: 'Enter the mobile number used when placing your order.' });
    }

    const url = new URL(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/orders`);
    url.searchParams.set('select', 'order_number,order_status,payment_status,total_quantity,subtotal,created_at,updated_at,courier_name,courier_tracking_number');
    // Phone values are stored as entered at checkout. Query the normalized value first.
    url.searchParams.set('customer_phone', `eq.${phone}`);
    url.searchParams.set('order', 'created_at.desc');
    url.searchParams.set('limit', '20');
    const response = await fetch(url, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }
    });
    if (!response.ok) return respond(res, 502, { error: 'Tracking is temporarily unavailable.' });
    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return respond(res, 404, { error: 'No orders found for this mobile number. Use the same number you entered at checkout.' });
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
    return respond(res, 400, { error: 'Please enter a valid mobile number and try again.' });
  }
}
