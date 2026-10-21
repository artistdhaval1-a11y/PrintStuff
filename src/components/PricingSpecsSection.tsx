import React from 'react';
import { Product } from '../types';
import { PRODUCTS, WHATSAPP_RAW_NUMBER } from '../data/products';
import { Layers, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

interface PricingSpecsSectionProps {
  onSelectProductForStudio: (product: Product) => void;
}

export const PricingSpecsSection: React.FC<PricingSpecsSectionProps> = ({
  onSelectProductForStudio
}) => {
  return (
    <section id="pricing" className="py-16 bg-[#FFF9ED] border-b-2 border-[#202020]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#F01875] mb-2">
              Transparent Factory Tiered Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#202020] tracking-tight">
              Volume Pricing & Fabric Standards
            </h2>
            <p className="text-sm text-[#5E5850] mt-2 max-w-xl">
              Official wholesale rates directly from the PrintStuff manufacturing catalog. All price tiers automatically apply to both single orders and corporate bulk runs.
            </p>
          </div>

          <div className="p-3 bg-white border-2 border-[#202020]/20 rounded-xl text-xs text-[#5E5850]">
            <span className="font-semibold text-[#F01875]">Note: </span>
            <span>Shipping extra will be applicable on all orders based on delivery destination.</span>
          </div>
        </div>

        {/* Pricing Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border-2 border-[#202020] bg-white shadow-[6px_6px_0_#08B9E8]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-[#202020]/20 bg-[#FFF0D8] text-xs font-mono uppercase tracking-wider text-[#5E5850]">
                <th className="py-4 px-6 font-semibold">Garment Style</th>
                <th className="py-4 px-4 font-semibold">Fabric & GSM</th>
                <th className="py-4 px-4 font-semibold text-center">Upto 10 pcs</th>
                <th className="py-4 px-4 font-semibold text-center">Upto 20 pcs</th>
                <th className="py-4 px-4 font-semibold text-center">Upto 50 pcs</th>
                <th className="py-4 px-4 font-semibold text-center text-[#F01875]">50+ pcs Bulk</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202020]/10">
              {PRODUCTS.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#FFF0D8] transition-colors group"
                >
                  {/* Name & Photo thumbnail */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FFF9ED] border border-[#202020]/20 p-0.5 overflow-hidden shrink-0">
                        <img
                          src={product.images.front}
                          alt={product.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-[#F01875] transition-colors text-sm">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-[#5E5850]">
                          Sizes: {product.sizes.join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Fabric & GSM */}
                  <td className="py-4 px-4">
                    <div className="text-xs font-medium text-[#202020]">
                      {product.fabric}
                    </div>
                    <div className="text-[11px] text-[#5E5850] font-mono">
                      {product.gsm} GSM &bull; {product.blend}
                    </div>
                  </td>

                  {/* Upto 10 */}
                  <td className="py-4 px-4 text-center font-mono tabular-nums text-[#202020] font-semibold">
                    ₹{product.priceTiers[0].price}/-
                  </td>

                  {/* Upto 20 */}
                  <td className="py-4 px-4 text-center font-mono tabular-nums text-[#202020] font-semibold">
                    ₹{product.priceTiers[1].price}/-
                  </td>

                  {/* Upto 50 */}
                  <td className="py-4 px-4 text-center font-mono tabular-nums text-[#202020] font-semibold">
                    ₹{product.priceTiers[2].price}/-
                  </td>

                  {/* 50+ */}
                  <td className="py-4 px-4 text-center font-mono tabular-nums text-[#F01875] font-bold bg-emerald-950/20">
                    ₹{product.priceTiers[3].price}/-
                  </td>

                  {/* Customise button */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onSelectProductForStudio(product)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#202020] bg-[#D7FF00] border border-[#202020] hover:bg-[#e5ff59] rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Customise</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quality & Manufacturing Assurance Grid */}
        <div id="quality" className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border-2 border-[#202020]/15 shadow-[4px_4px_0_#D7FF00] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-[#F01875]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-[#202020] text-base">
              Fabric Engineering
            </h3>
            <p className="text-xs text-[#5E5850] leading-relaxed">
              We exclusively use 180 GSM biowashed cotton, 220 GSM structured piqué cotton matty, and heavy 320 GSM brushed loopknit fleece for our winter hoodies. No lightweight synthetic compromises.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border-2 border-[#202020]/15 shadow-[4px_4px_0_#D7FF00] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-[#F01875]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-[#202020] text-base">
              Print Durability Guarantee
            </h3>
            <p className="text-xs text-[#5E5850] leading-relaxed">
              High-definition industrial printing that cures deep into the textile fibers. Resists cracking, peeling, and fading through dozens of commercial wash cycles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border-2 border-[#202020]/15 shadow-[4px_4px_0_#D7FF00] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-[#F01875]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-[#202020] text-base">
              Human Pre-Production Review
            </h3>
            <p className="text-xs text-[#5E5850] leading-relaxed">
              Every WhatsApp order is reviewed by our apparel specialists before production. We check print resolution, Pantone matches, and exact chest/back placements to prevent mistakes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
