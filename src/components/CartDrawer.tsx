import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, Plus, Minus } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { RecoloredApparelImage } from './RecoloredApparelImage';
import { PrintStuffLogoMark } from './BrandLogos';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newTotalQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckoutWhatsApp: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutWhatsApp
}) => {
  if (!isOpen) return null;

  const grandTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalPieces = items.reduce((sum, item) => sum + item.totalQuantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <PrintStuffLogoMark className="w-6 h-6 shrink-0" />
              <h2 className="font-display font-bold text-lg text-white">
                Your Custom Bag
              </h2>
              <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-300 rounded-full tabular-nums">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-white text-base">Your Bag is Empty</h3>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    Choose any garment from the catalog or customize your own artwork in the studio.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId);
                return (
                  <div
                    key={item.id}
                    className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {product && (
                          <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                            <RecoloredApparelImage
                              src={product.images.front}
                              productId={product.id}
                              view="front"
                              color={item.selectedColor}
                              alt={item.productName}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-white text-sm">{item.productName}</h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                            <span
                              className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span>{item.selectedColor.name}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Sizing Breakdown Details */}
                    <div className="p-2.5 bg-neutral-900/80 rounded-xl text-xs space-y-1 font-mono">
                      <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                        Size Distribution:
                      </div>
                      <div className="flex flex-wrap gap-2 text-neutral-200">
                        {Object.entries(item.sizeBreakdown)
                          .filter(([_, qty]) => qty > 0)
                          .map(([size, qty]) => (
                            <span
                              key={size}
                              className="px-2 py-0.5 bg-neutral-950 rounded border border-neutral-800"
                            >
                              {size}: <strong>{qty} pcs</strong>
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Artwork Details */}
                    {item.artworks.length > 0 && (
                      <div className="text-[11px] text-neutral-400 space-y-1">
                        <div className="font-semibold text-neutral-300">Custom Artwork:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.artworks.map((art) => (
                            <span
                              key={art.id}
                              className="px-2 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-[10px] text-neutral-300 truncate max-w-[200px]"
                            >
                              {art.name} ({art.view})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pricing line */}
                    <div className="pt-2 border-t border-neutral-850 flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-neutral-400">{item.totalQuantity} pcs &bull; </span>
                        <span className="font-mono text-emerald-400 font-semibold">
                          ₹{item.unitPrice}/pc
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono ml-1">
                          ({item.appliedTierLabel})
                        </span>
                      </div>

                      <div className="font-display font-bold text-white text-base tabular-nums">
                        ₹{item.totalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-neutral-950 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Total Quantity</span>
                  <span className="font-mono text-white font-semibold tabular-nums">
                    {totalPieces} pieces
                  </span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span className="font-mono text-neutral-300">Calculated on destination</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex items-baseline justify-between text-white">
                  <span className="font-bold text-sm">Estimated Subtotal</span>
                  <span className="text-2xl font-display font-extrabold text-emerald-400 tabular-nums">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckoutWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Checkout via WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[10px] text-neutral-400 text-center leading-normal">
                Transfers order specifications to official PrintStuff WhatsApp (+91-74056-52991) for order confirmation and high-res file submission.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
