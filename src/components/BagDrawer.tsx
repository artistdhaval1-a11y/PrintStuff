import React from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { BagItem } from '../types';
import { formatINR } from '../utils/format';
import { ProductImage } from './ProductImage';

interface BagDrawerProps {
  isOpen: boolean;
  items: BagItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 1999;

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
        className="w-full max-w-md bg-[#F5F5F3] text-[#111114] h-full flex flex-col shadow-2xl border-l border-black/10"
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-white border-b border-black/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#111114]" />
            <h2 className="font-display text-base font-semibold tracking-tight">
              Your Bag
            </h2>
            <span className="font-mono text-xs tabular-nums text-[#6E6E73]">
              ({totalCount})
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="p-1.5 rounded-full hover:bg-black/5 text-[#52525B] hover:text-[#111114] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="px-6 py-3 bg-white/70 border-b border-black/[0.06]">
          <div className="text-xs font-medium text-[#111114] flex items-center justify-between">
            <span>
              {remainingForFreeShipping === 0
                ? 'Unlocked Free Pan-India Shipping'
                : `Add ${formatINR(remainingForFreeShipping)} more for free shipping`}
            </span>
            <span className="font-mono text-[11px] tabular-nums text-[#6E6E73]">
              {progressPct}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-black/10 overflow-hidden">
            <div
              style={{ width: `${progressPct}%` }}
              className="h-full bg-[#00A8E8] transition-all duration-300"
            />
          </div>
        </div>

        {/* Bag Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-10 h-10 text-[#A1A1AA] mb-3" />
              <p className="text-sm font-semibold text-[#111114]">Your bag is empty</p>
              <p className="mt-1 text-xs text-[#6E6E73] max-w-[240px]">
                Pick a garment off the rail or design a Custom Printed T-Shirt starting at ₹199.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 px-5 py-2.5 rounded-full bg-[#111114] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Explore the Rail
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-white border border-black/[0.08] flex gap-3.5"
              >
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#ECECE8] shrink-0 border border-black/[0.06]">
                  <ProductImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-semibold text-[#111114] leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="text-[#71717A] hover:text-[#E6007E] p-0.5 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 text-[11px] text-[#52525B] flex flex-wrap items-center gap-x-1.5">
                      <span>Size {item.size}</span>
                      {item.color && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.color}</span>
                        </>
                      )}
                    </div>

                    {item.printSummary && (
                      <div className="mt-0.5 text-[11px] font-medium text-[#00A8E8]">
                        {item.printSummary}
                      </div>
                    )}

                    {item.customArtworkName && (
                      <div className="mt-0.5 text-[11px] text-[#6E6E73] truncate">
                        Artwork: {item.customArtworkName}
                      </div>
                    )}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="inline-flex items-center border border-black/15 rounded-md bg-[#F5F5F3]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 flex items-center justify-center hover:bg-black/5 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-mono font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 flex items-center justify-center hover:bg-black/5 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#111114] tabular-nums">
                      {formatINR(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Subtotal & Checkout Action */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-black/[0.08] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between text-[#52525B]">
                <span>Shipping</span>
                <span className="font-mono text-xs tabular-nums">
                  {remainingForFreeShipping === 0 ? 'FREE' : '₹99'}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-bold text-[#111114] pt-1 border-t border-black/[0.06]">
                <span>Total</span>
                <span className="tabular-nums">
                  {formatINR(subtotal + (remainingForFreeShipping === 0 ? 0 : 99))}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="w-full py-3.5 rounded-full bg-[#111114] text-[#F5F5F3] hover:bg-[#27272D] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
