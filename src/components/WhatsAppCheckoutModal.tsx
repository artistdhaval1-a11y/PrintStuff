import React, { useRef, useState } from 'react';
import { CartItem, CustomerDetails } from '../types';
import { X, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { Logo } from './Logo';

interface WebsiteCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  singleItem?: CartItem | null;
}

export const WhatsAppCheckoutModal: React.FC<WhatsAppCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  singleItem
}) => {
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    city: '',
    address: '',
    pincode: '',
    email: '',
    notes: ''
  });

  const [savedOrder, setSavedOrder] = useState<{ orderNumber: string; trackingToken: string } | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<string>('');
  const [deliveryState, setDeliveryState] = useState<string>('');
  const [shippingCharge, setShippingCharge] = useState<number | null>(null);
  const [pincodeStatus, setPincodeStatus] = useState<string>('');
  const pincodeRequestRef = useRef(0);

  const handlePincodeChange = async (rawValue: string) => {
    const pincode = rawValue.replace(/\D/g, '').slice(0, 6);
    setCustomer(prev => ({ ...prev, pincode }));
    const requestId = ++pincodeRequestRef.current;
    setDeliveryState('');
    setShippingCharge(null);
    setPincodeStatus('');
    if (pincode.length !== 6) return;
    setPincodeStatus('Checking PIN code…');
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      const office = data?.[0]?.Status === 'Success' ? data[0]?.PostOffice?.[0] : null;
      if (requestId !== pincodeRequestRef.current) return;
      if (!office?.State) {
        setPincodeStatus('PIN code not found. Please check and enter again.');
        return;
      }
      const state = String(office.State);
      setDeliveryState(state);
      setShippingCharge(state.trim().toLowerCase() === 'gujarat' ? 99 : 149);
      setPincodeStatus(`${office.District ? office.District + ', ' : ''}${state}`);
    } catch {
      if (requestId === pincodeRequestRef.current) setPincodeStatus('Could not verify PIN code. Please try again.');
    }
  };

  // Keep the checkout request below Vercel's payload limit by resizing artwork previews.
  // WebP preserves transparency and is only used for the order-upload copy; the editor keeps the original.
  const prepareArtworkForUpload = async (dataUrl: string): Promise<string> => {
    if (!dataUrl.startsWith('data:image/')) return '';
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const maxSide = 1400;
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
        canvas.height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
        const context = canvas.getContext('2d');
        if (!context) return resolve('');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (!blob) return resolve('');
          const reader = new FileReader();
          reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
          reader.onerror = () => resolve('');
          reader.readAsDataURL(blob);
        }, 'image/webp', 0.82);
      };
      image.onerror = () => resolve('');
      image.src = dataUrl;
    });
  };

  if (!isOpen) return null;

  // Active items list (either single item direct enquiry or entire cart)
  const checkoutItems = singleItem ? [singleItem] : items;
  const grandTotal = checkoutItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalPieces = checkoutItems.reduce((sum, item) => sum + item.totalQuantity, 0);
  const estimatedTotal = grandTotal + (shippingCharge ?? 0);

  const handlePlaceOrder = async () => {
    setOrderError('');
    if (!customer.name.trim() || !customer.phone.trim() || !customer.city.trim() || customer.address.trim().length < 5 || !/^\d{6}$/.test(customer.pincode.trim()) || shippingCharge === null || !deliveryState) {
      setOrderError('Please enter your name, phone, full address, city and a valid 6-digit PIN code so we can calculate shipping.');
      return;
    }
    setIsSavingOrder(true);
    try {
      const orderItems = await Promise.all(checkoutItems.map(async (item) => ({
        productId: item.productId, productName: item.productName, selectedColor: item.selectedColor,
        sizeBreakdown: item.sizeBreakdown, totalQuantity: item.totalQuantity, unitPrice: item.unitPrice,
        totalPrice: item.totalPrice, appliedTierLabel: item.appliedTierLabel,
        artworks: await Promise.all(item.artworks.map(async (art) => ({
          name: art.name, view: art.view, placementPreset: art.placementPreset, printSize: art.printSize,
          x: art.x, y: art.y, width: art.width,
          dataUrl: await prepareArtworkForUpload(art.dataUrl)
        })))
      })));
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, items: orderItems })
      });
      const responseText = await response.text();
      let result: any;
      try { result = responseText ? JSON.parse(responseText) : {}; }
      catch { throw new Error(response.status === 413 || /request entity too large/i.test(responseText)
        ? 'Your artwork upload is too large. Please try fewer or smaller images.'
        : 'The order service returned an unexpected response. Please try again.'); }
      if (!response.ok) throw new Error(result.error || 'Unable to save your order.');
      setSavedOrder({ orderNumber: result.orderNumber, trackingToken: result.trackingToken });
    } catch (error) {
      setOrderError(error instanceof Error ? error.message : 'Unable to save your order. Please try again.');
    } finally {
      setIsSavingOrder(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Window */}
        <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 my-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  Order Details
                </h3>
                <p className="text-xs text-neutral-400">
                  Place your order securely on the website
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Logo className="h-6 hidden sm:flex" showSubtitle={false} />
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Customer Information Form */}
          <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Customer & Delivery Details (required to save and track your order):
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Your Name / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma / Acme Tech" required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210" required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">City / Region</label>
                <input
                  type="text"
                  placeholder="e.g. Ahmedabad, Gujarat" required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">PIN Code</label>
                <input type="text" inputMode="numeric" maxLength={6} placeholder="Enter 6-digit PIN code" value={customer.pincode} onChange={(e) => handlePincodeChange(e.target.value)} required className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white" />
                {pincodeStatus && <p className={`mt-1 text-[11px] ${shippingCharge !== null ? 'text-emerald-400' : 'text-amber-300'}`}>{shippingCharge !== null ? `✓ ${pincodeStatus} — Shipping ₹${shippingCharge}` : pincodeStatus}</p>}
                {!pincodeStatus && <p className="mt-1 text-[10px] text-neutral-500">Shipping is calculated automatically after you enter your PIN code.</p>}
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Full Delivery Address</label>
              <input type="text" placeholder="House / street / area" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} required className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Email (optional)</label>
                <input type="email" placeholder="you@example.com" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Special Notes / Deadline</label>
                <input
                  type="text"
                  placeholder="e.g. Urgent college fest delivery"
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Formatted Message Preview Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 font-semibold text-neutral-300">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                Order Summary:
              </span>
              <span className="font-mono text-[11px]">
                {totalPieces} pcs &bull; ₹{estimatedTotal.toLocaleString()}
              </span>
            </div>

            <pre className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 text-[11px] font-mono text-neutral-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
              {`${checkoutItems.map(item => `${item.productName} — ${item.totalQuantity} pcs — ₹${item.totalPrice.toLocaleString()}`).join('\n')}\n\nSubtotal: ₹${grandTotal.toLocaleString()}\nShipping: ₹${shippingCharge ?? 0}\nEstimated total: ₹${estimatedTotal.toLocaleString()}`}
            </pre>
          </div>

          {/* CRITICAL DISCLOSURE & INSTRUCTION CALLOUT */}
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 text-amber-200 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Artwork files are saved with your order</span>
            </div>
            <p className="leading-relaxed text-[11px] text-amber-200/90">
              Your uploaded artwork images will be stored in the PrintStuff Google Drive order folder. Your artwork files are saved with your order for processing.
            </p>
          </div>

          {orderError && <div role="alert" className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs">{orderError}</div>}
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-800">
            <div className="text-xs text-neutral-400 text-center sm:text-left">
              <span>Order is saved securely on the PrintStuff website.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handlePlaceOrder}
                disabled={isSavingOrder || !!savedOrder || shippingCharge === null || customer.pincode.length !== 6}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
              >
                <span>{isSavingOrder ? 'Saving Order…' : savedOrder ? 'Order Placed' : 'Place Order'}</span>
              </button>
            </div>
          </div>

          {savedOrder && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Your order has been placed successfully on the website. Order number: {savedOrder.orderNumber}. Tracking token: {savedOrder.trackingToken}. Save these details to track your order.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
