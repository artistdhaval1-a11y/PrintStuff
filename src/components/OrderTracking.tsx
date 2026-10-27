import React, { useState } from 'react';
import { Search, PackageCheck, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

type TrackingOrder = {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalQuantity: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
  courierName?: string | null;
  courierTrackingNumber?: string | null;
};

type Msg91Config = {
  widgetId: string;
  tokenAuth: string;
  identifier: string;
  success: (data: unknown) => void;
  failure: (error: unknown) => void;
};
type Msg91Window = Window & {
  initSendOTP?: (config: Msg91Config) => void;
};

const labels: Record<string, string> = {
  received: 'Order received',
  confirmed: 'Confirmed',
  in_production: 'In production',
  dispatched: 'Dispatched',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

function getAccessToken(data: unknown): string {
  if (!data || typeof data !== 'object') return '';
  const record = data as Record<string, unknown>;
  for (const key of ['access-token', 'accessToken', 'token', 'message']) {
    if (typeof record[key] === 'string' && (record[key] as string).length > 20) return record[key] as string;
  }
  if (record.data && typeof record.data === 'object') return getAccessToken(record.data);
  return '';
}

export const OrderTracking: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<TrackingOrder[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchOrdersWithToken = async (accessToken: string) => {
    const response = await fetch('/api/track-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not find orders for this verified mobile number.');
    setOrders(data.orders || []);
  };

  const track = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setOrders([]);
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      setError('Enter a valid mobile number including country code if needed.');
      return;
    }
    const widgetId = import.meta.env.VITE_MSG91_WIDGET_ID as string | undefined;
    const tokenAuth = import.meta.env.VITE_MSG91_TOKEN_AUTH as string | undefined;
    if (!widgetId || !tokenAuth) {
      setError('OTP verification is not configured for Preview yet.');
      return;
    }
    const identifier = digits.length === 10 ? `91${digits}` : digits;
    setLoading(true);
    try {
      const msgWindow = window as Msg91Window;
      const launch = () => {
        if (!msgWindow.initSendOTP) throw new Error('MSG91 OTP widget could not be loaded. Please refresh and try again.');
        msgWindow.initSendOTP!({
          widgetId,
          tokenAuth,
          identifier,
          success: async (data: unknown) => {
            try {
              const accessToken = getAccessToken(data);
              if (!accessToken) throw new Error('MSG91 did not return a verification token. Please try again.');
              await fetchOrdersWithToken(accessToken);
            } catch (e) {
              setError(e instanceof Error ? e.message : 'Could not verify OTP. Please try again.');
            } finally {
              setLoading(false);
            }
          },
          failure: (reason: unknown) => {
            const message = typeof reason === 'string' ? reason : 'OTP verification failed. Please try again.';
            setError(message);
            setLoading(false);
          }
        });
      };
      if (msgWindow.initSendOTP) {
        launch();
      } else {
        const existing = document.querySelector<HTMLScriptElement>('script[data-msg91-otp]');
        const script = existing || document.createElement('script');
        script.src = 'https://verify.msg91.com/otp-provider.js';
        script.async = true;
        script.dataset.msg91Otp = 'true';
        script.onload = launch;
        script.onerror = () => {
          setError('Could not load MSG91 OTP. Please try again.');
          setLoading(false);
        };
        if (!existing) document.body.appendChild(script);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start OTP verification.');
      setLoading(false);
    }
  };

  return (
    <section id="track-order" className="bg-[#FFF9ED] text-[#202020] px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#D7FF00] p-3"><PackageCheck className="h-6 w-6" /></div>
          <div><p className="text-xs uppercase tracking-[0.2em] text-neutral-500">PrintStuff support</p><h2 className="text-3xl font-bold">Track your order</h2></div>
        </div>
        <p className="mb-6 text-sm text-neutral-600">Enter the mobile number you used at checkout. We’ll verify it with a one-time password before showing your orders.</p>
        <form onSubmit={track} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
          <label className="block text-sm font-semibold">Mobile number
            <input required type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your checkout mobile number" className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm" />
          </label>
          <p className="text-xs text-neutral-500">For privacy, enter the same number you provided with your order.</p>
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#202020] px-5 py-3 font-semibold text-white disabled:opacity-60"><Search className="h-4 w-4" />{loading ? 'Opening OTP verification…' : 'Verify mobile & find orders'}</button>
          {error && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}
        </form>
        {orders.map(result => <div key={result.orderNumber} className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-3"><CheckCircle2 className="h-6 w-6 text-emerald-600" /><div><p className="text-xs text-neutral-500">Order {result.orderNumber}</p><h3 className="text-xl font-bold">{labels[result.status] || result.status}</h3><p className="text-xs text-neutral-500">Placed {new Date(result.createdAt).toLocaleDateString('en-IN')}</p></div></div>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-neutral-500">Quantity</p><p className="font-semibold">{result.totalQuantity} pieces</p></div>
            <div><p className="text-neutral-500">Order total</p><p className="font-semibold">₹{Number(result.subtotal).toLocaleString('en-IN')}</p></div>
            <div><p className="text-neutral-500">Payment</p><p className="font-semibold capitalize">{result.paymentStatus.replace('_', ' ')}</p></div>
            <div><p className="text-neutral-500">Last updated</p><p className="font-semibold">{new Date(result.updatedAt).toLocaleDateString('en-IN')}</p></div>
          </div>
          {result.courierName && <p className="mt-4 flex items-center gap-2 text-sm"><Truck className="h-4 w-4" />{result.courierName}{result.courierTrackingNumber ? ' · ' + result.courierTrackingNumber : ''}</p>}
        </div>)}
      </div>
    </section>
  );
};
