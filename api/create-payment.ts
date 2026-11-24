import type { VercelRequest, VercelResponse } from '@vercel/node';

function respond(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return respond(res, 405, { error: 'Method not allowed' });
  }
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return respond(res, 503, { error: 'Online payment is temporarily unavailable. Please contact PrintStuff.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const amount = Math.round(Number(body?.amount) * 100);
    if (!Number.isSafeInteger(amount) || amount < 100 || amount > 100000000) {
      return respond(res, 400, { error: 'Invalid payment amount.' });
    }
    const receipt = `PS-${Date.now()}`;
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount, currency: 'INR', receipt, payment_capture: 1 })
    });
    const result = await response.json() as { id?: string; amount?: number; currency?: string; error?: { description?: string } };
    if (!response.ok || !result.id) {
      console.error('Razorpay order creation failed', response.status, result.error?.description || '');
      return respond(res, 502, { error: 'Razorpay could not start the payment. Please try again.' });
    }
    return respond(res, 200, { keyId, razorpayOrderId: result.id, amount: result.amount, currency: result.currency });
  } catch {
    return respond(res, 400, { error: 'Unable to start online payment.' });
  }
}
