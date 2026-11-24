import React from 'react';
import { ArrowRight, Palette } from 'lucide-react';
import heroShowroomImg from '../assets/images/hero_printstuff_showroom_1795357534119.jpg';
import { CollectionKey, StoreProduct } from '../data/shopifyCatalog';
import { formatINR } from '../utils/format';
import { ProductImage } from './ProductImage';

interface StoreHeroProps {
  products: StoreProduct[];
  onSelectCollection: (col: CollectionKey) => void;
  onOpenCustomPage: () => void;
  onBrowseAll: () => void;
}

interface MoodCard {
  key: CollectionKey;
  title: string;
  subtitle: string;
  accentHex: string;
  product: StoreProduct | undefined;
}

export const StoreHero: React.FC<StoreHeroProps> = ({
  products,
  onSelectCollection,
  onOpenCustomPage,
  onBrowseAll,
}) => {
  const moods: MoodCard[] = [
    {
      key: 'custom-printing',
      title: 'Custom Print',
      subtitle: 'From ₹199',
      accentHex: '#00A8E8',
      product: products.find((p) => p.isCustomTee),
    },
    {
      key: 't-shirts',
      title: 'Graphic Tees',
      subtitle: 'F1 & Racing Drops',
      accentHex: '#E6007E',
      product: products.find((p) => p.collections.includes('t-shirts') && !p.isCustomTee),
    },
    {
      key: 'hoodies',
      title: 'Puff Hoodies',
      subtitle: '380–400 GSM',
      accentHex: '#FFCA05',
      product: products.find((p) => p.handle.includes('tribal-shadow-depth-hoodie-white')),
    },
    {
      key: 'jackets',
      title: 'Racing Jackets',
      subtitle: '37 Drops',
      accentHex: '#00A8E8',
      product: products.find((p) => p.handle.includes('marlboro-racing')),
    },
    {
      key: 'sweatshirts',
      title: 'Sweatshirts',
      subtitle: 'Cotton Fleece',
      accentHex: '#E6007E',
      product: products.find((p) => p.collections.includes('sweatshirts')),
    },
    {
      key: 'cargos',
      title: 'Cargos & Pants',
      subtitle: 'Wide-Leg Fit',
      accentHex: '#FFCA05',
      product: products.find((p) => p.collections.includes('cargos')),
    },
  ];

  return (
    <section id="top" className="bg-[#F5F5F3]">
      {/* Full-Width Showroom Hero Banner */}
      <div className="relative w-full min-h-[470px] sm:min-h-[540px] flex items-center overflow-hidden bg-[#111114]">
        <img
          src={heroShowroomImg}
          alt="PrintStuff Streetwear Studio Showroom"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Measured Contrast Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#111114]/92 via-[#111114]/70 to-[#111114]/25"
        />

        {/* CMYK Top Accent Hairline */}
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 grid grid-cols-3">
          <div className="bg-[#00A8E8]" />
          <div className="bg-[#E6007E]" />
          <div className="bg-[#FFCA05]" />
        </div>

        <div className="relative z-10 max-w-[1380px] mx-auto w-full px-4 sm:px-8 py-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFCA05]">
              <span>Streetwear Meets Custom Ink</span>
            </div>

            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[58px] font-bold text-white leading-[1.06] tracking-tight">
              More Than Streetwear
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-md">
              76 curated hoodies, racing jackets, cargos, and trackpants — plus our interactive Custom Printed T-Shirt Studio starting at ₹199.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onBrowseAll}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCA05] text-[#111114] hover:bg-[#FFD633] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
              >
                <span>Shop All {products.length} Pieces</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenCustomPage}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-[#00A8E8] text-white hover:bg-[#00A8E8] hover:text-[#111114] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Palette className="w-4 h-4" />
                <span>Open Custom Print Studio</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Six Moods / Signature Collections Fanned Arched Strip (Video Ref Style) */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#E6007E]">
              Six Collections
            </div>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#111114] tracking-tight">
              Printed to be <span className="text-[#00A8E8]">Remembered</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#52525B] max-w-sm">
            Jump straight into any PrintStuff drop or launch your custom tee build on its own studio canvas.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {moods.map((mood, idx) => {
            const tiltClass =
              idx % 2 === 0
                ? 'lg:-rotate-1 hover:rotate-0'
                : 'lg:rotate-1 hover:rotate-0';

            return (
              <button
                key={mood.key}
                type="button"
                onClick={() => {
                  if (mood.key === 'custom-printing') {
                    onOpenCustomPage();
                  } else {
                    onSelectCollection(mood.key);
                  }
                }}
                className={`group text-left transition-all duration-200 hover:-translate-y-1.5 cursor-pointer ${tiltClass}`}
              >
                <div
                  style={{ borderBottomColor: mood.accentHex }}
                  className="relative aspect-[3/4] rounded-t-[80px] rounded-b-xl overflow-hidden bg-white border border-black/10 border-b-4 shadow-sm group-hover:shadow-lg transition-shadow"
                >
                  <ProductImage
                    src={mood.product?.images[0]}
                    alt={mood.title}
                    loading="eager"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  <div className="absolute bottom-2.5 inset-x-3 text-white">
                    <div className="text-[11px] font-medium text-white/80">
                      {mood.subtitle}
                    </div>
                    <div className="font-display text-sm font-bold leading-tight">
                      {mood.title}
                    </div>
                  </div>
                </div>
                {mood.product && (
                  <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-[#52525B]">
                    <span>
                      {mood.key === 'custom-printing' ? 'Configure' : 'Explore Drop'}
                    </span>
                    <span className="font-mono font-semibold text-[#111114] tabular-nums">
                      {formatINR(mood.product.minPrice)}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
