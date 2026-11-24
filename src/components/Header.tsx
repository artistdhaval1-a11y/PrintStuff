import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';

export type StorePage = 'store' | 'custom';

interface HeaderProps {
  activePage: StorePage;
  bagCount: number;
  onChangePage: (page: StorePage, sectionId?: string) => void;
  onOpenBag: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  bagCount,
  onChangePage,
  onOpenBag,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F5EF]/95 backdrop-blur-xl border-b border-[#171717]/10">
      <div className="w-full bg-[#DFFF00] text-[#171717] px-3 py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.14em] flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <Zap className="w-3.5 h-3.5 fill-current" />
        <span>Fresh Fits. Loud Energy.</span>
        <span aria-hidden="true">✳</span>
        <button
          type="button"
          onClick={() => onChangePage('custom')}
          className="underline underline-offset-2 decoration-2 hover:text-[#254BFF] transition-colors cursor-pointer"
        >
          Custom tees from ₹199
        </button>
        <span aria-hidden="true">✳</span>
        <span>Pan-India shipping</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-[68px] flex items-center justify-between gap-4">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onChangePage('store');
          }}
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#254BFF] rounded-md py-1"
          aria-label="PrintStuff Home"
        >
          <img src="/brand/printstuff-tag-icon.png" alt="" className="h-9 w-auto object-contain select-none" />
          <img src="/brand/printstuff-wordmark-black.png" alt="PrintStuff" className="h-7 w-auto object-contain select-none" />
        </a>

        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#171717]">
          <button type="button" onClick={() => onChangePage('store')} className={`py-2 border-b-[3px] transition-colors whitespace-nowrap cursor-pointer ${activePage === 'store' ? 'border-[#FF5A1F]' : 'border-transparent hover:border-[#DFFF00]'}`}>Shop</button>
          <button type="button" onClick={() => onChangePage('store', 'lookbook')} className="py-2 border-b-[3px] border-transparent hover:border-[#FF5A1F] transition-colors whitespace-nowrap cursor-pointer">Lookbook</button>
          <button type="button" onClick={() => onChangePage('store', 'catalogue')} className="py-2 border-b-[3px] border-transparent hover:border-[#254BFF] transition-colors whitespace-nowrap cursor-pointer">All Drops</button>
          <button type="button" onClick={() => onChangePage('custom')} className={`py-2 border-b-[3px] transition-colors whitespace-nowrap cursor-pointer ${activePage === 'custom' ? 'border-[#254BFF] text-[#254BFF]' : 'border-transparent hover:border-[#254BFF]'}`}>Custom Lab</button>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={() => onChangePage(activePage === 'custom' ? 'store' : 'custom')} className="md:hidden px-3 py-2 rounded-full border-2 border-[#171717] text-[10px] font-black uppercase tracking-wider whitespace-nowrap cursor-pointer">
            {activePage === 'custom' ? 'Shop' : 'Custom Lab'}
          </button>
          <button type="button" onClick={onOpenBag} aria-label={`Open shopping bag (${bagCount} items)`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#171717] text-white hover:bg-[#254BFF] transition-colors text-[11px] font-black uppercase tracking-wider whitespace-nowrap shadow-[3px_3px_0_#DFFF00] cursor-pointer">
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="tabular-nums inline-flex items-center justify-center min-w-[21px] h-[21px] px-1.5 rounded-full bg-[#DFFF00] text-[#171717] text-[11px] font-black">{bagCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
