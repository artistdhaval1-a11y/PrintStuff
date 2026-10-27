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

const labels: Record<string, string> = {
  received: 'Order received',
  confirmed: 'Confirmed',
  in_production: 'In production',
  dispatched: 'Dispatched',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

export const OrderTracking: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<TrackingOrder[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const track = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setOrders([]);
    setLoading(true);
    try {
      const response = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not find orders for that mobile number.');
      setOrders(data.orders || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Tracking is temporarily unavailable.');
    } finally {
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
        <p className="mb-6 text-sm text-neutral-600">Enter the mobile number you used at checkout to see your recent orders.</p>
        <form onSubmit={track} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
          <label className="block text-sm font-semibold">Mobile number
            <input required type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your checkout mobile number" className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm" />
          </label>
          <p className="text-xs text-neutral-500">For privacy, enter the same number you provided with your order.</p>
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#202020] px-5 py-3 font-semibold text-white disabled:opacity-60"><Search className="h-4 w-4" />{loading ? 'Checking…' : 'Find my orders'}</button>
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
