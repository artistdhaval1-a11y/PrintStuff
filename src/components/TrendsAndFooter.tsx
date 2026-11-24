import React, { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, MessageCircle, Shuffle } from 'lucide-react';
import { StoreProduct } from '../data/shopifyCatalog';
import { formatINR } from '../utils/format';
import { ProductImage } from './ProductImage';

interface TrendsAndFooterProps {
  products: StoreProduct[];
  onInspectProduct: (product: StoreProduct, list: StoreProduct[]) => void;
  onOpenCustomPage: () => void;
  onNavigateCatalogue: () => void;
}

export const TrendsAndFooter: React.FC<TrendsAndFooterProps> = ({
  products,
  onInspectProduct,
  onOpenCustomPage,
  onNavigateCatalogue,
}) => {
  const [deckIndex, setDeckIndex] = useState<number>(0);

  const deckItems = useMemo(() => {
    const picks = [
      products.find((p) => p.handle.includes('racing-trio-jacket')),
      products.find((p) => p.handle.includes('tribal-shadow-depth-hoodie-white')),
      products.find((p) => p.handle.includes('cny-inspired-premium-mustard')),
      products.find((p) => p.handle.includes('white-spiderman-hoodie')),
      products.find((p) => p.handle.includes('f1-red-ferrari-unisex-leather-jacket')),
      products.find((p) => p.handle.includes('aesthetic-green-unisex-cargo')),
      products.find((p) => p.handle.includes('f1-porsche-embroidery')),
      products.find((p) => p.isCustomTee),
    ].filter((x): x is StoreProduct => Boolean(x));
    return picks;
  }, [products]);

  const activeCard = deckItems[deckIndex] || deckItems[0];
  const nextCard = deckItems[(deckIndex + 1) % deckItems.length];
  const thirdCard = deckItems[(deckIndex + 2) % deckItems.length];

  const handleNextCard = () => {
    setDeckIndex((i) => (i + 1) % deckItems.length);
  };

  return (
    <>
      {/* Editorial LATEST TRENDS Stacked Card Deck (Video Ref Frame 40) */}
      <section className="bg-white border-t border-black/[0.08] py-16 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Typography + CTAs */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#E6007E]">
              Explore Collection
            </div>
            <h2 className="mt-2 font-display text-5xl sm:text-6xl font-extrabold text-[#111114] leading-[0.95] tracking-tight">
              LATEST
              <br />
              <span className="text-[#00A8E8]">TRENDS</span>
            </h2>
            <p className="mt-5 text-sm text-[#52525B] leading-relaxed max-w-md">
              Built in heavy 380–400 GSM fleece, embroidered racing textiles, and custom printed blank tees. Shuffle through signature highlights or open the custom studio to print your own graphic.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenCustomPage}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E6007E] hover:bg-[#C7006C] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Open Custom Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNextCard}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F5F5F3] border border-black/15 hover:border-[#111114] text-xs font-semibold text-[#111114] cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Next Card ({deckIndex + 1}/{deckItems.length})</span>
              </button>
            </div>
          </div>

          {/* Right Interactive Stacked Card Deck */}
          {activeCard && (
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="relative w-[260px] sm:w-[300px] h-[360px] sm:h-[400px]">
                {/* Background stacked card 3 */}
                {thirdCard && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl bg-[#FFCA05] translate-x-6 translate-y-3 rotate-6 opacity-80 border border-black/15"
                  />
                )}
                {/* Background stacked card 2 */}
                {nextCard && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl overflow-hidden bg-white translate-x-3 translate-y-1.5 rotate-3 border border-black/15 shadow-md"
                  >
                    <ProductImage
                      src={nextCard.images[0]}
                      alt=""
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                )}

                {/* Top Active Interactive Card */}
                <button
                  type="button"
                  onClick={() => onInspectProduct(activeCard, deckItems)}
                  className="relative w-full h-full rounded-2xl overflow-hidden bg-white border-2 border-[#111114] shadow-2xl group text-left cursor-pointer"
                >
                  <ProductImage
                    src={activeCard.images[0]}
                    alt={activeCard.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/45 to-transparent text-white">
                    <div className="text-[11px] font-mono text-[#FFCA05] uppercase">
                      {activeCard.productType} · {formatINR(activeCard.minPrice)}
                    </div>
                    <div className="mt-0.5 font-display text-sm font-bold line-clamp-2">
                      {activeCard.title}
                    </div>
                  </div>
                </button>
              </div>

              <div className="max-w-[200px] space-y-3 text-center sm:text-left">
                <div className="font-mono text-xs tabular-nums text-[#6E6E73]">
                  DROP {String(deckIndex + 1).padStart(2, '0')} OF{' '}
                  {String(deckItems.length).padStart(2, '0')}
                </div>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Click the active card to pick sizes and add to your bag, or shuffle to preview the next piece.
                </p>
                <button
                  type="button"
                  onClick={() => onInspectProduct(activeCard, deckItems)}
                  className="text-xs font-bold text-[#111114] underline underline-offset-4 hover:text-[#00A8E8] cursor-pointer"
                >
                  Inspect {activeCard.productType} →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CMYK Divider Bar */}
      <div aria-hidden="true" className="h-1.5 w-full grid grid-cols-3">
        <div className="bg-[#00A8E8]" />
        <div className="bg-[#E6007E]" />
        <div className="bg-[#FFCA05]" />
      </div>

      {/* Multi-Column Store Footer */}
      <footer className="bg-[#F5F5F3] py-12 px-4 sm:px-8">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <img
              src="/brand/printstuff-logo-trimmed.png"
              alt="PrintStuff Official Logo"
              className="h-24 w-auto object-contain"
            />
            <p className="mt-3 text-xs text-[#52525B] max-w-sm leading-relaxed">
              Official PrintStuff streetwear &amp; custom printing storefront — 76 Shopify catalog drops, exact INR pricing, and custom tees starting at ₹199.
            </p>
          </div>

          <div className="md:col-span-2 space-y-2 text-xs">
            <div className="font-bold uppercase tracking-wider text-[#111114] mb-2">
              Shop
            </div>
            <button
              type="button"
              onClick={onNavigateCatalogue}
              className="block text-[#52525B] hover:text-[#111114] cursor-pointer"
            >
              All 76 Pieces
            </button>
            <button
              type="button"
              onClick={onOpenCustomPage}
              className="block text-[#52525B] hover:text-[#00A8E8] cursor-pointer"
            >
              Custom Printed Tees
            </button>
          </div>

          <div className="md:col-span-2 space-y-2 text-xs">
            <div className="font-bold uppercase tracking-wider text-[#111114] mb-2">
              Storefront
            </div>
            <a
              href="https://print-stuff-store.myshopify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#52525B] hover:text-[#111114]"
            >
              <span>Shopify Store</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-bold uppercase tracking-wider text-[#111114] mb-2">
              Studio Support
            </div>
            <a
              href="https://wa.me/917405652991"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111114] text-white font-semibold hover:bg-[#27272D]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#FFCA05]" />
              <span>WhatsApp +91 74056 52991</span>
            </a>
            <p className="text-[11px] text-[#6E6E73] pt-1">
              © {new Date().getFullYear()} PrintStuff Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
