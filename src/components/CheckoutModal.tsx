import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Copy,
  CreditCard,
  ShieldCheck,
  X,
} from 'lucide-react';
import { BagItem, CustomerCheckoutInfo } from '../types';
import { formatINR } from '../utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  items: BagItem[];
  onClose: () => void;
  onOrderConfirmed: () => void;
}

interface GatewayConfig {
  razorpayConfigured: boolean;
}

interface VerifiedReceiptState {
  orderId: string;
  paymentStatus: 'paid';
  razorpayPaymentId?: string;
  grandTotalInr: number;
  itemCount: number;
  receiptText: string;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (resp: { error?: { description?: string } }) => void) => void;
    };
  }
}

function loadRazorpaySdk(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(Boolean(window.Razorpay)));
      existing.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(Boolean(window.Razorpay));
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  onClose,
  onOrderConfirmed,
}) => {
  const [customer, setCustomer] = useState<CustomerCheckoutInfo>({
    name: '',
    phone: '',
    city: '',
    address: '',
    postalCode: '',
    notes: '',
  });
  const [gatewayConfig, setGatewayConfig] = useState<GatewayConfig | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedReceipt, setConfirmedReceipt] = useState<VerifiedReceiptState | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/orders/config')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setGatewayConfig(data);
      })
      .catch(() => {
        // Fallback smoothly if offline
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + shipping;

  const serializeItems = () =>
    items.map((it) => ({
      productId: it.productId,
      size: it.size,
      color: it.color,
      frontPrint: it.frontPrint,
      backPrint: it.backPrint,
      quantity: it.quantity,
    }));

  const verifyAndFinalizeOrder = async (payload: {
    paymentMethod: 'razorpay';
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  }) => {
    const resp = await fetch('/api/orders/verify-and-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: serializeItems(),
        customer,
        ...payload,
      }),
    });

    const data = await resp.json();
    if (!resp.ok || !data.verified) {
      throw new Error(data.error || 'Could not verify order.');
    }

    setConfirmedReceipt({
      orderId: data.order.orderId,
      paymentStatus: data.order.paymentStatus,
      razorpayPaymentId: data.order.razorpayPaymentId,
      grandTotalInr: data.order.grandTotalInr,
      itemCount: data.order.items.length,
      receiptText: data.receiptText,
    });
    onOrderConfirmed();
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const digits = customer.phone.replace(/\D/g, '');
    if (
      !customer.name.trim() ||
      digits.length < 10 ||
      !customer.address.trim() ||
      !customer.city.trim() ||
      !customer.postalCode.trim()
    ) {
      setErrorMsg('Please enter your full name, valid 10-digit mobile number, address, city, and PIN code.');
      return;
    }

    setIsSubmitting(true);
    let launchedPopup = false;
    try {
      // Create Razorpay Order via server
      const orderResp = await fetch('/api/orders/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: serializeItems(),
          customer,
        }),
      });
      const orderData = await orderResp.json();
      if (!orderResp.ok) {
        throw new Error(orderData.error || 'Failed to initiate Razorpay payment.');
      }

      if (orderData.mode === 'live' && orderData.razorpayOrderId && orderData.razorpayKeyId) {
        const sdkReady = await loadRazorpaySdk();
        if (!sdkReady || !window.Razorpay) {
          throw new Error('Could not load Razorpay Checkout script. Please try again.');
        }

        const rzp = new window.Razorpay({
          key: orderData.razorpayKeyId,
          amount: orderData.amountPaise,
          currency: orderData.currency || 'INR',
          name: 'PrintStuff Store',
          description: `Order ${orderData.receiptRef}`,
          image: '/brand/printstuff-tag-icon.png',
          order_id: orderData.razorpayOrderId,
          prefill: {
            name: customer.name,
            contact: digits.length === 10 ? `+91${digits}` : `+${digits}`,
          },
          theme: {
            color: '#111114',
          },
          handler: async (rzpResponse: {
            razorpay_order_id?: string;
            razorpay_payment_id?: string;
            razorpay_signature?: string;
          }) => {
            try {
              await verifyAndFinalizeOrder({
                paymentMethod: 'razorpay',
                razorpay_order_id: rzpResponse.razorpay_order_id,
                razorpay_payment_id: rzpResponse.razorpay_payment_id,
                razorpay_signature: rzpResponse.razorpay_signature,
              });
            } catch (err) {
              setErrorMsg(err instanceof Error ? err.message : 'Payment verification failed.');
            } finally {
              setIsSubmitting(false);
            }
          },
          modal: {
            ondismiss: () => {
              setIsSubmitting(false);
            },
          },
        });

        rzp.on('payment.failed', (failResp) => {
          setErrorMsg(failResp?.error?.description || 'Razorpay payment failed. Please retry.');
          setIsSubmitting(false);
        });

        launchedPopup = true;
        rzp.open();
        return;
      }

      throw new Error('Razorpay is not configured yet. Please contact the store and try again later.');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
    } finally {
      if (!launchedPopup) {
        setIsSubmitting(false);
      }
    }
  };

  const handleCopyReceipt = async () => {
    if (!confirmedReceipt) return;
    try {
      await navigator.clipboard.writeText(confirmedReceipt.receiptText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handleResetAndClose = () => {
    setConfirmedReceipt(null);
    setErrorMsg(null);
    setCopied(false);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="PrintStuff Checkout"
        className="w-full max-w-lg bg-[#F5F5F3] text-[#111114] rounded-2xl border border-black/10 shadow-2xl overflow-hidden my-8"
      >
        <div aria-hidden="true" className="h-1 w-full grid grid-cols-3">
          <div className="bg-[#00A8E8]" />
          <div className="bg-[#E6007E]" />
          <div className="bg-[#FFCA05]" />
        </div>

        <div className="px-6 py-4 bg-white border-b border-black/[0.08] flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">
            {confirmedReceipt ? 'Order Confirmation' : 'Checkout & Payment'}
          </h2>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close checkout"
            className="p-1.5 rounded-full hover:bg-black/5 text-[#52525B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmedReceipt ? (
          <div className="p-6 space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-[#00A8E8]/15 text-[#00A8E8] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-[#111114]">
                Order #{confirmedReceipt.orderId} Confirmed
              </h3>
              <p className="mt-1 text-xs text-[#52525B]">
                {confirmedReceipt.paymentStatus === 'paid' && confirmedReceipt.razorpayPaymentId
                  ? `Paid via Razorpay · Payment ID ${confirmedReceipt.razorpayPaymentId}`
                  : 'Payment verified successfully'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-black/[0.08] text-left space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-[#111114]">
                <span>Order Receipt ({confirmedReceipt.itemCount} item{confirmedReceipt.itemCount === 1 ? '' : 's'})</span>
                <span className="font-mono tabular-nums">{formatINR(confirmedReceipt.grandTotalInr)}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-[#52525B]">
                <ShieldCheck className="w-4 h-4 text-[#00A8E8]" />
                <span>Your online payment has been verified.</span>
              </div>
            </div>

              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52525B] hover:text-[#111114] cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied Receipt Text' : 'Copy Order Receipt'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="text-xs font-semibold text-[#111114] underline underline-offset-4 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
            <div className="p-3.5 rounded-xl bg-white border border-black/[0.08] flex items-center justify-between text-xs">
              <span className="font-medium text-[#52525B]">
                {items.reduce((s, i) => s + i.quantity, 0)} piece(s) ·{' '}
                {shipping === 0 ? 'Free Shipping' : '₹99 Shipping'}
              </span>
              <span className="text-base font-bold text-[#111114] tabular-nums">
                {formatINR(grandTotal)}
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-[#E6007E]/10 border border-[#E6007E]/30 text-xs font-medium text-[#9D0054]">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Aarav Mehta"
                  className="w-full px-3 py-2 text-xs bg-white border border-black/15 rounded-lg focus:outline-none focus:border-[#111114]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1">
                  Customer Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs bg-white border border-black/15 rounded-lg focus:outline-none focus:border-[#111114]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1">
                Street Address
              </label>
              <input
                type="text"
                required
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                placeholder="Flat, Street, Landmark"
                className="w-full px-3 py-2 text-xs bg-white border border-black/15 rounded-lg focus:outline-none focus:border-[#111114]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  placeholder="Mumbai"
                  className="w-full px-3 py-2 text-xs bg-white border border-black/15 rounded-lg focus:outline-none focus:border-[#111114]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  required
                  value={customer.postalCode}
                  onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                  placeholder="400001"
                  className="w-full px-3 py-2 text-xs bg-white border border-black/15 rounded-lg focus:outline-none focus:border-[#111114]"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-black/[0.08] flex items-center gap-2 text-xs text-[#52525B]">
              <ShieldCheck className="w-4 h-4 text-[#00A8E8]" />
              Secure online payment powered by Razorpay (UPI, cards and netbanking).
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full py-3.5 rounded-full bg-[#E6007E] hover:bg-[#C7006C] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
            >
              {isSubmitting
                ? 'Processing...'
                : `Pay securely with Razorpay · ${formatINR(grandTotal)}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
