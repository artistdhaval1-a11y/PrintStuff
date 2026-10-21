import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { WHATSAPP_RAW_NUMBER } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Official Brand Wordmark & Logo */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded py-1 transition-opacity hover:opacity-95"
            aria-label="PrintStuff Home"
          >
            <Logo size="header" allowQuickUpload={false} />
          </button>
        </div>

        {/* Zone 2: Nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            onClick={() => onNavigate('catalog')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Catalogue
          </button>
          <button
            onClick={() => onNavigate('studio')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-emerald-400 font-semibold"
          >
            Custom Studio
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Volume Pricing
          </button>
          <button
            onClick={() => onNavigate('quality')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Fabric Specs
          </button>
        </nav>

        {/* Zone 3: Primary Action & Cart Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hi PrintStuff team, I would like to inquire about custom printing for apparel.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 rounded-lg hover:bg-emerald-900/60 transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>+91-74056-52991</span>
          </a>

          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Bag"
            className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>Bag</span>
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-emerald-500 text-neutral-950 font-bold rounded-full text-[11px] tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
