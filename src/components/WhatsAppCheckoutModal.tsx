import React, { useState } from 'react';
import { CartItem, CustomerDetails } from '../types';
import { WHATSAPP_RAW_NUMBER, WHATSAPP_PHONE_NUMBER } from '../data/products';
import { X, MessageCircle, Send, CheckCircle2, AlertCircle, FileText, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

interface WhatsAppCheckoutModalProps {
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

  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState<boolean>(false);
  const [isSavingOrder, setIsSavingOrder] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<string>('');

  if (!isOpen) return null;

  // Active items list (either single item direct enquiry or entire cart)
  const checkoutItems = singleItem ? [singleItem] : items;
  const grandTotal = checkoutItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalPieces = checkoutItems.reduce((sum, item) => sum + item.totalQuantity, 0);

  // Generate formatted WhatsApp message
  const buildWhatsAppMessage = (order?: { orderNumber: string; trackingToken: string; artworkFolderUrl?: string }): string => {
    let msg = `*PRINTSTUFF — CUSTOM APPAREL ORDER ENQUIRY*\n`;
    msg += `═══════════════════════════════\n\n`;

    // Customer section
    if (customer.name || customer.phone || customer.city) {
      msg += `*CUSTOMER DETAILS:*\n`;
      if (customer.name) msg += `• Name / Company: ${customer.name}\n`;
      if (customer.phone) msg += `• Contact Number: ${customer.phone}\n`;
      if (customer.city) msg += `• Delivery City: ${customer.city}\n`;
      if (customer.address) msg += `• Shipping Address: ${customer.address}\n`;
      msg += `\n`;
    }

    if (order) {
      msg += `*ORDER NUMBER:* ${order.orderNumber}\\n*TRACKING TOKEN:* ${order.trackingToken}\\nKeep these details safe to track your order.\\n`;
      if (order.artworkFolderUrl) msg += `*UPLOADED ARTWORK FILES:* ${order.artworkFolderUrl}\\n`;
      msg += `\\n`;
    }

    msg += `*ORDER ITEMS (${checkoutItems.length} styles, ${totalPieces} total pieces):*\n`;

    checkoutItems.forEach((item, idx) => {
      msg += `\n*${idx + 1}. ${item.productName}*\n`;
      msg += `  • Colour: ${item.selectedColor.name}\n`;
      
      // Sizes breakdown
      const sizeEntries = Object.entries(item.sizeBreakdown)
        .filter(([_, qty]) => qty > 0)
        .map(([size, qty]) => `${size}: ${qty} pcs`)
        .join(', ');
      msg += `  • Sizing: ${sizeEntries || `${item.totalQuantity} pcs`}\n`;
      msg += `  • Total Quantity: ${item.totalQuantity} pcs\n`;
      msg += `  • Pricing Tier: ${item.appliedTierLabel} @ ₹${item.unitPrice}/pc\n`;
      msg += `  • Subtotal: ₹${item.totalPrice.toLocaleString()}\n`;

      // Artworks
      if (item.artworks.length > 0) {
        msg += `  • Custom Artworks Placed (${item.artworks.length}):\n`;
        item.artworks.forEach((art, aIdx) => {
          msg += `    [${aIdx + 1}] "${art.name}"\n`;
          msg += `        - View: ${art.view.toUpperCase()} view\n`;
          msg += `        - Placement: ${art.placementPreset || 'Custom'}\n`;
          msg += `        - Scale: ${art.width}% width, Pos: X ${art.x}%, Y ${art.y}%\n`;
        });
      } else {
        msg += `  • Custom Artwork: Blank / No custom print specified\n`;
      }
    });

    msg += `\n═══════════════════════════════\n`;
    msg += `*ORDER ESTIMATE SUMMARY:*\n`;
    msg += `• Total Apparel Quantity: ${totalPieces} pieces\n`;
    msg += `• Estimated Total: ₹${grandTotal.toLocaleString()}/-\n`;
    msg += `• Shipping: Extra as applicable on delivery destination\n`;

    if (customer.notes.trim()) {
      msg += `\n*CUSTOMER NOTES & SPECIAL REQUESTS:*\n"${customer.notes.trim()}"\n`;
    }

    if (checkoutItems.some(item => item.artworks.length > 0)) {
      msg += `\n*NOTE ON FILES:* Uploaded artwork is saved in the Drive folder linked above when available.\n`;
    }
    return msg;
  };

  const handleLaunchWhatsApp = async () => {
    setOrderError('');
    if (!customer.name.trim() || !customer.phone.trim() || !customer.city.trim() || customer.address.trim().length < 5 || !/^[A-Za-z0-9 -]{4,12}$/.test(customer.pincode.trim())) {
      setOrderError('Please enter your name, phone, full address, city and valid PIN code.');
      return;
    }
    setIsSavingOrder(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, items: checkoutItems.map(item => ({
          productId: item.productId, productName: item.productName, selectedColor: item.selectedColor,
          sizeBreakdown: item.sizeBreakdown, totalQuantity: item.totalQuantity, unitPrice: item.unitPrice,
          totalPrice: item.totalPrice, appliedTierLabel: item.appliedTierLabel, artworks: item.artworks.map(art => ({ ...art, dataUrl: art.dataUrl }))
        })) })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to save your order.');
      window.open('https://wa.me/' + WHATSAPP_RAW_NUMBER + '?text=' + encodeURIComponent(buildWhatsAppMessage(result)), '_blank');
      setHasOpenedWhatsApp(true);
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
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  WhatsApp Order Enquiry
                </h3>
                <p className="text-xs text-neutral-400">
                  Direct connection with PrintStuff team ({WHATSAPP_PHONE_NUMBER})
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
                <label className="block text-[11px] text-neutral-400 mb-1">WhatsApp / Phone Number</label>
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
                <input type="text" placeholder="e.g. 380015" value={customer.pincode} onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })} required className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white" />
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
                Message Summary to Send:
              </span>
              <span className="font-mono text-[11px]">
                {totalPieces} pcs &bull; ₹{grandTotal.toLocaleString()}
              </span>
            </div>

            <pre className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 text-[11px] font-mono text-neutral-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
              {buildWhatsAppMessage()}
            </pre>
          </div>

          {/* CRITICAL DISCLOSURE & INSTRUCTION CALLOUT */}
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 text-amber-200 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Artwork files are saved with your order</span>
            </div>
            <p className="leading-relaxed text-[11px] text-amber-200/90">
              Your uploaded artwork images will be stored in the PrintStuff Google Drive order folder. The folder link will be included in the WhatsApp message when available.
            </p>
          </div>

          {orderError && <div role="alert" className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs">{orderError}</div>}
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-800">
            <div className="text-xs text-neutral-400 text-center sm:text-left">
              <span>Recipient: </span>
              <strong className="text-white font-mono">{WHATSAPP_PHONE_NUMBER}</strong>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleLaunchWhatsApp}
                disabled={isSavingOrder}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSavingOrder ? 'Saving Order…' : 'Save Order & Open WhatsApp'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>

          {hasOpenedWhatsApp && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                WhatsApp has launched in a new window. Your order details are ready. If artwork was uploaded, its Google Drive folder link is included in the WhatsApp message.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
