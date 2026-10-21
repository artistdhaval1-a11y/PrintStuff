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
    { id: 'all', label: 'All Garments' },
    { id: 'T-Shirts', label: 'T-Shirts' },
    { id: 'Hoodies', label: 'Hoodies' },
    { id: 'Polos', label: 'Polos' },
    { id: 'Headwear', label: 'Caps' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="catalog" className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              Curated Apparel Collection
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Standard Apparel Catalog
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Authentic commercial photography. Each item is manufactured with heavy, durable fabrics and tested for long-lasting prints.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Single-line controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
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
