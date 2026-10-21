import React from 'react';
import { Sparkles, ArrowRight, MessageCircle, ShieldCheck, Layers, Truck } from 'lucide-react';
import { HERO_PODIUM_IMAGE, WHATSAPP_RAW_NUMBER, WHATSAPP_PHONE_NUMBER } from '../data/products';
import { PrintStuffTagLogo, PrintStuffWordmark } from './BrandLogos';

interface HeroProps {
  onStartCustomizing: () => void;
  onBrowseCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCustomizing, onBrowseCatalog }) => {

  return (
    <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Official PrintStuff Manufacturing & Custom Studio</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              PREMIUM CUSTOM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                APPAREL SOLUTIONS
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
              Custom clothing that speaks your brand. Heavyweight 180–320 GSM cotton fabrics, durable multi-wash prints, and tiered bulk discounts starting from just 1 piece.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartCustomizing}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Customiser Studio</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onBrowseCatalog}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-200 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 hover:text-white rounded-xl transition-colors"
              >
                <span>View Product Catalogue</span>
              </button>
            </div>

            {/* Direct WhatsApp Callout from Brochure */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-400 border-t border-neutral-800/80">
              <div className="flex items-center gap-2 text-white">
                <span className="text-neutral-400">Direct Inquiries:</span>
                <a
                  href={`https://wa.me/${WHATSAPP_RAW_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold font-mono text-emerald-400 hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  {WHATSAPP_PHONE_NUMBER}
                </a>
              </div>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <span>MOQ: 1 Piece Minimum</span>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <span>Pan-India Delivery</span>
            </div>
          </div>

          {/* Right Column: Hero Visual from real brochure photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src={HERO_PODIUM_IMAGE}
                alt="PrintStuff Premium Custom Apparel Collection featuring T-Shirt, Hoodie, Polo, and Cap"
                className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Official Brand Watermark / Stamp in Hero */}
              <div className="absolute top-4 left-4 bg-neutral-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-neutral-800 flex items-center gap-3 shadow-lg">
                <PrintStuffTagLogo className="w-8 h-8 shrink-0 drop-shadow" />
                <div className="border-l border-neutral-800 pl-3 flex items-center">
                  <PrintStuffWordmark color="#FFFFFF" className="h-6 sm:h-7 max-w-[140px]" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300 bg-neutral-950/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-neutral-800">
                <span className="font-semibold text-white">Full Range Ready for Custom Branding</span>
                <span className="font-mono text-emerald-400 text-[11px]">180 - 320 GSM</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Trust Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-neutral-900">
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <Layers className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-sm font-bold text-white">180 – 320 GSM</div>
            <div className="text-xs text-neutral-400 mt-1">Biowashed loopknit & cotton matty</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <ShieldCheck className="w-5 h-5 text-teal-400 mb-2" />
            <div className="text-sm font-bold text-white">Fade-Resistant Print</div>
            <div className="text-xs text-neutral-400 mt-1">Tested to stay sharp after washes</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <Sparkles className="w-5 h-5 text-sky-400 mb-2" />
            <div className="text-sm font-bold text-white">MOQ 1 Piece</div>
            <div className="text-xs text-neutral-400 mt-1">Order single samples or 500+ bulk</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <Truck className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-sm font-bold text-white">Direct WhatsApp Flow</div>
            <div className="text-xs text-neutral-400 mt-1">Instant digital mockups & fast dispatch</div>
          </div>
        </div>
      </div>
    </section>
  );
};
