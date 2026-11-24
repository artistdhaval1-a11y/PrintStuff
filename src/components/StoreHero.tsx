import React from 'react';
import { ArrowDownRight, ArrowRight, Palette, Zap } from 'lucide-react';
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
    { key: 'custom-printing', title: 'Custom Print', subtitle: 'Make it yours', accentHex: '#DFFF00', product: products.find((p) => p.isCustomTee) },
    { key: 't-shirts', title: 'Graphic Tees', subtitle: 'Wear your mood', accentHex: '#FF5A1F', product: products.find((p) => p.collections.includes('t-shirts') && !p.isCustomTee) },
    { key: 'hoodies', title: 'Hoodies', subtitle: 'Heavyweight energy', accentHex: '#254BFF', product: products.find((p) => p.collections.includes('hoodies')) },
    { key: 'jackets', title: 'Racing Jackets', subtitle: 'Fast lane fits', accentHex: '#FF5A1F', product: products.find((p) => p.handle.includes('marlboro-racing')) },
    { key: 'sweatshirts', title: 'Sweatshirts', subtitle: 'Off-duty uniform', accentHex: '#DFFF00', product: products.find((p) => p.collections.includes('sweatshirts')) },
    { key: 'cargos', title: 'Cargos & Pants', subtitle: 'Room to move', accentHex: '#254BFF', product: products.find((p) => p.collections.includes('cargos')) },
  ];

  return (
    <section id="top" className="ps-hero bg-[#F7F5EF] overflow-hidden">
      <div className="ps-hero__top relative bg-[#DFFF00]">
        <div aria-hidden="true" className="absolute -right-24 -top-28 w-[420px] h-[420px] rounded-full border-[55px] border-[#FF5A1F]/20" />
        <div aria-hidden="true" className="ps-hero__burst absolute left-[47%] top-12 hidden xl:block">✳</div>
        <div aria-hidden="true" className="ps-hero__side-label hidden lg:block">PRINTSTUFF — MADE TO BE SEEN</div>
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-16 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-center min-h-[540px]">
          <div className="relative z-10 max-w-[660px]">
            <div className="ps-hero__edition">ISSUE 001 <span>✳</span> THE NO-UNIFORM CLUB</div>
            <div className="inline-flex items-center gap-2 bg-[#171717] text-[#DFFF00] px-3 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] -rotate-2 shadow-[4px_4px_0_#FF5A1F]">
              <Zap className="w-3.5 h-3.5 fill-current" /> Independent streetwear energy
            </div>
            <h1 className="mt-7 font-display text-[58px] sm:text-7xl lg:text-[clamp(4.5rem,7.8vw,8.2rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-[#171717]">
              Wear<br />
              <span className="text-[#254BFF]">Your</span><br />
              <span className="inline-block bg-[#FF5A1F] px-3 py-1 -rotate-2 text-[#171717]">Own</span> Rules<span className="text-[#FF5A1F]">.</span>
            </h1>
            <p className="mt-7 max-w-md text-sm sm:text-base font-semibold leading-relaxed text-[#171717]/75">
              Streetwear for the ones who never blend in. Graphic tees, heavyweight layers, racing-inspired pieces and custom prints made your way.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button type="button" onClick={onBrowseAll} className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#171717] text-white hover:bg-[#254BFF] text-xs font-black uppercase tracking-wider transition-all shadow-[5px_5px_0_#FF5A1F] hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
                Shop the drops <ArrowRight className="w-4 h-4" />
              </button>
              <button type="button" onClick={onOpenCustomPage} className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F7F5EF] border-2 border-[#171717] text-[#171717] hover:bg-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer">
                <Palette className="w-4 h-4" /> Custom Lab · ₹199
              </button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#171717]/65">
              <span className="w-8 h-[2px] bg-[#171717]" /> No uniform. No rules. Just your style.
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[650px] lg:ml-auto">
            <div className="absolute -top-5 -left-4 sm:-left-8 z-20 bg-[#FF5A1F] text-[#171717] w-[88px] h-[88px] sm:w-[112px] sm:h-[112px] rounded-full flex flex-col items-center justify-center text-center rotate-[-12deg] border-[3px] border-[#171717] shadow-[5px_5px_0_#171717]">
              <span className="text-[9px] font-black uppercase tracking-widest">Made to</span>
              <span className="text-xl sm:text-2xl font-black leading-none">STAND</span>
              <span className="text-[9px] font-black uppercase tracking-widest">OUT ✳</span>
            </div>
            <div className="relative aspect-[4/4.25] sm:aspect-[5/4] overflow-hidden border-[5px] border-[#171717] rounded-[42%_42%_18px_18px] bg-[#254BFF] shadow-[10px_10px_0_#171717]">
              <div className="ps-campaign-poster absolute inset-0 overflow-hidden bg-[#254BFF] text-[#F7F5EF]">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#F7F5EF 1px, transparent 1px)', backgroundSize: '13px 13px' }} />
                <div className="absolute -right-12 top-10 w-56 h-56 rounded-full bg-[#DFFF00] border-[12px] border-[#171717] shadow-[8px_8px_0_#171717] rotate-12" />
                <div className="absolute -left-10 bottom-24 w-44 h-44 rounded-full border-[22px] border-[#FF5A1F] rotate-12" />
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em]">
                  <span className="bg-[#171717] text-[#DFFF00] px-3 py-2">PrintStuff®</span><span className="text-[#171717]">Independent uniform / 001</span>
                </div>
                <div className="absolute top-[23%] left-[7%] z-10">
                  <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.35em] text-[#DFFF00]">Not made to fit in</div>
                  <div className="mt-2 font-display text-[clamp(3.4rem,8vw,6.8rem)] font-black uppercase leading-[.76] tracking-[-.09em] text-[#F7F5EF] drop-shadow-[5px_5px_0_#171717]">BREAK<br/><span className="text-[#DFFF00]">THE</span><br/>RULES<span className="text-[#FF5A1F]">.</span></div>
                </div>
                <div className="absolute right-[7%] bottom-[22%] z-10 rotate-[-8deg] bg-[#FF5A1F] border-[3px] border-[#171717] px-4 py-3 text-[#171717] shadow-[5px_5px_0_#171717]">
                  <div className="text-[9px] font-black uppercase tracking-[0.2em]">Streetwear drop</div><div className="text-2xl font-black uppercase leading-none">Own it.</div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t-2 border-[#F7F5EF]/70 pt-3">
                  <div><div className="text-[9px] font-black uppercase tracking-[0.25em] text-[#DFFF00]">Graphic tees • Custom prints</div><div className="mt-1 text-xl sm:text-2xl font-black uppercase">Wear your own rules.</div></div>
                  <div className="w-10 h-10 rounded-full bg-[#DFFF00] text-[#171717] flex items-center justify-center border-2 border-[#171717]"><ArrowDownRight className="w-6 h-6" /></div>
                </div>
                <div className="absolute left-[7%] bottom-[27%] rotate-[-10deg] rounded-full bg-[#DFFF00] text-[#171717] border-2 border-[#171717] px-3 py-2 text-[9px] font-black uppercase tracking-widest">No uniform ✳</div>
              </div>
            </div>
            <div className="ps-hero__price-sticker absolute -bottom-5 -right-2 sm:-right-5 z-20 bg-[#254BFF] text-white px-4 py-3 rotate-3 border-2 border-[#171717] shadow-[4px_4px_0_#DFFF00]">
              <div className="text-[9px] font-black uppercase tracking-[0.2em]">Fresh fits only</div>
              <div className="text-lg font-black uppercase leading-none">Drop your vibe.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#171717] text-[#F7F5EF] overflow-hidden py-3">
        <div className="flex w-max items-center gap-7 animate-[ps-marquee_26s_linear_infinite] whitespace-nowrap text-[11px] sm:text-xs font-black uppercase tracking-[0.2em]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-7"><span>Street is a mindset</span><span className="text-[#DFFF00]">✳</span><span>Graphic tees</span><span className="text-[#FF5A1F]">✳</span><span>Heavyweight layers</span><span className="text-[#254BFF]">✳</span><span>Custom made loud</span><span className="text-[#DFFF00]">✳</span></span>
          ))}
        </div>
      </div>

      <div className="ps-lanes max-w-[1440px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FF5A1F]">Pick your lane ✳</div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black uppercase tracking-[-0.05em] text-[#171717]">
              Find your <span className="text-[#254BFF]">uniform.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#52525B] max-w-sm">Six ways to show up. Pick a drop and make it yours.</p>
        </div>

        <div className="ps-lanes__grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {moods.map((mood, idx) => (
            <button key={mood.key} type="button" onClick={() => mood.key === 'custom-printing' ? onOpenCustomPage() : onSelectCollection(mood.key)} className={`group text-left transition-all duration-200 hover:-translate-y-2 cursor-pointer ${idx % 2 === 0 ? 'lg:rotate-[-1deg]' : 'lg:rotate-[1deg]'} hover:rotate-0`}>
              <div style={{ borderBottomColor: mood.accentHex }} className="ps-lanes__tile relative aspect-[3/4] overflow-hidden bg-white border-[3px] border-[#171717] border-b-[7px] shadow-[4px_4px_0_#171717] group-hover:shadow-[7px_7px_0_#254BFF] transition-all">
                <ProductImage src={mood.product?.images[0]} alt={mood.title} loading="eager" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute bottom-3 inset-x-3 text-white">
                  <div className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{mood.subtitle}</div>
                  <div className="font-display text-base font-black uppercase leading-tight">{mood.title}</div>
                </div>
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-[#DFFF00] text-[#171717] border border-[#171717]"><ArrowDownRight className="w-4 h-4" /></div>
              </div>
              {mood.product && <div className="mt-2 flex items-center justify-between px-1 text-[10px] font-bold uppercase tracking-wide text-[#52525B]"><span>{mood.key === 'custom-printing' ? 'Build yours' : 'Explore drop'}</span><span className="font-mono font-black text-[#171717] tabular-nums">{formatINR(mood.product.minPrice)}</span></div>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
