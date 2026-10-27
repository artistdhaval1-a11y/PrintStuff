import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  onCustomize: (product: Product, initialColor?: ProductColor) => void;
  onQuickView?: (product: Product) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ onCustomize, onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Both Styles' },
    { id: 'Men', label: 'Men' },
    { id: 'Women', label: 'Women' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="catalog" className="py-16 bg-[#FFF9ED] border-b-2 border-[#202020]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#F01875] mb-2">
              Choose Your Fit
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#202020] tracking-tight">
              Men's & Women's T-Shirts
            </h2>
            <p className="text-sm text-[#5E5850] mt-2 max-w-xl">
              Choose a men's or women's 180 GSM round-neck T-shirt, then select your colour, size and custom prints.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Single-line controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-white border-2 border-[#202020]/20 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#D7FF00] text-[#202020] shadow-sm'
                    : 'text-[#5E5850] hover:text-[#F01875]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCustomize={onCustomize}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
