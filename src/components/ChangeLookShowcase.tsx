import React, { useMemo, useState } from 'react';
import { Check, Eye, ShoppingBag } from 'lucide-react';
import { StoreProduct } from '../data/shopifyCatalog';
import { BagItem } from '../types';
import { formatINR } from '../utils/format';
import { ProductImage } from './ProductImage';

interface ChangeLookShowcaseProps {
  products: StoreProduct[];
  onAddToBag: (item: BagItem) => void;
  onInspectProduct: (product: StoreProduct, list: StoreProduct[]) => void;
}

type LookDropKey = 'racing' | 'hoodies' | 'suede';

const DROPS: { key: LookDropKey; label: string; accent: string }[] = [
  { key: 'racing', label: '01. Motorsport Racing', accent: '#E6007E' },
  { key: 'hoodies', label: '02. Heavyweight Hoodies', accent: '#00A8E8' },
  { key: 'suede', label: '03. Leather & Suede', accent: '#FFCA05' },
];

export const ChangeLookShowcase: React.FC<ChangeLookShowcaseProps> = ({
  products,
  onAddToBag,
  onInspectProduct,
}) => {
  const [activeDrop, setActiveDrop] = useState<LookDropKey>('racing');
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const dropItems = useMemo(() => {
    if (activeDrop === 'racing') {
      return products
        .filter((p) => p.collections.includes('jackets') && (p.title.toLowerCase().includes('f1') || p.title.toLowerCase().includes('marlboro') || p.title.toLowerCase().includes('racing')))
        .slice(0, 5);
    }
    if (activeDrop === 'hoodies') {
      return products
        .filter((p) => p.collections.includes('hoodies') || p.collections.includes('sweatshirts'))
        .slice(0, 5);
    }
    return products
      .filter((p) => p.productType.toLowerCase().includes('leather') || p.productType.toLowerCase().includes('cny'))
      .slice(0, 5);
  }, [activeDrop, products]);

  const dropHeroThumb = (key: LookDropKey) => {
    if (key === 'racing') {
      return products.find((p) => p.handle.includes('marlboro-racing'))?.images[0];
    }
    if (key === 'hoodies') {
      return products.find((p) => p.handle.includes('tribal-shadow-depth-hoodie-black'))?.images[0];
    }
    return products.find((p) => p.handle.includes('cny-inspired-premium-mustard'))?.images[0];
  };

  const activeProduct = dropItems[Math.min(activeIdx, Math.max(0, dropItems.length - 1))];
  if (!activeProduct) return null;

  const sizeOption = activeProduct.options.find((o) => o.name.toLowerCase() === 'size');
  const sizes = sizeOption?.values || ['S', 'M', 'L', 'XL'];

  const matchedVariant = selectedSize
    ? activeProduct.variants.find((v) => v.option1.toLowerCase() === selectedSize.toLowerCase())
    : undefined;
  const activePrice = matchedVariant ? matchedVariant.price : activeProduct.minPrice;

  const handleSelectDrop = (key: LookDropKey) => {
    setActiveDrop(key);
    setActiveIdx(0);
    setActivePhotoIdx(0);
    setSelectedSize(null);
  };

  const handleSelectItem = (idx: number) => {
    setActiveIdx(idx);
    setActivePhotoIdx(0);
    setSelectedSize(null);
  };

  const handleQuickAdd = () => {
    const sizeToUse = selectedSize || sizes[0] || 'M';
    const variant = activeProduct.variants.find(
      (v) => v.option1.toLowerCase() === sizeToUse.toLowerCase()
    );
    onAddToBag({
      id: `${activeProduct.id}-${sizeToUse}-${Date.now()}`,
      productId: activeProduct.id,
      handle: activeProduct.handle,
      title: activeProduct.title,
      image: activeProduct.images[0],
      size: sizeToUse,
      unitPrice: variant ? variant.price : activeProduct.minPrice,
      quantity: 1,
      variantId: variant?.id,
    });
  };

  return (
    <section id="lookbook" className="ps-lookbook bg-white border-y border-black/[0.08] py-14 sm:py-16 px-4 sm:px-8">
      <div className="max-w-[1380px] mx-auto">
        {/* Top 3 Arched Editorial Drop Selector Cards (Video Ref Frame 26) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {DROPS.map((drop) => {
            const isSelected = activeDrop === drop.key;
            return (
              <button
                key={drop.key}
                type="button"
                onClick={() => handleSelectDrop(drop.key)}
                className={`group relative rounded-t-[60px] rounded-b-xl overflow-hidden border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-[#111114] ring-2 ring-[#111114]/15 shadow-md -translate-y-1'
                    : 'border-black/10 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="aspect-[16/10] bg-[#ECECE8]">
                  <ProductImage
                    src={dropHeroThumb(drop.key)}
                    alt={drop.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-white">
                  <span className="text-xs font-bold tracking-wide">{drop.label}</span>
                  <span
                    style={{ backgroundColor: drop.accent }}
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Main 3-Column Interactive Change-Look Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ps-lookbook__stage bg-[#F5F5F3] rounded-3xl p-5 sm:p-8 border border-black/[0.08]">
          {/* Left: Change Look Thumbnail Rail */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <div className="font-display text-lg font-semibold text-[#111114] mb-1">
              Change look
            </div>
            <p className="text-xs text-[#6E6E73] mb-4">
              Tap a piece to swap the center lookbook preview
            </p>

            <div className="flex lg:flex-col gap-3 w-full overflow-x-auto pb-2 lg:pb-0">
              {dropItems.map((item, idx) => {
                const active = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectItem(idx)}
                    className={`flex items-center gap-3 p-2 rounded-xl border transition-all text-left shrink-0 lg:w-full cursor-pointer ${
                      active
                        ? 'bg-white border-[#E6007E] shadow-sm'
                        : 'bg-white/60 border-black/10 hover:bg-white'
                    }`}
                  >
                    <div className="w-14 h-16 rounded-lg overflow-hidden bg-[#ECECE8] shrink-0">
                      <ProductImage
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 hidden sm:block">
                      <div className="text-xs font-semibold text-[#111114] line-clamp-1">
                        {item.title}
                      </div>
                      <div className="mt-0.5 text-[11px] font-mono font-semibold text-[#52525B] tabular-nums">
                        {formatINR(item.minPrice)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Large Crisp Garment Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-black/10 shadow-[0_24px_48px_-14px_rgba(17,17,20,0.2)]">
              <ProductImage
                src={activeProduct.images[activePhotoIdx] || activeProduct.images[0]}
                alt={activeProduct.title}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            {activeProduct.images.length > 1 && (
              <div className="mt-3 flex items-center gap-2">
                {activeProduct.images.slice(0, 5).map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    type="button"
                    onClick={() => setActivePhotoIdx(i)}
                    aria-label={`View photo ${i + 1}`}
                    className={`w-10 h-12 rounded-md overflow-hidden border cursor-pointer transition-all ${
                      activePhotoIdx === i
                        ? 'border-[#111114] scale-105'
                        : 'border-black/10 opacity-65 hover:opacity-100'
                    }`}
                  >
                    <ProductImage src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Title, Price, Size Grid, Interactive Add to Bag */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#00A8E8]">
              {activeProduct.productType} · Look {String(activeIdx + 1).padStart(2, '0')}
            </div>

            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#111114] leading-tight">
              {activeProduct.title}
            </h3>

            <div className="mt-3 text-2xl font-bold text-[#111114] tabular-nums">
              {formatINR(activePrice)}
            </div>

            <p className="mt-3 text-xs sm:text-sm text-[#52525B] leading-relaxed line-clamp-3">
              {activeProduct.description}
            </p>

            {/* Size Picker */}
            <div className="mt-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-2">
                Select Your Size
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sz) => {
                  const chosen = (selectedSize || sizes[0]) === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[44px] h-9 px-3 rounded-lg text-xs font-semibold uppercase transition-colors cursor-pointer ${
                        chosen
                          ? 'bg-[#111114] text-white'
                          : 'bg-white text-[#111114] border border-black/15 hover:border-[#111114]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleQuickAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#E6007E] hover:bg-[#C7006C] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart · {formatINR(activePrice)}</span>
              </button>

              <button
                type="button"
                onClick={() => onInspectProduct(activeProduct, dropItems)}
                aria-label="Inspect full product details"
                className="p-3.5 rounded-full bg-white border border-black/15 hover:border-[#111114] text-[#111114] cursor-pointer"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-[#52525B]">
              <Check className="w-3.5 h-3.5 text-[#00A8E8]" />
              <span>Exact PrintStuff Shopify pricing · Instant Bag checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
