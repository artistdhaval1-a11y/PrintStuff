import React from 'react';
import { ShoppingBag } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full bg-[#F5F5F3]/95 backdrop-blur-md border-b border-black/[0.08]">
      {/* Slim Announcement Strip */}
      <div className="w-full bg-[#111114] text-[#F5F5F3] px-4 py-1.5 text-[11px] font-medium tracking-wide flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span className="uppercase tracking-widest text-white/80">New Drop</span>
        <span aria-hidden="true" className="text-[#00A8E8]">·</span>
        <button
          type="button"
          onClick={() => onChangePage('custom')}
          className="px-2 py-0.5 rounded bg-[#FFCA05] text-[#111114] font-bold text-[10px] uppercase tracking-wider hover:bg-[#FFD633] transition-colors cursor-pointer"
        >
          Custom Tees From ₹199
        </button>
        <span aria-hidden="true" className="text-[#E6007E]">·</span>
        <span className="text-white/85">Free Pan-India Shipping Over ₹1,999</span>
      </div>

      {/* Main 3-Zone Top Bar */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Lockup */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onChangePage('store');
          }}
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111114] rounded-md py-1"
          aria-label="PrintStuff Home"
        >
          <img
            src="/brand/printstuff-tag-icon.png"
            alt=""
            className="h-8 w-auto object-contain select-none"
          />
          <img
            src="/brand/printstuff-wordmark-black.png"
            alt="PrintStuff"
            className="h-7 w-auto object-contain select-none"
          />
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-[13px] font-semibold tracking-wide text-[#111114]/75"
        >
          <button
            type="button"
            onClick={() => onChangePage('store')}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'store'
                ? 'text-[#111114] border-[#111114]'
                : 'border-transparent hover:text-[#111114]'
            }`}
          >
            Store
          </button>
          <button
            type="button"
            onClick={() => onChangePage('store', 'lookbook')}
            className="py-1 border-b-2 border-transparent hover:border-[#E6007E] hover:text-[#111114] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Change Look
          </button>
          <button
            type="button"
            onClick={() => onChangePage('store', 'catalogue')}
            className="py-1 border-b-2 border-transparent hover:border-[#FFCA05] hover:text-[#111114] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            All 76 Pieces
          </button>
          <button
            type="button"
            onClick={() => onChangePage('custom')}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'custom'
                ? 'text-[#00A8E8] border-[#00A8E8]'
                : 'border-transparent hover:border-[#00A8E8] hover:text-[#111114]'
            }`}
          >
            Custom Print
          </button>
        </nav>

        {/* Zone 3: Mobile Custom Switch + Bag CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onChangePage(activePage === 'custom' ? 'store' : 'custom')}
            className="md:hidden px-3 py-1.5 rounded-full border border-[#00A8E8] text-[11px] font-semibold text-[#111114] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {activePage === 'custom' ? 'Store' : 'Custom Print'}
          </button>

          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open shopping bag (${bagCount} items)`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111114] text-[#F5F5F3] hover:bg-[#27272D] transition-colors text-xs font-semibold tracking-wide whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="tabular-nums inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#FFCA05] text-[#111114] text-[11px] font-bold">
              {bagCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
