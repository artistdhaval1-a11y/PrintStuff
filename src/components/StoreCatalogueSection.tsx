import React, { useMemo, useState } from 'react';
import { ArrowUpDown, Plus, Search, ShoppingBag } from 'lucide-react';
import {
  CollectionKey,
  STORE_COLLECTIONS,
  StoreProduct,
} from '../data/shopifyCatalog';
import { BagItem } from '../types';
import { formatINR } from '../utils/format';
import { ProductImage } from './ProductImage';

interface StoreCatalogueSectionProps {
  products: StoreProduct[];
  activeCollection: CollectionKey;
  onChangeCollection: (col: CollectionKey) => void;
  onInspectProduct: (product: StoreProduct, list: StoreProduct[]) => void;
  onAddToBag: (item: BagItem) => void;
  onOpenCustomPage: () => void;
}

type SortKey = 'featured' | 'price-asc' | 'price-desc';

const ACCENT_CYCLE = ['#00A8E8', '#E6007E', '#FFCA05'];

export const StoreCatalogueSection: React.FC<StoreCatalogueSectionProps> = ({
  products,
  activeCollection,
  onChangeCollection,
  onInspectProduct,
  onAddToBag,
  onOpenCustomPage,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortKey>('featured');
  const [spotlightIdx, setSpotlightIdx] = useState<number>(0);

  // Curated dark filmstrip picks from diverse categories
  const spotlightItems = useMemo(() => {
    return products
      .filter(
        (p) =>
          p.collections.includes('jackets') ||
          p.collections.includes('hoodies') ||
          p.collections.includes('cargos')
      )
      .slice(0, 8);
  }, [products]);

  const activeSpotlight = spotlightItems[spotlightIdx] || spotlightItems[0];

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesCol =
        activeCollection === 'all' || p.collections.includes(activeCollection);
      if (!matchesCol) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.productType.toLowerCase().includes(q) ||
        p.collections.some((c) => c.toLowerCase().includes(q))
      );
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.minPrice - b.minPrice);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.minPrice - a.minPrice);
    }
    return list;
  }, [products, activeCollection, searchQuery, sortBy]);

  const handleQuickAddSize = (
    e: React.MouseEvent,
    product: StoreProduct,
    size: string
  ) => {
    e.stopPropagation();
    const matchedVariant = product.variants.find(
      (v) => v.option1.toLowerCase() === size.toLowerCase()
    );
    onAddToBag({
      id: `${product.id}-${size}-${Date.now()}`,
      productId: product.id,
      handle: product.handle,
      title: product.title,
      image: product.images[0],
      size,
      unitPrice: matchedVariant ? matchedVariant.price : product.minPrice,
      quantity: 1,
      variantId: matchedVariant?.id,
    });
  };

  return (
    <section id="catalogue" className="bg-[#F5F5F3]">
      {/* Dark Atmospheric Filmstrip Spotlight (Video Ref Frames 33-38) */}
      {activeSpotlight && (
        <div className="relative bg-[#111114] text-[#F5F5F3] py-14 sm:py-16 px-4 sm:px-8 overflow-hidden">
          <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFCA05]">
                Worth Your Attention
              </div>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                {activeSpotlight.title}
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2 max-w-md">
                {activeSpotlight.description}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="font-mono text-2xl font-bold text-[#00A8E8] tabular-nums">
                  {formatINR(activeSpotlight.minPrice)}
                </span>
                <span className="text-white/40" aria-hidden="true">·</span>
                <span className="text-xs text-white/75 uppercase tracking-wider">
                  {activeSpotlight.productType}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onInspectProduct(activeSpotlight, spotlightItems)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCA05] text-[#111114] hover:bg-[#FFD633] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop This Look</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                <span>SPOTLIGHT FILMSTRIP</span>
                <span className="tabular-nums">
                  {String(spotlightIdx + 1).padStart(2, '0')} /{' '}
                  {String(spotlightItems.length).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {spotlightItems.map((item, idx) => {
                  const active = idx === spotlightIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSpotlightIdx(idx)}
                      className={`group relative w-32 sm:w-36 aspect-[3/4] rounded-xl overflow-hidden shrink-0 transition-all cursor-pointer border-2 ${
                        active
                          ? 'border-[#00A8E8] scale-[1.03] shadow-xl'
                          : 'border-white/10 opacity-65 hover:opacity-100'
                      }`}
                    >
                      <ProductImage
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-left">
                        <div className="text-[11px] font-semibold text-white line-clamp-1">
                          {item.title}
                        </div>
                        <div className="text-[10px] font-mono text-[#FFCA05] tabular-nums">
                          {formatINR(item.minPrice)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Store Catalogue Grid (All 76 Products) */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-14 sm:py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#00A8E8] mb-1.5">
              Complete Store Catalogue
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111114] tracking-tight">
              New Drops &amp; All {products.length} Pieces
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:flex-initial min-w-[230px]">
              <Search className="w-4 h-4 text-[#6E6E73] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hoodies, F1 jackets, cargos..."
                aria-label="Search store catalogue"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-black/15 rounded-full text-[#111114] placeholder:text-[#71717A] focus:outline-none focus:border-[#111114]"
              />
            </div>

            <div className="relative inline-flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#52525B] absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                aria-label="Sort products"
                className="pl-8 pr-4 py-2 text-xs font-medium bg-white border border-black/15 rounded-full text-[#111114] focus:outline-none focus:border-[#111114] cursor-pointer"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Colorful Collection Filter Pills */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2">
          {STORE_COLLECTIONS.map((col, idx) => {
            const active = activeCollection === col.key;
            const accent = ACCENT_CYCLE[idx % ACCENT_CYCLE.length];
            return (
              <button
                key={col.key}
                type="button"
                onClick={() => onChangeCollection(col.key)}
                style={active ? { borderColor: accent } : undefined}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                  active
                    ? 'bg-[#111114] text-white shadow-sm'
                    : 'bg-white text-[#52525B] border-black/10 hover:border-black/30 hover:text-[#111114]'
                }`}
              >
                <span>{col.label}</span>
                <span
                  style={{ color: active ? accent : '#71717A' }}
                  className="ml-1.5 font-mono tabular-nums"
                >
                  {col.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Grid with Secondary Photo Flip & Quick-Size Add */}
        {filteredProducts.length === 0 ? (
          <div className="mt-10 py-16 text-center bg-white rounded-2xl border border-black/[0.08]">
            <p className="text-sm font-medium text-[#111114]">
              No pieces matched &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onChangeCollection('all');
              }}
              className="mt-3 px-5 py-2 rounded-full bg-[#111114] text-white text-xs font-semibold cursor-pointer"
            >
              Show All Pieces
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const priceLabel =
                product.minPrice === product.maxPrice
                  ? formatINR(product.minPrice)
                  : `From ${formatINR(product.minPrice)}`;
              const sizes =
                product.options.find((o) => o.name.toLowerCase() === 'size')?.values || [];
              const hasSecondImg = product.images.length > 1;

              return (
                <div
                  key={product.id}
                  onClick={() => {
                    if (product.isCustomTee) {
                      onInspectProduct(product, filteredProducts);
                    } else {
                      onInspectProduct(product, filteredProducts);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onInspectProduct(product, filteredProducts);
                    }
                  }}
                  className="group bg-white rounded-2xl border border-black/[0.08] overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_-14px_rgba(17,17,20,0.18)] transition-all duration-200 flex flex-col cursor-pointer"
                >
                  {/* 3:4 Photo Container with Hover Secondary Angle Reveal */}
                  <div className="relative w-full aspect-[3/4] bg-[#ECECE8] overflow-hidden">
                    <ProductImage
                      src={product.images[0]}
                      alt={product.title}
                      loading="lazy"
                      className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                        hasSecondImg ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform'
                      }`}
                    />
                    {hasSecondImg && (
                      <ProductImage
                        src={product.images[1]}
                        alt={`${product.title} alternate view`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      />
                    )}

                    {/* Quick-Add Size Overlay on Desktop Hover */}
                    {!product.isCustomTee && sizes.length > 0 && (
                      <div className="hidden md:flex absolute inset-x-3 bottom-3 p-2 rounded-xl bg-white/95 backdrop-blur-md border border-black/10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 items-center justify-between gap-1.5 shadow-lg">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#52525B] pl-1 shrink-0">
                          Quick Add
                        </span>
                        <div className="flex items-center gap-1 flex-wrap justify-end">
                          {sizes.slice(0, 4).map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={(e) => handleQuickAddSize(e, product, sz)}
                              className="px-2 py-1 rounded bg-[#F5F5F3] hover:bg-[#111114] hover:text-white text-[10px] font-bold uppercase text-[#111114] transition-colors cursor-pointer"
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.isCustomTee && (
                      <div className="hidden md:flex absolute inset-x-3 bottom-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenCustomPage();
                          }}
                          className="w-full py-2 rounded-xl bg-[#00A8E8] text-[#111114] font-bold text-[11px] uppercase tracking-wider shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          Customize Artwork &amp; Print
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Clean Metadata */}
                  <div className="p-4 flex-1 flex flex-col justify-between gap-2.5">
                    <div>
                      <div className="text-[11px] font-medium uppercase tracking-wider text-[#6E6E73] flex items-center gap-1.5">
                        <span>{product.productType}</span>
                        {sizes.length > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{sizes.length} Sizes</span>
                          </>
                        )}
                      </div>

                      <h3 className="mt-1 text-[15px] font-semibold text-[#111114] leading-snug line-clamp-2">
                        {product.title}
                      </h3>
                    </div>

                    <div className="pt-1 flex items-center justify-between border-t border-black/[0.06]">
                      <span className="text-[15px] font-bold text-[#111114] tabular-nums">
                        {priceLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E6007E]">
                        <Plus className="w-3.5 h-3.5" />
                        <span>View</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
