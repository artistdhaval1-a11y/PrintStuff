import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { Sparkles, Eye, Check } from 'lucide-react';
import { RecoloredApparelImage } from './RecoloredApparelImage';

interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product, initialColor?: ProductColor) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onCustomize, onQuickView }) => {
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const currentImage = activeView === 'back' && product.images.back 
    ? product.images.back 
    : product.images.front;

  const lowestPrice = product.priceTiers[product.priceTiers.length - 1].price;
  const singlePrice = product.priceTiers[0].price;

  return (
    <div className="group flex flex-col rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl">
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] bg-neutral-950 overflow-hidden flex items-center justify-center">
        <RecoloredApparelImage
          src={currentImage}
          productId={product.id}
          view={activeView}
          color={selectedColor}
          alt={`${product.name} - ${activeView} view`}
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-102"
        />

        {/* GSM & Category Quiet Label */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 text-[11px] font-mono font-semibold bg-neutral-900/90 text-neutral-200 backdrop-blur-md rounded-md border border-neutral-700">
            {product.gsm} GSM
          </span>
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase text-neutral-400 bg-neutral-950/80 rounded">
            {product.category}
          </span>
        </div>

        {/* Front / Back Toggle if available */}
        {product.images.back && (
          <div className="absolute top-3 right-3 flex items-center bg-neutral-950/80 backdrop-blur-md p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => setActiveView('front')}
              className={`px-2 py-1 text-[10px] font-medium rounded transition-colors ${
                activeView === 'front'
                  ? 'bg-emerald-500 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setActiveView('back')}
              className={`px-2 py-1 text-[10px] font-medium rounded transition-colors ${
                activeView === 'back'
                  ? 'bg-emerald-500 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Back
            </button>
          </div>
        )}

        {/* Selected Color indicator badge (Non-tinting pure display) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-neutral-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-neutral-800 text-[11px] text-neutral-300">
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <span className="truncate max-w-[120px]">{selectedColor.name}</span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
            {product.fabric} &bull; {product.blend}
          </p>

          {/* Color Swatches */}
          <div className="mt-3">
            <div className="text-[11px] text-neutral-400 mb-1.5 flex items-center justify-between">
              <span>Available Fabric Colours ({product.colors.length}):</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {product.colors.slice(0, 7).map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      isSelected
                        ? 'ring-2 ring-emerald-400 scale-110 border-white'
                        : 'border-neutral-700 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
              {product.colors.length > 7 && (
                <span className="text-[10px] text-neutral-400 font-mono pl-1">
                  +{product.colors.length - 7}
                </span>
              )}
            </div>
          </div>

          {/* Pricing Tiers Preview */}
          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-neutral-400">From </span>
              <span className="text-xl font-display font-extrabold text-white tabular-nums">
                ₹{lowestPrice}
              </span>
              <span className="text-xs text-neutral-400"> to ₹{singlePrice}/pc</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
              MOQ: 1 pc
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onCustomize(product, selectedColor)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shadow-sm active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customise in Studio</span>
          </button>

          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              aria-label="View Details"
              className="p-2.5 text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
