import React from 'react';
import { Sparkles, ArrowRight, MessageCircle, ShieldCheck, Layers, Truck } from 'lucide-react';
import { HERO_PODIUM_IMAGE, WHATSAPP_RAW_NUMBER, WHATSAPP_PHONE_NUMBER } from '../data/products';

interface HeroProps { onStartCustomizing: () => void; onBrowseCatalog: () => void; }

export const Hero: React.FC<HeroProps> = ({ onStartCustomizing, onBrowseCatalog }) => (
  <section className="relative overflow-hidden bg-[#FFF9ED] border-b-4 border-[#202020]">
    <div className="pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full bg-[#08B9E8]/30 blur-3xl" />
    <div className="pointer-events-none absolute top-24 right-1/4 h-64 w-64 rounded-full bg-[#F01875]/25 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#D7FF00]/35 blur-3xl" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-2 text-xs font-mono font-black text-[#202020] uppercase tracking-widest bg-[#D7FF00] border-2 border-[#202020] shadow-[4px_4px_0_#202020] rounded-full px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-[#F01875] animate-pulse" /> YOUR IDEAS. YOUR FIT. YOUR RULES.
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-[#202020] tracking-tight leading-[0.98]">
            WEAR YOUR<br /><span className="text-[#08B9E8]">WILD SIDE.</span><br /><span className="text-[#F01875]">PRINT YOUR VIBE.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A4640] max-w-xl leading-relaxed">Custom tees, hoodies and merch made your way. Upload your art, make it yours, and turn your ideas into something you can wear.</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button onClick={onStartCustomizing} className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-black text-[#202020] bg-[#D7FF00] border-2 border-[#202020] hover:bg-[#e5ff59] rounded-xl transition-all shadow-lg shadow-[#D7FF00]/25 hover:-translate-y-0.5 active:scale-98"><Sparkles className="w-4 h-4" /><span>MAKE IT YOURS</span><ArrowRight className="w-4 h-4 ml-1" /></button>
            <button onClick={onBrowseCatalog} className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-[#202020] bg-white border-2 border-[#202020] shadow-[4px_4px_0_#08B9E8] hover:border-[#08B9E8] hover:text-[#08B9E8] rounded-xl transition-colors"><span>SHOP THE DROP ↗</span></button>
          </div>
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-[#5E5850] border-t-2 border-[#202020]/20">
            <div className="flex items-center gap-2 text-[#202020]"><span className="text-[#5E5850]">Need a hand?</span><a href={`https://wa.me/${WHATSAPP_RAW_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold font-mono text-[#08B9E8] hover:underline"><MessageCircle className="w-3.5 h-3.5" />{WHATSAPP_PHONE_NUMBER}</a></div>
            <span className="text-[#F01875] hidden sm:inline">✦</span><span>MOQ: 1 Piece</span><span className="text-neutral-600 hidden sm:inline">✦</span><span>Pan-India Delivery</span>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#08B9E8]/40 via-[#F01875]/30 to-[#D7FF00]/30 blur-xl" />
          <div className="relative rounded-2xl overflow-hidden border-4 border-[#202020] bg-white shadow-[10px_10px_0_#F01875]">
            <img src={HERO_PODIUM_IMAGE} alt="PrintStuff custom apparel collection featuring T-shirt, hoodie, polo, and cap" className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#202020]/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-xs text-[#202020] bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-[#D7FF00]/40">
              <span className="font-black text-[#202020]">MADE TO STAND OUT</span><span className="font-mono text-[#D7FF00] text-[11px]">180–320 GSM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t-2 border-[#202020]/20">
        <div className="p-4 rounded-xl bg-white border-2 border-[#202020] shadow-[5px_5px_0_#08B9E8]"><Layers className="w-5 h-5 text-[#08B9E8] mb-2" /><div className="text-sm font-black text-[#202020]">180–320 GSM</div><div className="text-xs text-[#5E5850] mt-1">Comfy fabrics, made to move</div></div>
        <div className="p-4 rounded-xl bg-white border-2 border-[#202020] shadow-[5px_5px_0_#F01875]"><ShieldCheck className="w-5 h-5 text-[#F01875] mb-2" /><div className="text-sm font-black text-white">PRINT THAT LASTS</div><div className="text-xs text-neutral-400 mt-1">Colour that stays bold</div></div>
        <div className="p-4 rounded-xl bg-white border-2 border-[#202020] shadow-[5px_5px_0_#D7FF00]"><Sparkles className="w-5 h-5 text-[#D7FF00] mb-2" /><div className="text-sm font-black text-white">FROM 1 PIECE</div><div className="text-xs text-neutral-400 mt-1">Try one or create a whole drop</div></div>
        <div className="p-4 rounded-xl bg-neutral-900/70 border border-[#08B9E8]/40"><Truck className="w-5 h-5 text-[#08B9E8] mb-2" /><div className="text-sm font-black text-white">DELIVERED TO YOU</div><div className="text-xs text-neutral-400 mt-1">Easy WhatsApp ordering</div></div>
      </div>
    </div>
  </section>
);