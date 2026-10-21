import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { X, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { RecoloredApparelImage } from './RecoloredApparelImage';
import { PrintStuffLogoMark, PrintStuffWordmark } from './BrandLogos';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onCustomize: (product: Product, initialColor?: ProductColor) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onCustomize
}) => {
  if (!product) return null;

  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const currentImage =
    activeView === 'back' && product.images.back
      ? product.images.back
      : product.images.front;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Window */}
        <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 my-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Product Image & View Switcher */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[3/4] bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden flex items-center justify-center">
                <RecoloredApparelImage
                  src={currentImage}
                  productId={product.id}
                  view={activeView}
                  color={selectedColor}
                  alt={product.name}
                  className="w-full h-full object-contain p-2"
                />

                {/* Brand Stamp */}
                <div className="absolute top-3 left-3 bg-neutral-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800 flex items-center gap-2.5 z-10 pointer-events-none shadow-md">
                  <PrintStuffLogoMark className="w-7 h-7 shrink-0" />
                  <PrintStuffWordmark color="#FFFFFF" className="h-5 sm:h-6 max-w-[120px]" />
                </div>

                {/* View toggle */}
                {product.images.back && (
                  <div className="absolute top-3 right-3 flex items-center bg-neutral-950/90 backdrop-blur-md p-1 rounded-lg border border-neutral-800">
                    <button
                      onClick={() => setActiveView('front')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                        activeView === 'front'
                          ? 'bg-emerald-500 text-neutral-950 font-bold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Front
                    </button>
                    <button
                      onClick={() => setActiveView('back')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                        activeView === 'back'
                          ? 'bg-emerald-500 text-neutral-950 font-bold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Back
                    </button>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 bg-neutral-950/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-neutral-800 text-xs flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span className="text-neutral-200">{selectedColor.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border shrink-0 transition-transform ${
                      selectedColor.name === c.name
                        ? 'ring-2 ring-emerald-400 scale-110 border-white'
                        : 'border-neutral-700 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Technical Specifications & Price Tiers */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                  {product.category} &bull; {product.gsm} GSM
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white mt-1">
                  {product.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features List from Brochure */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <span className="text-xs font-bold text-neutral-300 font-mono uppercase tracking-wider">
                  Key Specifications:
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Volume Price Tier Cards */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-300 font-mono uppercase">
                    Volume Price Bands:
                  </span>
                  <span className="text-[11px] text-neutral-400">Shipping extra</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                  {product.priceTiers.map((tier) => (
                    <div
                      key={tier.label}
                      className="p-2 rounded-xl bg-neutral-950 border border-neutral-800"
                    >
                      <div className="text-[10px] text-neutral-400">{tier.label}</div>
                      <div className="text-sm font-bold text-emerald-400">₹{tier.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={() => {
                    onCustomize(product, selectedColor);
                    onClose();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold rounded-xl transition-all shadow-lg active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open in Customiser Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
