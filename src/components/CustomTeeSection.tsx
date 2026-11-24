import React, { useRef, useState } from 'react';
import { ArrowLeft, RotateCcw, ShoppingBag, Upload } from 'lucide-react';
import {
  CUSTOM_TEE_COLORS,
  CUSTOM_TEE_PRINT_TIERS,
  CustomPrintTierKey,
  SHOPIFY_PRODUCTS,
} from '../data/shopifyCatalog';
import { BagItem } from '../types';
import { formatINR } from '../utils/format';
import { ProductImage } from './ProductImage';

interface CustomTeeSectionProps {
  onAddToBag: (item: BagItem) => void;
  onBackToStore?: () => void;
}

const SAMPLE_GRAPHICS = [
  { name: 'PrintStuff Tag Mark', url: '/brand/printstuff-tag-icon.png' },
  { name: 'PrintStuff Script', url: '/brand/printstuff-wordmark-black.png' },
  { name: 'PrintStuff Full Lockup', url: '/brand/printstuff-logo-trimmed.png' },
];

export const CustomTeeSection: React.FC<CustomTeeSectionProps> = ({
  onAddToBag,
  onBackToStore,
}) => {
  const customProduct = SHOPIFY_PRODUCTS.find((p) => p.isCustomTee);
  const [selectedColor, setSelectedColor] = useState(CUSTOM_TEE_COLORS[0]);
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [frontTier, setFrontTier] = useState<CustomPrintTierKey>('A4');
  const [backTier, setBackTier] = useState<CustomPrintTierKey>('None');
  const [quantity, setQuantity] = useState<number>(1);

  const [frontArtwork, setFrontArtwork] = useState<{ name: string; url: string } | null>({
    name: 'PrintStuff Tag Mark',
    url: '/brand/printstuff-tag-icon.png',
  });
  const [backArtwork, setBackArtwork] = useState<{ name: string; url: string } | null>(null);
  const [artScale, setArtScale] = useState<number>(58);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const basePrice = 199;
  const frontTierObj = CUSTOM_TEE_PRINT_TIERS.find((t) => t.key === frontTier) || CUSTOM_TEE_PRINT_TIERS[0];
  const backTierObj = CUSTOM_TEE_PRINT_TIERS.find((t) => t.key === backTier) || CUSTOM_TEE_PRINT_TIERS[0];
  const unitPrice = basePrice + frontTierObj.charge + backTierObj.charge;
  const totalPrice = unitPrice * quantity;

  const activeTier = viewSide === 'front' ? frontTier : backTier;
  const activeArtwork = viewSide === 'front' ? frontArtwork : backArtwork;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      if (viewSide === 'front') {
        setFrontArtwork({ name: file.name, url: dataUrl });
        if (frontTier === 'None') setFrontTier('A4');
      } else {
        setBackArtwork({ name: file.name, url: dataUrl });
        if (backTier === 'None') setBackTier('A4');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const applySampleGraphic = (sample: { name: string; url: string }) => {
    if (viewSide === 'front') {
      setFrontArtwork(sample);
      if (frontTier === 'None') setFrontTier('A4');
    } else {
      setBackArtwork(sample);
      if (backTier === 'None') setBackTier('A4');
    }
  };

  // Overlay placement bounds matching print tier size
  const getZoneClass = () => {
    if (activeTier === 'Pocket') return 'top-[28%] left-[53%] w-[16%] aspect-square';
    if (activeTier === 'A4') return 'top-[26%] left-1/2 -translate-x-1/2 w-[30%] aspect-[3/4]';
    if (activeTier === 'A3') return 'top-[23%] left-1/2 -translate-x-1/2 w-[37%] aspect-[3/4]';
    if (activeTier === 'Full print') return 'top-[20%] left-1/2 -translate-x-1/2 w-[44%] aspect-[3/4]';
    return 'hidden';
  };

  const handleAddCustom = () => {
    onAddToBag({
      id: `custom-tee-${selectedColor.name}-${selectedSize}-${frontTier}-${backTier}-${Date.now()}`,
      productId: customProduct?.id || '11014367019148',
      handle: customProduct?.handle || 'custom-printed-t-shirt',
      title: 'Custom Printed T-Shirt',
      image: viewSide === 'front' ? selectedColor.frontImg : selectedColor.backImg,
      size: selectedSize,
      color: selectedColor.name,
      printSummary: `Front: ${frontTier} | Back: ${backTier}`,
      frontPrint: frontTier,
      backPrint: backTier,
      customArtworkName: frontArtwork?.name || backArtwork?.name,
      customArtworkDataUrl: frontArtwork?.url || backArtwork?.url,
      unitPrice,
      quantity,
    });
  };

  return (
    <section id="custom-studio" className="bg-white min-h-[calc(100vh-110px)] py-10 sm:py-14 px-4 sm:px-8">
      <div className="max-w-[1380px] mx-auto">
        {onBackToStore && (
          <div className="mb-6">
            <button
              type="button"
              onClick={onBackToStore}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F3] border border-black/15 hover:border-[#111114] text-xs font-semibold text-[#111114] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All 76 Store Pieces</span>
            </button>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-black/[0.08]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#00A8E8] mb-2">
              Custom Print Studio · Base ₹199
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111114] tracking-tight">
              Design Your Custom Printed T-Shirt
            </h2>
          </div>
          <p className="text-sm text-[#52525B] max-w-md">
            Exact PrintStuff Shopify pricing: ₹199 blank tee plus your chosen Front and Back print sizes — Pocket (+₹50), A4 (+₹100), A3 (+₹150), or Full Print (+₹200).
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Live Garment Canvas */}
          <div className="lg:col-span-6 bg-[#F5F5F3] rounded-2xl border border-black/[0.08] p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-1 p-1 bg-black/[0.06] rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewSide('front')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    viewSide === 'front' ? 'bg-white text-[#111114] shadow-xs' : 'text-[#52525B]'
                  }`}
                >
                  Front View
                </button>
                <button
                  type="button"
                  onClick={() => setViewSide('back')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    viewSide === 'back' ? 'bg-white text-[#111114] shadow-xs' : 'text-[#52525B]'
                  }`}
                >
                  Back View
                </button>
              </div>

              <span className="text-xs font-medium text-[#52525B]">
                {selectedColor.name} · {viewSide === 'front' ? `Front: ${frontTier}` : `Back: ${backTier}`}
              </span>
            </div>

            {/* Mockup Frame */}
            <div className="relative mx-auto w-full max-w-[420px] aspect-[7/8] bg-white rounded-xl overflow-hidden border border-black/[0.06] shadow-sm flex items-center justify-center">
              <ProductImage
                src={viewSide === 'front' ? selectedColor.frontImg : selectedColor.backImg}
                alt={`Custom Printed T-Shirt — ${selectedColor.name} ${viewSide}`}
                loading="eager"
                className="w-full h-full object-contain"
              />

              {/* Print Area Bounding Indicator & Live Artwork Preview */}
              {activeTier !== 'None' && (
                <div
                  className={`absolute pointer-events-none border border-dashed border-[#00A8E8]/75 bg-[#00A8E8]/[0.04] flex items-center justify-center transition-all ${getZoneClass()}`}
                >
                  {activeArtwork ? (
                    <img
                      src={activeArtwork.url}
                      alt="Custom artwork preview"
                      style={{ width: `${artScale}%`, height: `${artScale}%` }}
                      className="object-contain drop-shadow-sm"
                    />
                  ) : (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A8E8] text-center px-1">
                      {activeTier}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Colour Picker Strip */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-black/[0.08]">
              <span className="text-xs font-semibold text-[#111114]">
                Tee Colour: <span className="font-normal text-[#52525B]">{selectedColor.name}</span>
              </span>
              <div className="flex items-center gap-2">
                {CUSTOM_TEE_COLORS.map((c) => {
                  const active = c.name === selectedColor.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      title={c.name}
                      aria-label={`Select ${c.name}`}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 rounded-full border border-black/20 transition-transform cursor-pointer ${
                        active ? 'ring-2 ring-[#111114] ring-offset-2 ring-offset-[#F5F5F3] scale-110' : 'hover:scale-105'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Print Pricing, Artwork & Size Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              {/* Front & Back Print Size Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F5F5F3] border border-black/[0.08]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#111114]">
                      Front Print Size
                    </span>
                    <span className="text-xs font-mono font-semibold tabular-nums text-[#00A8E8]">
                      +{formatINR(frontTierObj.charge)}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {CUSTOM_TEE_PRINT_TIERS.map((tier) => {
                      const active = frontTier === tier.key;
                      return (
                        <button
                          key={`front-${tier.key}`}
                          type="button"
                          onClick={() => {
                            setFrontTier(tier.key);
                            setViewSide('front');
                          }}
                          className={`w-full px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#111114] text-white font-semibold'
                              : 'bg-white text-[#111114] border border-black/10 hover:border-black/30'
                          }`}
                        >
                          <span>{tier.label}</span>
                          <span className="font-mono tabular-nums opacity-85">
                            {tier.charge === 0 ? '₹0' : `+₹${tier.charge}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F5F3] border border-black/[0.08]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#111114]">
                      Back Print Size
                    </span>
                    <span className="text-xs font-mono font-semibold tabular-nums text-[#E6007E]">
                      +{formatINR(backTierObj.charge)}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {CUSTOM_TEE_PRINT_TIERS.map((tier) => {
                      const active = backTier === tier.key;
                      return (
                        <button
                          key={`back-${tier.key}`}
                          type="button"
                          onClick={() => {
                            setBackTier(tier.key);
                            setViewSide('back');
                          }}
                          className={`w-full px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#111114] text-white font-semibold'
                              : 'bg-white text-[#111114] border border-black/10 hover:border-black/30'
                          }`}
                        >
                          <span>{tier.label}</span>
                          <span className="font-mono tabular-nums opacity-85">
                            {tier.charge === 0 ? '₹0' : `+₹${tier.charge}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Artwork Upload & Scale */}
              <div className="p-4 rounded-xl bg-[#F5F5F3] border border-black/[0.08] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#111114]">
                    Artwork for {viewSide === 'front' ? 'Front' : 'Back'} Side
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      onChange={handleUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111114] text-white text-xs font-semibold hover:bg-[#27272D] cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Graphic</span>
                    </button>
                    {activeArtwork && (
                      <button
                        type="button"
                        onClick={() =>
                          viewSide === 'front' ? setFrontArtwork(null) : setBackArtwork(null)
                        }
                        aria-label="Clear artwork"
                        className="p-1.5 rounded-lg border border-black/15 bg-white text-[#52525B] hover:text-[#111114] cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {SAMPLE_GRAPHICS.map((g) => (
                    <button
                      key={g.name}
                      type="button"
                      onClick={() => applySampleGraphic(g)}
                      className="px-2.5 py-1.5 rounded-md bg-white border border-black/10 hover:border-[#111114] text-[11px] font-medium text-[#111114] cursor-pointer"
                    >
                      Use {g.name}
                    </button>
                  ))}
                </div>

                {activeArtwork && activeTier !== 'None' && (
                  <div className="pt-1 flex items-center gap-3">
                    <label htmlFor="art-scale" className="text-[11px] font-medium text-[#52525B] whitespace-nowrap">
                      Scale ({artScale}%)
                    </label>
                    <input
                      id="art-scale"
                      type="range"
                      min={25}
                      max={95}
                      value={artScale}
                      onChange={(e) => setArtScale(Number(e.target.value))}
                      className="w-full accent-[#111114]"
                    />
                  </div>
                )}
              </div>

              {/* Size & Quantity */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#52525B] mb-2">
                    Size
                  </div>
                  <div className="flex items-center gap-1.5">
                    {['S', 'M', 'L', 'XL', '2XL'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`w-10 h-10 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#111114] text-white'
                            : 'bg-[#F5F5F3] text-[#111114] border border-black/10 hover:border-[#111114]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#52525B] mb-2">
                    Quantity
                  </div>
                  <div className="inline-flex items-center border border-black/15 rounded-lg bg-[#F5F5F3]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-10 text-sm font-semibold hover:bg-black/5 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-xs font-mono font-bold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-10 text-sm font-semibold hover:bg-black/5 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Summary & Add to Bag */}
            <div className="p-5 rounded-2xl bg-[#111114] text-[#F5F5F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-white/70 font-mono tabular-nums">
                  ₹199 Base + ₹{frontTierObj.charge} Front + ₹{backTierObj.charge} Back
                </div>
                <div className="mt-1 font-display text-2xl font-bold tabular-nums">
                  {formatINR(totalPrice)}
                  {quantity > 1 && (
                    <span className="ml-2 text-xs font-normal text-white/70">
                      ({formatINR(unitPrice)} each)
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddCustom}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFCA05] text-[#111114] hover:bg-[#FFD633] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Custom Tee to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
