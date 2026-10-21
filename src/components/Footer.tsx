import React from 'react';
import { Logo } from './Logo';
import { WHATSAPP_RAW_NUMBER, WHATSAPP_PHONE_NUMBER } from '../data/products';
import { MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Logo />
            <p className="text-neutral-400 leading-relaxed text-xs">
              Premium custom apparel manufacturing and direct textile printing. Engineered for startups, athletic teams, events, and corporate merchandise.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_RAW_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 hover:bg-emerald-900/60 transition-colors font-mono font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{WHATSAPP_PHONE_NUMBER}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <div className="font-display font-bold text-white text-sm">Navigation</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors"
                >
                  Apparel Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio')}
                  className="hover:text-white transition-colors text-emerald-400 font-semibold"
                >
                  Interactive Custom Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-white transition-colors"
                >
                  Tiered Wholesale Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quality')}
                  className="hover:text-white transition-colors"
                >
                  Fabric GSM Standards
                </button>
              </li>
            </ul>
          </div>

          {/* Apparel Range */}
          <div className="space-y-3">
            <div className="font-display font-bold text-white text-sm">Product Range</div>
            <ul className="space-y-2">
              <li>Crew Neck T-Shirt (180 GSM Biowashed)</li>
              <li>Zipper Hoodie (320 GSM Brushed Loopknit)</li>
              <li>Regular Pullover Hoodie (320 GSM)</li>
              <li>Normal Polo (180 GSM Loopknit)</li>
              <li>Premium Polo (220 GSM Cotton Matty)</li>
              <li>Custom Cap (Universal Free Size)</li>
            </ul>
          </div>

          {/* Order Details & Logistics */}
          <div className="space-y-3">
            <div className="font-display font-bold text-white text-sm">Order & Delivery</div>
            <div className="space-y-2 text-neutral-400">
              <p>• Minimum Order: 1 Piece</p>
              <p>• Pan-India Courier & Cargo Delivery</p>
              <p>• Shipping extra as applicable per destination</p>
              <p>• Digital pre-production mockup approval on WhatsApp</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} PrintStuff Apparel Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Direct WhatsApp Enquiry: {WHATSAPP_PHONE_NUMBER}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
