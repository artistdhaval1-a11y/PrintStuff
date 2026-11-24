import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import {
  CUSTOM_TEE_COLORS,
  CUSTOM_TEE_PRINT_TIERS,
  CustomPrintTierKey,
  StoreProduct,
} from '../data/shopifyCatalog';
import { BagItem } from '../types';
import { formatINR } from '../utils/format';
import { ProductImage } from './ProductImage';

interface ProductDetailModalProps {
  product: StoreProduct | null;
  list: StoreProduct[];
  onClose: () => void;
  onChangeProduct: (product: StoreProduct) => void;
  onAddToBag: (item: BagItem) => void;
  onOpenCustomPage: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  list,
  onClose,
  onChangeProduct,
  onAddToBag,
  onOpenCustomPage,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColorName, setSelectedColorName] = useState<string>('Black');
  const [frontTier, setFrontTier] = useState<CustomPrintTierKey>('A4');
  const [backTier, setBackTier] = useState<CustomPrintTierKey>('None');
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  useEffect(() => {
    setSelectedSize(null);
    setActiveImageIdx(0);
    setSelectedColorName('Black');
    setFrontTier('A4');
    setBackTier('None');
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && list.length > 1) {
        const idx = list.findIndex((p) => p.id === product.id);
        const prev = list[(idx - 1 + list.length) % list.length];
        if (prev) onChangeProduct(prev);
      }
      if (e.key === 'ArrowRight' && list.length > 1) {
        const idx = list.findIndex((p) => p.id === product.id);
        const next = list[(idx + 1) % list.length];
        if (next) onChangeProduct(next);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, list, onClose, onChangeProduct]);

  if (!product) return null;

  const currentIndex = Math.max(0, list.findIndex((p) => p.id === product.id));
  const totalCount = Math.max(1, list.length);

  const sizeOption = product.options.find((o) => o.name.toLowerCase() === 'size');
  const sizes = sizeOption?.values || ['S', 'M', 'L', 'XL'];

  let activePrice = product.minPrice;
  let matchedVariantId: string | undefined;

  if (product.isCustomTee) {
    const fCharge = CUSTOM_TEE_PRINT_TIERS.find((t) => t.key === frontTier)?.charge ?? 0;
    const bCharge = CUSTOM_TEE_PRINT_TIERS.find((t) => t.key === backTier)?.charge ?? 0;
    activePrice = 199 + fCharge + bCharge;
  } else if (selectedSize) {
    const found = product.variants.find(
      (v) => v.option1.toLowerCase() === selectedSize.toLowerCase()
    );
    if (found) {
      activePrice = found.price;
      matchedVariantId = found.id;
    }
  }

  const customColorObj = CUSTOM_TEE_COLORS.find((c) => c.name === selectedColorName);
  const galleryImages =
    product.isCustomTee && customColorObj
      ? [customColorObj.frontImg, customColorObj.backImg]
      : product.images;

  const mainImage = galleryImages[activeImageIdx] || galleryImages[0] || product.images[0];

  const isSizeAvailable = (sz: string) => {
    if (product.isCustomTee) return true;
    const found = product.variants.find((v) => v.option1.toLowerCase() === sz.toLowerCase());
    return found ? found.available : true;
  };

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToBag({
      id: `${product.id}-${selectedSize}-${selectedColorName}-${frontTier}-${backTier}-${Date.now()}`,
      productId: product.id,
      handle: product.handle,
      title: product.title,
      image: mainImage,
      size: selectedSize,
      color: product.isCustomTee ? selectedColorName : undefined,
      printSummary: product.isCustomTee ? `Front: ${frontTier} | Back: ${backTier}` : undefined,
      frontPrint: product.isCustomTee ? frontTier : undefined,
      backPrint: product.isCustomTee ? backTier : undefined,
      unitPrice: activePrice,
      quantity: 1,
      variantId: matchedVariantId,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#F5F5F3] text-[#111114] rounded-3xl overflow-hidden shadow-2xl border border-black/10 my-6">
        {/* Top CMYK accent line */}
        <div aria-hidden="true" className="h-1 w-full grid grid-cols-3">
          <div className="bg-[#00A8E8]" />
          <div className="bg-[#E6007E]" />
          <div className="bg-[#FFCA05]" />
        </div>

        {/* Modal Top Controls */}
        <div className="px-6 py-3.5 bg-white border-b border-black/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tabular-nums text-[#52525B]">
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
            </span>
            {totalCount > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onChangeProduct(list[(currentIndex - 1 + list.length) % list.length])}
                  aria-label="Previous product"
                  className="p-1.5 rounded-full border border-black/15 hover:bg-[#111114] hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onChangeProduct(list[(currentIndex + 1) % list.length])}
                  aria-label="Next product"
                  className="p-1.5 rounded-full border border-black/15 hover:bg-[#111114] hover:text-white cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="p-1.5 rounded-full hover:bg-black/5 text-[#52525B] hover:text-[#111114] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Gallery */}
          <div className="md:col-span-6 space-y-3">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-black/10">
              <ProductImage
                src={mainImage}
                alt={product.title}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {galleryImages.slice(0, 8).map((imgUrl, i) => (
                  <button
                    key={`${imgUrl}-${i}`}
                    type="button"
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-14 h-16 rounded-lg overflow-hidden border shrink-0 cursor-pointer transition-all ${
                      activeImageIdx === i
                        ? 'border-[#111114] ring-2 ring-[#00A8E8]/30'
                        : 'border-black/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ProductImage src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#E6007E]">
                {product.productType} · In Stock
              </div>

              <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-[#111114] leading-tight">
                {product.title}
              </h2>

              <div className="mt-3 text-2xl font-bold text-[#111114] tabular-nums">
                {formatINR(activePrice)}
              </div>

              <p className="mt-3 text-xs sm:text-sm text-[#52525B] leading-relaxed">
                {product.description}
              </p>

              {product.isCustomTee && (
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-2">
                      Colour · {selectedColorName}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {CUSTOM_TEE_COLORS.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            setSelectedColorName(c.name);
                            setActiveImageIdx(0);
                          }}
                          title={c.name}
                          style={{ backgroundColor: c.hex }}
                          className={`w-7 h-7 rounded-full border border-black/20 cursor-pointer ${
                            c.name === selectedColorName
                              ? 'ring-2 ring-[#111114] ring-offset-2 ring-offset-[#F5F5F3]'
                              : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1">
                        Front Print
                      </label>
                      <select
                        value={frontTier}
                        onChange={(e) => setFrontTier(e.target.value as CustomPrintTierKey)}
                        className="w-full px-2.5 py-2 text-xs bg-white border border-black/15 rounded-lg"
                      >
                        {CUSTOM_TEE_PRINT_TIERS.map((t) => (
                          <option key={t.key} value={t.key}>
                            {t.label} (+₹{t.charge})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1">
                        Back Print
                      </label>
                      <select
                        value={backTier}
                        onChange={(e) => setBackTier(e.target.value as CustomPrintTierKey)}
                        className="w-full px-2.5 py-2 text-xs bg-white border border-black/15 rounded-lg"
                      >
                        {CUSTOM_TEE_PRINT_TIERS.map((t) => (
                          <option key={t.key} value={t.key}>
                            {t.label} (+₹{t.charge})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Size Grid */}
              <div className="mt-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-2">
                  Select Size
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((sz) => {
                    const available = isSizeAvailable(sz);
                    const selected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        disabled={!available}
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-[48px] h-10 px-3 rounded-lg text-xs font-semibold uppercase transition-colors cursor-pointer ${
                          !available
                            ? 'bg-black/5 text-black/25 border border-black/10 line-through cursor-not-allowed'
                            : selected
                            ? 'bg-[#111114] text-white border border-[#111114]'
                            : 'bg-white text-[#111114] border border-black/15 hover:border-[#111114]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                disabled={!selectedSize}
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedSize
                    ? 'bg-[#E6007E] hover:bg-[#C7006C] text-white cursor-pointer shadow-md'
                    : 'bg-white text-[#52525B] border border-black/20 cursor-not-allowed'
                }`}
              >
                {selectedSize ? `Add to Bag · ${formatINR(activePrice)}` : 'Pick a Size'}
              </button>

              {product.isCustomTee && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCustomPage();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full border border-[#00A8E8] bg-white hover:bg-[#00A8E8]/10 text-xs font-semibold text-[#111114] cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#00A8E8]" />
                  <span>Open Full Custom Print Page</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
