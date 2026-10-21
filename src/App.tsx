import React, { useState } from 'react';
import { Product, ProductColor, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { CustomizerStudio } from './components/CustomizerStudio';
import { PricingSpecsSection } from './components/PricingSpecsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { BrandProvider } from './context/BrandContext';
import { Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [singleCheckoutItem, setSingleCheckoutItem] = useState<CartItem | null>(null);
  const [customizerProduct, setCustomizerProduct] = useState<Product>(PRODUCTS[0]);
  const [customizerColor, setCustomizerColor] = useState<ProductColor>(PRODUCTS[0].colors[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Show transient toast notification
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Add customized item to cart
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    showToast(`Added ${item.totalQuantity} pcs of ${item.productName} to your bag!`);
    setIsCartOpen(true);
  };

  // Direct checkout enquiry from Customizer
  const handleDirectWhatsApp = (item: CartItem) => {
    setSingleCheckoutItem(item);
    setIsCheckoutModalOpen(true);
  };

  // Open checkout for entire bag
  const handleCheckoutFromCart = () => {
    setSingleCheckoutItem(null);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  // Update item quantity in bag
  const handleUpdateCartQuantity = (itemId: string, newTotalQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const qty = Math.max(1, newTotalQty);
          const product = PRODUCTS.find((p) => p.id === item.productId);
          if (product) {
            const lastTier = product.priceTiers[product.priceTiers.length - 1];
            let price = lastTier.price;
            let label = lastTier.label;
            for (const tier of product.priceTiers) {
              if (qty <= tier.maxQty) {
                price = tier.price;
                label = tier.label;
                break;
              }
            }
            return {
              ...item,
              totalQuantity: qty,
              unitPrice: price,
              totalPrice: price * qty,
              appliedTierLabel: label
            };
          }
        }
        return item;
      })
    );
  };

  // Remove item from bag
  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from your bag.');
  };

  // Launch customizer with selected product & color
  const handleSelectProductForStudio = (product: Product, color?: ProductColor) => {
    setCustomizerProduct(product);
    setCustomizerColor(color || product.colors[0]);
    const studioEl = document.getElementById('studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.totalQuantity, 0);

  return (
    <BrandProvider>
      <div className="min-h-screen bg-[#FFF9ED] text-[#202020] flex flex-col selection:bg-[#D7FF00] selection:text-[#202020]">
        {/* Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-emerald-500 text-neutral-950 rounded-xl font-bold text-xs shadow-2xl animate-fade-in">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{notification}</span>
          </div>
        )}

        {/* Top Navigation */}
        <Header
          cartCount={cartItems.length}
          onOpenCart={() => setIsCartOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          <Hero
            onStartCustomizing={() => handleNavigate('studio')}
            onBrowseCatalog={() => handleNavigate('catalog')}
          />

          <CatalogSection
            onCustomize={handleSelectProductForStudio}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          <CustomizerStudio
            initialProduct={customizerProduct}
            initialColor={customizerColor}
            onAddToCart={handleAddToCart}
            onDirectWhatsApp={handleDirectWhatsApp}
          />

          <PricingSpecsSection
            onSelectProductForStudio={(p) => handleSelectProductForStudio(p)}
          />
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckoutWhatsApp={handleCheckoutFromCart}
        />

        {/* WhatsApp Checkout Modal */}
        <WhatsAppCheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          items={cartItems}
          singleItem={singleCheckoutItem}
        />

        {/* Product Quick View Modal */}
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onCustomize={handleSelectProductForStudio}
        />
      </div>
    </BrandProvider>
  );
}
