import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { WHATSAPP_RAW_NUMBER } from '../data/products';

interface HeaderProps { cartCount: number; onOpenCart: () => void; onNavigate: (sectionId: string) => void; }

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onNavigate }) => (
  <header className="sticky top-0 z-40 w-full bg-[#080808]/95 backdrop-blur-md border-b border-[#D7FF00]/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-6">
      <div className="flex items-center shrink-0"><button onClick={() => onNavigate('hero')} className="flex items-center gap-3 shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00] rounded py-1 transition-opacity hover:opacity-95" aria-label="PrintStuff Home"><Logo size="header" allowQuickUpload={false} /></button></div>
      <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-neutral-300">
        <button onClick={() => onNavigate('catalog')} className="hover:text-[#08B9E8] transition-colors whitespace-nowrap shrink-0">Shop</button>
        <button onClick={() => onNavigate('studio')} className="hover:text-[#F01875] transition-colors whitespace-nowrap shrink-0 text-[#08B9E8] font-black">Custom Studio ✦</button>
        <button onClick={() => onNavigate('pricing')} className="hover:text-[#D7FF00] transition-colors whitespace-nowrap shrink-0">Bulk Deals</button>
        <button onClick={() => onNavigate('quality')} className="hover:text-white transition-colors whitespace-nowrap shrink-0">Fabric & Quality</button>
      </nav>
      <div className="flex items-center gap-3 shrink-0">
        <a href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hi PrintStuff team, I would like to inquire about custom printing for apparel.')}`} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#08B9E8] bg-[#08B9E8]/10 border border-[#08B9E8]/40 rounded-lg hover:bg-[#08B9E8]/20 transition-colors whitespace-nowrap shrink-0"><MessageCircle className="w-3.5 h-3.5" /><span>WhatsApp</span></a>
        <button onClick={onOpenCart} aria-label="Open Shopping Bag" className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-black text-[#080808] bg-[#D7FF00] hover:bg-[#e5ff59] border border-[#D7FF00] rounded-lg transition-colors whitespace-nowrap shrink-0"><ShoppingBag className="w-4 h-4" /><span>Bag</span>{cartCount > 0 && <span className="ml-1 px-1.5 py-0.5 bg-[#F01875] text-white font-black rounded-full text-[11px] tabular-nums">{cartCount}</span>}</button>
      </div>
    </div>
  </header>
);