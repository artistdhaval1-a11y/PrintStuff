import React, { useState, useRef, useEffect } from 'react';
import {
  Product,
  ProductColor,
  PlacedArtwork,
  SizeBreakdown,
  CartItem
} from '../types';
import { PRODUCTS, getPriceForQuantity, WHATSAPP_RAW_NUMBER, WHATSAPP_PHONE_NUMBER } from '../data/products';
import { SAMPLE_LOGOS } from '../data/sampleLogos';
import { useBrand } from '../context/BrandContext';
import { RecoloredApparelImage } from './RecoloredApparelImage';
import {
  Upload,
  Sparkles,
  Trash2,
  RotateCw,
  Move,
  Maximize2,
  Lock,
  Unlock,
  Eye,
  Check,
  ShoppingBag,
  MessageCircle,
  AlertCircle,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';

interface CustomizerStudioProps {
  initialProduct?: Product;
  initialColor?: ProductColor;
  onAddToCart: (item: CartItem) => void;
  onDirectWhatsApp: (item: CartItem) => void;
}

export const CustomizerStudio: React.FC<CustomizerStudioProps> = ({
  initialProduct,
  initialColor,
  onAddToCart,
  onDirectWhatsApp
}) => {
  const { tagLogoUrl, wordmarkUrl, wordmarkDarkUrl } = useBrand();

  const [selectedProduct, setSelectedProduct] = useState<Product>(
    initialProduct || PRODUCTS[0]
  );
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    initialColor || (initialProduct || PRODUCTS[0]).colors[0]
  );
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [showPrintZoneGuide, setShowPrintZoneGuide] = useState<boolean>(true);

  // Artworks collection
  const [artworks, setArtworks] = useState<PlacedArtwork[]>([
    {
      id: 'default-printstuff-crest',
      name: 'PrintStuff Tag Logo',
      dataUrl: SAMPLE_LOGOS[0].dataUrl,
      view: 'front',
      x: 50, // center in print zone
      y: 40,
      width: 32,
      rotation: 0,
      lockAspectRatio: true,
      aspectRatio: 1,
      placementPreset: 'Center Chest'
    }
  ]);

  const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(
    'default-printstuff-crest'
  );

  // Size breakdown quantities (Enforce minimum 1)
  const [sizeQuantities, setSizeQuantities] = useState<SizeBreakdown>({
    S: 0,
    M: 2,
    L: 3,
    XL: 0,
    XXL: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const printZoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update selected color when product or initialColor changes
  useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
      setSelectedColor(initialColor || initialProduct.colors[0]);
      setCurrentView('front');
    }
  }, [initialProduct, initialColor]);

  // Adjust size breakdown keys when switching to cap (Free Size) or standard sizes
  useEffect(() => {
    if (selectedProduct.sizes.length === 1 && selectedProduct.sizes[0].includes('Free Size')) {
      setSizeQuantities({ 'Free Size': 5 });
    } else {
      setSizeQuantities({
        S: 0,
        M: 2,
        L: 3,
        XL: 0,
        XXL: 0
      });
    }
  }, [selectedProduct.id]);

  // Compute total quantity (Must be >= 1)
  const totalQuantity = Math.max(
    1,
    Object.values(sizeQuantities).reduce((sum, qty) => sum + (Number(qty) || 0), 0)
  );

  // Calculate pricing based on brochure pricing bands
  const { unitPrice, tierLabel } = getPriceForQuantity(selectedProduct, totalQuantity);
  const totalPrice = unitPrice * totalQuantity;

  // Selected artwork object
  const activeArtwork = artworks.find((a) => a.id === selectedArtworkId) || artworks[0] || null;

  // Filter artworks visible on current view
  const visibleArtworks = artworks.filter((a) => a.view === currentView);

  // Get active print zone for current view
  const activePrintZone =
    currentView === 'back' && selectedProduct.printZones.back
      ? selectedProduct.printZones.back
      : selectedProduct.printZones.front;

  const currentGarmentImage =
    currentView === 'back' && selectedProduct.images.back
      ? selectedProduct.images.back
      : selectedProduct.images.front;

  // Handle file uploads (PNG, JPG, WEBP, SVG)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!file.type.match(/^image\/(png|jpeg|jpg|webp|svg\+xml)$/)) {
        alert(`Unsupported file format: ${file.name}. Please upload PNG, JPG, WEBP, or SVG.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const aspect = img.width / img.height;
          const newArtwork: PlacedArtwork = {
            id: `artwork-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            file,
            name: file.name,
            dataUrl,
            view: currentView,
            x: 50,
            y: 45,
            width: 45,
            rotation: 0,
            lockAspectRatio: true,
            aspectRatio: aspect,
            placementPreset: 'Center Chest'
          };

          setArtworks((prev) => [...prev, newArtwork]);
          setSelectedArtworkId(newArtwork.id);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add sample logo
  const handleAddSampleLogo = (logo: typeof SAMPLE_LOGOS[0]) => {
    const isWide = logo.aspectRatio > 1.5;
    const newArtwork: PlacedArtwork = {
      id: `sample-${Date.now()}`,
      name: logo.name,
      dataUrl: logo.dataUrl,
      view: currentView,
      x: 50,
      y: isWide ? 38 : 42,
      width: logo.defaultWidth,
      rotation: 0,
      lockAspectRatio: true,
      aspectRatio: logo.aspectRatio || 1,
      placementPreset: 'Center Chest'
    };
    setArtworks((prev) => [...prev, newArtwork]);
    setSelectedArtworkId(newArtwork.id);
  };

  // Remove individual artwork
  const handleRemoveArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
    if (selectedArtworkId === id) {
      const remaining = artworks.filter((a) => a.id !== id);
      setSelectedArtworkId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Update specific artwork property
  const updateActiveArtwork = (updates: Partial<PlacedArtwork>) => {
    if (!activeArtwork) return;
    setArtworks((prev) =>
      prev.map((art) => (art.id === activeArtwork.id ? { ...art, ...updates } : art))
    );
  };

  // Apply placement preset
  const applyPresetPlacement = (presetName: string) => {
    if (!activeArtwork) return;

    if (presetName === 'Left Chest (Pocket)') {
      updateActiveArtwork({
        x: 25,
        y: 28,
        width: 26,
        rotation: 0,
        placementPreset: presetName
      });
    } else if (presetName === 'Center Chest') {
      updateActiveArtwork({
        x: 50,
        y: 40,
        width: 46,
        rotation: 0,
        placementPreset: presetName
      });
    } else if (presetName === 'Full Front Graphic') {
      updateActiveArtwork({
        x: 50,
        y: 48,
        width: 72,
        rotation: 0,
        placementPreset: presetName
      });
    } else if (presetName === 'Upper Back (Nape)') {
      updateActiveArtwork({
        x: 50,
        y: 24,
        width: 38,
        rotation: 0,
        placementPreset: presetName
      });
    } else if (presetName === 'Center Back Hero') {
      updateActiveArtwork({
        x: 50,
        y: 46,
        width: 68,
        rotation: 0,
        placementPreset: presetName
      });
    } else if (presetName === 'Cap Crown Center') {
      updateActiveArtwork({
        x: 50,
        y: 50,
        width: 52,
        rotation: 0,
        placementPreset: presetName
      });
    }
  };

  // Dragging support on canvas
  const handleMouseDownArtwork = (art: PlacedArtwork, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedArtworkId(art.id);
    setIsDragging(true);

    if (printZoneRef.current) {
      const rect = printZoneRef.current.getBoundingClientRect();
      const mouseXPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseYPercent = ((e.clientY - rect.top) / rect.height) * 100;
      setDragOffset({
        x: mouseXPercent - art.x,
        y: mouseYPercent - art.y
      });
    }
  };

  const handleMouseMoveCanvas = (e: React.MouseEvent) => {
    if (!isDragging || !activeArtwork || !printZoneRef.current) return;
    const rect = printZoneRef.current.getBoundingClientRect();
    const mouseXPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseYPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const newX = Math.min(95, Math.max(5, mouseXPercent - dragOffset.x));
    const newY = Math.min(95, Math.max(5, mouseYPercent - dragOffset.y));

    updateActiveArtwork({
      x: Math.round(newX),
      y: Math.round(newY)
    });
  };

  // Touch support for phones/tablets: drag artwork directly inside the printable area.
  const handleTouchStartArtwork = (art: PlacedArtwork, e: React.TouchEvent<HTMLDivElement>) => {
    if (!printZoneRef.current || !e.touches.length) return;
    e.stopPropagation();
    e.preventDefault();
    setSelectedArtworkId(art.id);
    setIsDragging(true);
    const rect = printZoneRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setDragOffset({
      x: ((touch.clientX - rect.left) / rect.width) * 100 - art.x,
      y: ((touch.clientY - rect.top) / rect.height) * 100 - art.y
    });
  };

  const handleTouchMoveCanvas = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !activeArtwork || !printZoneRef.current || !e.touches.length) return;
    e.preventDefault();
    const rect = printZoneRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    updateActiveArtwork({
      x: Math.round(Math.min(95, Math.max(5, x - dragOffset.x))),
      y: Math.round(Math.min(95, Math.max(5, y - dragOffset.y)))
    });
  };

  const handleMouseUpCanvas = () => {
    setIsDragging(false);
  };

  // Quantity helpers
  const handleQuantityChange = (size: string, delta: number) => {
    setSizeQuantities((prev) => {
      const current = prev[size] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [size]: updated };
    });
  };

  const handleDirectQuantitySet = (size: string, val: number) => {
    setSizeQuantities((prev) => ({
      ...prev,
      [size]: Math.max(0, isNaN(val) ? 0 : val)
    }));
  };

  // Prepare Cart Item
  const buildCurrentCartItem = (): CartItem => {
    return {
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      selectedColor,
      sizeBreakdown: { ...sizeQuantities },
      totalQuantity,
      unitPrice,
      totalPrice,
      appliedTierLabel: tierLabel,
      artworks: [...artworks],
      createdAt: Date.now()
    };
  };

  return (
    <section id="studio" className="py-12 bg-[#FFF9ED] border-b-2 border-[#202020]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#087FA0] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Customisation Studio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#202020] tracking-tight">
            Design & Customise Your Apparel
          </h2>
          <p className="text-sm text-[#5E5850] mt-1 max-w-2xl">
            Upload custom graphics, adjust precision placement, select fabric colours, and get instant bulk pricing. 
            All original photography is rendered naturally with real fabric textures and shadows.
          </p>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Garment Stage Mockup Viewport */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Viewport Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-[#202020]/15 rounded-xl">
              {/* Product Selector Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#5E5850]">Garment:</span>
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const prod = PRODUCTS.find((p) => p.id === e.target.value);
                    if (prod) {
                      setSelectedProduct(prod);
                      setSelectedColor(prod.colors[0]);
                      setCurrentView('front');
                    }
                  }}
                  className="bg-white border border-[#202020]/20 text-[#202020] text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#08B9E8]"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.gsm} GSM)
                    </option>
                  ))}
                </select>
              </div>

              {/* Front / Back View Switcher */}
              <div className="flex items-center gap-2">
                {selectedProduct.images.back ? (
                  <div className="flex items-center p-1 bg-white rounded-lg border border-[#202020]/15">
                    <button
                      onClick={() => setCurrentView('front')}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        currentView === 'front'
                          ? 'bg-[#D7FF00] text-[#202020] shadow-sm'
                          : 'text-[#5E5850] hover:text-[#202020]'
                      }`}
                    >
                      Front View
                    </button>
                    <button
                      onClick={() => setCurrentView('back')}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        currentView === 'back'
                          ? 'bg-[#D7FF00] text-[#202020] shadow-sm'
                          : 'text-[#5E5850] hover:text-[#202020]'
                      }`}
                    >
                      Back View
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-[#5E5850] font-mono px-2 py-1 bg-white rounded border border-[#202020]/15">
                    Front Crown View
                  </span>
                )}

                {/* Print Zone Guides Toggle */}
                <button
                  onClick={() => setShowPrintZoneGuide(!showPrintZoneGuide)}
                  title="Toggle printable boundary guide"
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors flex items-center gap-1.5 ${
                    showPrintZoneGuide
                      ? 'bg-[#FFF0D8] border-[#202020]/20 text-[#087FA0]'
                      : 'bg-white border-[#202020]/15 text-[#5E5850] hover:text-[#202020]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Print Area</span>
                </button>
              </div>
            </div>

            {/* STAGE CANVAS: Real Untouched Commercial Photograph */}
            <div
              className="relative w-full aspect-[3/4] bg-white rounded-2xl border border-[#202020]/15 overflow-hidden select-none flex items-center justify-center shadow-2xl"
              onMouseMove={handleMouseMoveCanvas}
              onMouseUp={handleMouseUpCanvas}
              onMouseLeave={handleMouseUpCanvas}
              onTouchMove={handleTouchMoveCanvas}
              onTouchEnd={handleMouseUpCanvas}
              onTouchCancel={handleMouseUpCanvas}
            >
              {/* Natural Photograph with precision garment recoloring preserving fabric texture and folds */}
              <RecoloredApparelImage
                src={currentGarmentImage}
                productId={selectedProduct.id}
                view={currentView}
                color={selectedColor}
                alt={`${selectedProduct.name} - ${currentView}`}
                className="w-full h-full object-contain p-2 pointer-events-none"
              />

              {/* Printable Zone Boundary Overlay */}
              <div
                ref={printZoneRef}
                className="absolute transition-all"
                style={{
                  top: `${activePrintZone.top}%`,
                  left: `${activePrintZone.left}%`,
                  width: `${activePrintZone.width}%`,
                  height: `${activePrintZone.height}%`,
                  pointerEvents: isDragging ? 'auto' : 'none'
                }}
              >
                {/* Visual Guidelines (Dashed hairline) */}
                {showPrintZoneGuide && (
                  <div className="absolute inset-0 border-2 border-dashed border-[#08B9E8]/40 rounded-lg pointer-events-none">
                    <span className="absolute top-1 left-1.5 text-[9px] font-mono text-[#087FA0]/70 tracking-widest uppercase bg-white/80 px-1 py-0.5 rounded">
                      Printable Zone ({currentView})
                    </span>
                  </div>
                )}

                {/* Visible Artworks Rendered Inside Print Zone */}
                {visibleArtworks.map((art) => {
                  const isSelected = selectedArtworkId === art.id;
                  return (
                    <div
                      key={art.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArtworkId(art.id);
                      }}
                      onMouseDown={(e) => handleMouseDownArtwork(art, e)}
                      onTouchStart={(e) => handleTouchStartArtwork(art, e)}
                      className={`absolute cursor-move transition-shadow ${
                        isSelected
                          ? 'ring-2 ring-[#08B9E8] ring-offset-1 ring-offset-white'
                          : 'hover:ring-1 hover:ring-white/50'
                      }`}
                      style={{
                        top: `${art.y}%`,
                        left: `${art.x}%`,
                        width: `${art.width}%`,
                        transform: `translate(-50%, -50%) rotate(${art.rotation}deg)`,
                        pointerEvents: 'auto',
                        touchAction: 'none'
                      }}
                    >
                      <img
                        src={art.dataUrl}
                        alt={art.name}
                        className="w-full h-auto object-contain pointer-events-none drop-shadow-md"
                        referrerPolicy="no-referrer"
                      />

                      {/* Selection Handles if active */}
                      {isSelected && (
                        <div className="absolute -top-3 -right-3 w-5 h-5 bg-emerald-400 text-neutral-950 rounded-full flex items-center justify-center shadow text-[10px] pointer-events-none font-bold">
                          &bull;
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Natural Color Preservation Label */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-[#202020]/15 flex items-center gap-3 text-xs shadow-lg">
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border border-white/20 shadow-inner shrink-0"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-[#5E5850]">Order Colour</div>
                    <div className="font-semibold text-[#202020] leading-tight">{selectedColor.name}</div>
                  </div>
                </div>

                <div className="border-l border-[#202020]/15 pl-3">
                  <span className="text-[10px] text-[#5E5850] font-mono">
                    {selectedColor.isOriginalPhotoColor
                      ? 'Original Studio Black'
                      : 'Dyed to standard fabric spec'}
                  </span>
                </div>
              </div>

              {/* Active Artworks Counter Pill */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#202020]/15 text-[11px] font-mono text-[#5E5850]">
                {artworks.length} {artworks.length === 1 ? 'Design' : 'Designs'} Uploaded
              </div>
            </div>

            {/* Colour Swatch Palette Picker (Zero-tint natural representation) */}
            <div className="p-4 bg-white border border-[#202020]/15 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#202020]">Select Fabric Colour:</span>
                <span className="font-mono text-[#5E5850] text-[11px]">
                  {selectedColor.name}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {selectedProduct.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'bg-[#FFF0D8] border-[#08B9E8] text-[#202020] shadow'
                          : 'bg-white border-[#202020]/15 text-[#5E5850] hover:text-[#202020]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#087FA0] ml-1" />}
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-[#5E5850] leading-relaxed pt-1">
                Note: Photorealistic preview rendered dynamically with genuine fabric texture, weave, and lighting depth. Your apparel will be precision dyed and printed in <strong className="text-[#202020]">{selectedColor.name}</strong>.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Artwork Controls, Sizing Matrix, and Pricing */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* 1. ARTWORK MANAGEMENT MODULE */}
            <div className="p-5 bg-white border border-[#202020]/15 rounded-2xl space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-[#202020] text-base">
                    Custom Artwork & Logos
                  </h3>
                  <p className="text-xs text-[#5E5850] mt-0.5">
                    Upload your high-res files or test with sample emblems
                  </p>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#202020] bg-[#D7FF00] hover:bg-[#e5ff59] rounded-lg transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Official Brand Logos Picker */}
              <div className="p-3 bg-white/70 border border-[#202020]/15/80 rounded-xl space-y-2">
                <div className="text-[11px] font-mono text-[#5E5850] uppercase tracking-wider flex items-center justify-between">
                  <span>Official Brand Assets (Tag Logo & Wordmark):</span>
                  <span className="text-[#087FA0] text-[10px]">Click to apply to garment</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {[
                    {
                      id: 'official-tag-logo',
                      name: 'PrintStuff Tag Logo',
                      category: 'Official Logo' as const,
                      defaultWidth: 32,
                      aspectRatio: 737 / 783,
                      dataUrl: tagLogoUrl
                    },
                    {
                      id: 'official-wordmark-white',
                      name: 'PrintStuff Wordmark (White)',
                      category: 'Brand Name' as const,
                      defaultWidth: 48,
                      aspectRatio: 1136 / 486,
                      dataUrl: wordmarkUrl
                    },
                    {
                      id: 'official-wordmark-dark',
                      name: 'PrintStuff Wordmark (Dark)',
                      category: 'Brand Name' as const,
                      defaultWidth: 48,
                      aspectRatio: 1136 / 486,
                      dataUrl: wordmarkDarkUrl
                    }
                  ].map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleAddSampleLogo(sample)}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#202020]/15 hover:border-emerald-500/60 text-left transition-colors group"
                    >
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 shrink-0 border border-[#202020]/15">
                        <img src={sample.dataUrl} alt={sample.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] block font-mono text-[#087FA0] uppercase font-semibold leading-none mb-1">
                          {sample.category}
                        </span>
                        <span className="text-[11px] font-semibold text-[#4A4640] truncate block group-hover:text-[#202020]">
                          {sample.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Uploaded Artworks List */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#5E5850] flex items-center justify-between">
                  <span>Current Placed Artworks ({artworks.length}):</span>
                  {activeArtwork && (
                    <span className="text-[11px] text-[#087FA0] font-mono">
                      Editing: {activeArtwork.name}
                    </span>
                  )}
                </div>

                {artworks.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-[#202020]/15 rounded-xl">
                    <p className="text-xs text-[#5E5850]">
                      No artwork uploaded yet. Click "Upload File" or select a preset emblem.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {artworks.map((art) => {
                      const isSelected = selectedArtworkId === art.id;
                      return (
                        <div
                          key={art.id}
                          onClick={() => {
                            setSelectedArtworkId(art.id);
                            if (art.view !== currentView) {
                              setCurrentView(art.view);
                            }
                          }}
                          className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#FFF0D8] border-[#08B9E8] text-[#202020] shadow-sm'
                              : 'bg-white border-[#202020]/15 text-[#5E5850] hover:text-[#202020]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 bg-white rounded-md p-1 border border-[#202020]/20 shrink-0 flex items-center justify-center">
                              <img src={art.dataUrl} alt={art.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="truncate">
                              <div className="font-semibold text-[#202020] truncate text-[11px]">{art.name}</div>
                              <div className="text-[10px] text-[#5E5850] font-mono">
                                {art.view.toUpperCase()} VIEW &bull; {art.placementPreset || `${art.width}% width`}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {/* View toggle badge */}
                            {selectedProduct.images.back && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newView = art.view === 'front' ? 'back' : 'front';
                                  setArtworks((prev) =>
                                    prev.map((a) => (a.id === art.id ? { ...a, view: newView } : a))
                                  );
                                  setCurrentView(newView);
                                }}
                                title="Move to Front/Back view"
                                className="px-2 py-0.5 text-[10px] font-mono bg-white text-[#5E5850] rounded hover:bg-[#FFF0D8]"
                              >
                                {art.view === 'front' ? 'To Back' : 'To Front'}
                              </button>
                            )}

                            {/* Remove button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveArtwork(art.id);
                              }}
                              title="Delete this artwork"
                              className="p-1 text-[#5E5850] hover:text-[#F01875] transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* INDEPENDENT CONTROLS FOR ACTIVE ARTWORK */}
              {activeArtwork && (
                <div className="p-4 bg-white border border-[#202020]/15 rounded-xl space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#202020]/15">
                    <span className="text-xs font-bold text-[#202020] uppercase tracking-wider font-mono">
                      Controls for: {activeArtwork.name}
                    </span>
                    <button
                      onClick={() => handleRemoveArtwork(activeArtwork.id)}
                      className="text-xs text-[#F01875] hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Placement Presets */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-medium text-[#5E5850]">Quick Placement Presets:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.id === 'custom-cap' ? (
                        <>
                          <button
                            onClick={() => applyPresetPlacement('Cap Crown Center')}
                            className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-[#FFF0D8] text-[#5E5850] rounded-md border border-[#202020]/15"
                          >
                            Crown Center
                          </button>
                        </>
                      ) : currentView === 'front' ? (
                        <>
                          <button
                            onClick={() => applyPresetPlacement('Left Chest (Pocket)')}
                            className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-[#FFF0D8] text-[#5E5850] rounded-md border border-[#202020]/15"
                          >
                            Left Chest
                          </button>
                          <button
                            onClick={() => applyPresetPlacement('Center Chest')}
                            className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-[#FFF0D8] text-[#5E5850] rounded-md border border-[#202020]/15"
                          >
                            Center Chest
                          </button>
                          <button
                            onClick={() => applyPresetPlacement('Full Front Graphic')}
                            className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-[#FFF0D8] text-[#5E5850] rounded-md border border-[#202020]/15"
                          >
                            Full Front
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => applyPresetPlacement('Upper Back (Nape)')}
                            className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-[#FFF0D8] text-[#5E5850] rounded-md border border-[#202020]/15"
                          >
                            Upper Back
                          </button>
                          <button
                            onClick={() => applyPresetPlacement('Center Back Hero')}
                            className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-[#FFF0D8] text-[#5E5850] rounded-md border border-[#202020]/15"
                          >
                            Center Back
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Size / Width Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#5E5850]">Artwork Size / Width:</span>
                      <span className="font-mono text-[#087FA0] font-semibold">{activeArtwork.width}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={95}
                      value={activeArtwork.width}
                      onChange={(e) => updateActiveArtwork({ width: Number(e.target.value) })}
                      className="w-full accent-[#F01875] cursor-pointer"
                    />
                  </div>

                  {/* Fine Position X and Y Sliders */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-[#5E5850]">
                        <span>Horizontal (X):</span>
                        <span className="font-mono text-[#4A4640]">{activeArtwork.x}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={95}
                        value={activeArtwork.x}
                        onChange={(e) => updateActiveArtwork({ x: Number(e.target.value) })}
                        className="w-full accent-[#F01875] cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-[#5E5850]">
                        <span>Vertical (Y):</span>
                        <span className="font-mono text-[#4A4640]">{activeArtwork.y}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={95}
                        value={activeArtwork.y}
                        onChange={(e) => updateActiveArtwork({ y: Number(e.target.value) })}
                        className="w-full accent-[#F01875] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Rotation Slider & Aspect Ratio Lock */}
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-[#5E5850]">
                        <span>Rotation:</span>
                        <span className="font-mono text-[#4A4640]">{activeArtwork.rotation}&deg;</span>
                      </div>
                      <input
                        type="range"
                        min={-180}
                        max={180}
                        value={activeArtwork.rotation}
                        onChange={(e) => updateActiveArtwork({ rotation: Number(e.target.value) })}
                        className="w-full accent-[#F01875] cursor-pointer"
                      />
                    </div>

                    <button
                      onClick={() =>
                        updateActiveArtwork({ lockAspectRatio: !activeArtwork.lockAspectRatio })
                      }
                      title={activeArtwork.lockAspectRatio ? 'Lock Aspect Ratio' : 'Unlocked'}
                      className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 self-end ${
                        activeArtwork.lockAspectRatio
                          ? 'bg-white border-[#202020]/20 text-[#4A4640]'
                          : 'bg-white border-[#202020]/15 text-[#6F675D]'
                      }`}
                    >
                      {activeArtwork.lockAspectRatio ? (
                        <>
                          <Lock className="w-3.5 h-3.5 text-[#087FA0]" />
                          <span className="text-[10px]">Locked</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Free</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. QUANTITY & SIZE MATRIX MODULE */}
            <div className="rounded-2xl border border-[#202020]/15 bg-white p-4 sm:p-5 space-y-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-[#202020] text-base sm:text-lg">
                    Order Quantities &amp; Sizing
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#5E5850]">
                    Minimum order: 1 piece <span aria-hidden="true">•</span> Volume discounts apply automatically
                  </p>
                </div>
                <div className="shrink-0 rounded-xl bg-[#EAFBFF] px-3 py-2 text-right">
                  <div className="text-[10px] sm:text-xs font-mono text-[#5E5850]">Total quantity</div>
                  <div className="text-xl sm:text-2xl font-display font-extrabold text-[#087FA0] tabular-nums leading-tight">
                    {totalQuantity} <span className="text-sm font-bold">pcs</span>
                  </div>
                </div>
              </div>

              {/* Responsive size controls: large, easy-to-tap quantity controls */}
              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {Object.keys(sizeQuantities).map((size) => (
                  <div
                    key={size}
                    className="min-w-0 rounded-xl border border-[#202020]/15 bg-[#FFFEFB] p-3 flex flex-col items-center gap-2.5"
                  >
                    <span className="text-sm font-extrabold tracking-wide text-[#202020] font-mono">{size}</span>
                    <div className="grid w-full grid-cols-[44px_minmax(40px,1fr)_44px] items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Decrease ${size} quantity`}
                        onClick={() => handleQuantityChange(size, -1)}
                        disabled={(sizeQuantities[size] || 0) <= 0}
                        className="h-11 w-11 justify-self-center rounded-xl border border-[#202020]/15 bg-[#FFF0D8] text-[#202020] flex items-center justify-center transition-colors hover:bg-[#FFE2B5] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <input
                        aria-label={`${size} quantity`}
                        type="number"
                        inputMode="numeric"
                        min="0"
                        value={sizeQuantities[size]}
                        onChange={(e) => handleDirectQuantitySet(size, parseInt(e.target.value, 10) || 0)}
                        className="block w-full min-w-0 appearance-none bg-transparent text-center text-xl font-extrabold leading-10 text-[#202020] font-mono focus:outline-none focus:ring-2 focus:ring-[#08B9E8] rounded tabular-nums p-0"
                      />
                      <button
                        type="button"
                        aria-label={`Increase ${size} quantity`}
                        onClick={() => handleQuantityChange(size, 1)}
                        className="h-11 w-11 justify-self-center rounded-xl border border-[#202020]/15 bg-[#FFF0D8] text-[#202020] flex items-center justify-center transition-colors hover:bg-[#FFE2B5] active:scale-95"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price summary and actions adapt to mobile widths */}
              <div className="border-t border-[#202020]/15 pt-4 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-4 sm:items-center">
                <div className="min-w-0">
                  <div className="text-xs text-[#5E5850]">Calculated subtotal</div>
                  <div className="mt-0.5 text-2xl sm:text-3xl font-display font-extrabold text-[#202020] tabular-nums">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="mt-1 text-[11px] leading-relaxed text-[#5E5850] font-mono">
                    ({totalQuantity} pcs × ₹{unitPrice}/pc) <span aria-hidden="true">•</span> Shipping extra as per location
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const item = buildCurrentCartItem();
                      onAddToCart(item);
                    }}
                    className="min-h-12 inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-3 text-sm font-bold text-[#202020] bg-[#D7FF00] hover:bg-[#e5ff59] rounded-xl transition-all shadow-sm active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const item = buildCurrentCartItem();
                      onDirectWhatsApp(item);
                    }}
                    className="min-h-12 inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-3 text-sm font-bold text-[#202020] bg-[#FFF0D8] hover:bg-[#FFE2B5] border border-[#202020]/20 rounded-xl transition-colors active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0 text-[#087FA0]" />
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
