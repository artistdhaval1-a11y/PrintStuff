export interface PriceTier {
  label: string;
  maxQty: number; // e.g. 10, 20, 50, Infinity
  price: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  isOriginalPhotoColor?: boolean;
}

export interface PrintZone {
  top: number; // percentage 0-100
  left: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
}

export interface Product {
  id: string;
  name: string;
  category: string;
  gsm: number;
  fabric: string;
  blend: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: ProductColor[];
  priceTiers: PriceTier[];
  images: {
    front: string;
    back?: string;
  };
  colorImages?: Record<string, { front: string; back?: string }>;
  printZones: {
    front: PrintZone;
    back?: PrintZone;
  };
  defaultPlacement: 'front' | 'back';
}

export interface PlacedArtwork {
  id: string;
  file?: File;
  name: string;
  dataUrl: string;
  view: 'front' | 'back';
  x: number; // percentage inside print zone (0-100)
  y: number; // percentage inside print zone (0-100)
  width: number; // width in percentage of print zone width (10-100)
  height?: number; // optional custom height
  rotation: number; // degrees -180 to 180
  lockAspectRatio: boolean;
  aspectRatio: number; // width / height
  placementPreset?: string;
  printSize?: 'Logo' | 'A4' | 'A3';
}

export interface SizeBreakdown {
  [size: string]: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  selectedColor: ProductColor;
  sizeBreakdown: SizeBreakdown;
  totalQuantity: number;
  unitPrice: number;
  totalPrice: number;
  appliedTierLabel: string;
  artworks: PlacedArtwork[];
  notes?: string;
  createdAt: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  city: string;
  address: string;
  pincode: string;
  email: string;
  notes: string;
}
