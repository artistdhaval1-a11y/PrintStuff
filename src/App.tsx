import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { CollectionKey, SHOPIFY_PRODUCTS, StoreProduct } from './data/shopifyCatalog';
import { BagItem } from './types';
import { Header, StorePage } from './components/Header';
import { StoreHero } from './components/StoreHero';
import { ChangeLookShowcase } from './components/ChangeLookShowcase';
import { StoreCatalogueSection } from './components/StoreCatalogueSection';
import { TrendsAndFooter } from './components/TrendsAndFooter';
import { CustomTeeSection } from './components/CustomTeeSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BagDrawer } from './components/BagDrawer';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  const [activePage, setActivePage] = useState<StorePage>('store');
  const [activeCollection, setActiveCollection] = useState<CollectionKey>('all');
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [inspectedProduct, setInspectedProduct] = useState<StoreProduct | null>(null);
  const [inspectedList, setInspectedList] = useState<StoreProduct[]>(SHOPIFY_PRODUCTS);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleChangePage = (page: StorePage, sectionId?: string) => {
    setActivePage(page);
    if (page === 'custom') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.setTimeout(() => {
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 40);
  };

  const handleSelectCollectionFromHero = (col: CollectionKey) => {
    setActiveCollection(col);
    handleChangePage('store', 'catalogue');
  };

  const handleInspectProduct = (product: StoreProduct, list: StoreProduct[]) => {
    setInspectedProduct(product);
    setInspectedList(list);
  };

  const handleAddToBag = (item: BagItem) => {
    setBagItems((prev) => {
      const matchIdx = prev.findIndex(
        (existing) =>
          existing.productId === item.productId &&
          existing.size === item.size &&
          existing.color === item.color &&
          existing.printSummary === item.printSummary &&
          existing.customArtworkName === item.customArtworkName
      );
      if (matchIdx > -1) {
        const next = [...prev];
        next[matchIdx] = {
          ...next[matchIdx],
          quantity: next[matchIdx].quantity + item.quantity,
        };
        return next;
      }
      return [...prev, item];
    });
    showToast(`Added ${item.title} (Size ${item.size}) to your bag`);
    setIsBagOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      setBagItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setBagItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setBagItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckoutFromBag = () => {
    setIsBagOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderConfirmed = () => {
    setBagItems([]);
  };

  const bagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#171717] flex flex-col">
      {toastMsg && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#111114] text-[#F5F5F3] rounded-full text-xs font-semibold shadow-xl border border-white/10"
        >
          <Check className="w-4 h-4 text-[#FFCA05] shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <Header
        activePage={activePage}
        bagCount={bagCount}
        onChangePage={handleChangePage}
        onOpenBag={() => setIsBagOpen(true)}
      />

      {activePage === 'custom' ? (
        <main className="flex-1">
          <CustomTeeSection
            onAddToBag={handleAddToBag}
            onBackToStore={() => handleChangePage('store')}
          />
        </main>
      ) : (
        <main className="flex-1">
          <StoreHero
            products={SHOPIFY_PRODUCTS}
            onSelectCollection={handleSelectCollectionFromHero}
            onOpenCustomPage={() => handleChangePage('custom')}
            onBrowseAll={() => handleChangePage('store', 'catalogue')}
          />

          <ChangeLookShowcase
            products={SHOPIFY_PRODUCTS}
            onAddToBag={handleAddToBag}
            onInspectProduct={handleInspectProduct}
          />

          <StoreCatalogueSection
            products={SHOPIFY_PRODUCTS}
            activeCollection={activeCollection}
            onChangeCollection={setActiveCollection}
            onInspectProduct={handleInspectProduct}
            onAddToBag={handleAddToBag}
            onOpenCustomPage={() => handleChangePage('custom')}
          />

          <TrendsAndFooter
            products={SHOPIFY_PRODUCTS}
            onInspectProduct={handleInspectProduct}
            onOpenCustomPage={() => handleChangePage('custom')}
            onNavigateCatalogue={() => handleChangePage('store', 'catalogue')}
          />
        </main>
      )}

      <ProductDetailModal
        product={inspectedProduct}
        list={inspectedList}
        onClose={() => setInspectedProduct(null)}
        onChangeProduct={(p) => setInspectedProduct(p)}
        onAddToBag={handleAddToBag}
        onOpenCustomPage={() => handleChangePage('custom')}
      />

      <BagDrawer
        isOpen={isBagOpen}
        items={bagItems}
        onClose={() => setIsBagOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutFromBag}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={bagItems}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderConfirmed={handleOrderConfirmed}
      />
    </div>
  );
}
