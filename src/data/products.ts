import { Product } from '../types';

// High-definition Commercial Studio Apparel Photography
// Uploaded PrintStuff streetwear campaign image from the repository root
const heroPodiumImg = 'https://raw.githubusercontent.com/artistdhaval1-a11y/PrintStuff/ai-studio-version/PrintStuff%20Streetwear%20Crew.png';
import tshirtFrontImg from '../assets/images/tshirt_studio_front_1791839874158.jpg';
import tshirtBackImg from '../assets/images/tshirt_studio_back_1791839892785.jpg';
import zipperHoodieFrontImg from '../assets/images/zipper_hoodie_front_1791839913907.jpg';
import zipperHoodieBackImg from '../assets/images/zipper_hoodie_back_1791839937535.jpg';
import regularHoodieFrontImg from '../assets/images/regular_hoodie_front_1791839963728.jpg';
import regularHoodieBackImg from '../assets/images/regular_hoodie_back_1791839994706.jpg';
import poloFrontImg from '../assets/images/polo_studio_front_1791840027832.jpg';
import poloBackImg from '../assets/images/polo_studio_back_1791840064602.jpg';
import capFrontImg from '../assets/images/cap_studio_front_1791840101612.jpg';

export const HERO_PODIUM_IMAGE = heroPodiumImg;
export const WHATSAPP_PHONE_NUMBER = '+91-74056-52991';
export const WHATSAPP_RAW_NUMBER = '917405652991';

export const PRODUCTS: Product[] = [
  {
    id: 'crew-neck-tshirt',
    name: 'Crew Neck T-Shirt - 180GSM',
    category: 'T-Shirts',
    gsm: 180,
    fabric: '100% Cotton Fabric, Biowashed',
    blend: '100% Cotton',
    description: '180 GSM 100% cotton fabric, biowashed for soft, smooth, and premium hand feel. Regular fit design crafted for everyday comfort and long-lasting wear.',
    features: [
      'High-quality logo printing that stays sharp and vibrant even after multiple washes',
      '180 GSM 100% cotton fabric, biowashed for soft, smooth and premium hand feel',
      'Regular fit design crafted for everyday comfort and long-lasting wear'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Original Black', hex: '#111111', isOriginalPhotoColor: true },
      { name: 'Crisp White', hex: '#F9FAFB' },
      { name: 'Navy Blue', hex: '#1E293B' },
      { name: 'Charcoal Grey', hex: '#4B5563' },
      { name: 'Royal Blue', hex: '#2563EB' },
      { name: 'Classic Red', hex: '#DC2626' },
      { name: 'Bottle Green', hex: '#065F46' },
      { name: 'Teal', hex: '#0D9488' },
      { name: 'Maroon', hex: '#831843' },
      { name: 'Sun Yellow', hex: '#EAB308' }
    ],
    priceTiers: [
      { label: 'Upto 10', maxQty: 10, price: 450 },
      { label: 'Upto 20', maxQty: 20, price: 400 },
      { label: 'Upto 50', maxQty: 50, price: 380 },
      { label: '50+', maxQty: Infinity, price: 350 }
    ],
    images: {
      front: tshirtFrontImg,
      back: tshirtBackImg
    },
    printZones: {
      front: { top: 24, left: 28, width: 44, height: 42 },
      back: { top: 22, left: 28, width: 44, height: 44 }
    },
    defaultPlacement: 'front'
  },
  {
    id: 'zipper-hoodie',
    name: 'Zipper Hoodie - 320GSM',
    category: 'Hoodies',
    gsm: 320,
    fabric: 'Brushed Loopknit Heavyweight Fleece',
    blend: '88% Cotton & 12% Polyester Blend',
    description: 'Premium 320 GSM brushed loopknit fabric for a soft, heavy, and durable feel. 88% cotton & 12% polyester blend ensures comfort, breathability, and long-lasting fit with full front metallic zipper.',
    features: [
      'High-quality logo printing that stays sharp and vibrant even after multiple washes',
      'Premium 320 GSM brushed loopknit fabric for soft, heavy and durable feel',
      '88% cotton & 12% polyester blend ensures comfort, breathability and long-lasting fit',
      'Heavy-duty full front zip with double-stitched kangaroo split pockets'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Original Black', hex: '#111111', isOriginalPhotoColor: true },
      { name: 'Heather Grey', hex: '#6B7280' },
      { name: 'Deep Navy', hex: '#0F172A' },
      { name: 'Optic White', hex: '#F9FAFB' },
      { name: 'Classic Red', hex: '#DC2626' },
      { name: 'Royal Blue', hex: '#2563EB' }
    ],
    priceTiers: [
      { label: 'Upto 10', maxQty: 10, price: 600 },
      { label: 'Upto 20', maxQty: 20, price: 550 },
      { label: 'Upto 50', maxQty: 50, price: 525 },
      { label: '50+', maxQty: Infinity, price: 500 }
    ],
    images: {
      front: zipperHoodieFrontImg,
      back: zipperHoodieBackImg
    },
    printZones: {
      front: { top: 32, left: 24, width: 22, height: 26 },
      back: { top: 28, left: 26, width: 48, height: 42 }
    },
    defaultPlacement: 'front'
  },
  {
    id: 'regular-hoodie',
    name: 'Regular Hoodie - 320GSM',
    category: 'Hoodies',
    gsm: 320,
    fabric: 'Brushed Loopknit Heavyweight Fleece',
    blend: '88% Cotton & 12% Polyester Blend',
    description: '320 GSM brushed loopknit fabric for a soft, heavy, and durable feel. 88% cotton & 12% polyester blend ensures comfort, breathability, and long-lasting fit with spacious front pouch pocket.',
    features: [
      'High-quality logo printing that stays sharp and vibrant even after multiple washes',
      '320 GSM brushed loopknit fabric for soft, heavy and durable feel',
      '88% cotton & 12% polyester blend ensures comfort, breathability and long-lasting fit',
      'Comfort-fit front pouch pocket and matching drawstrings'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Original Black', hex: '#111111', isOriginalPhotoColor: true },
      { name: 'Deep Navy', hex: '#0F172A' },
      { name: 'Olive Green', hex: '#3F6212' },
      { name: 'Bone White', hex: '#F3F4F6' },
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Classic Red', hex: '#DC2626' },
      { name: 'Royal Blue', hex: '#2563EB' }
    ],
    priceTiers: [
      { label: 'Upto 10', maxQty: 10, price: 550 },
      { label: 'Upto 20', maxQty: 20, price: 525 },
      { label: 'Upto 50', maxQty: 50, price: 500 },
      { label: '50+', maxQty: Infinity, price: 475 }
    ],
    images: {
      front: regularHoodieFrontImg,
      back: regularHoodieBackImg
    },
    printZones: {
      front: { top: 26, left: 28, width: 44, height: 32 },
      back: { top: 28, left: 26, width: 48, height: 42 }
    },
    defaultPlacement: 'front'
  },
  {
    id: 'classic-polo',
    name: 'Normal Polo - 180GSM',
    category: 'Polos',
    gsm: 180,
    fabric: 'Brushed Loopknit Fabric',
    blend: '88% Cotton & 12% Polyester Blend',
    description: '180 GSM brushed loopknit fabric for soft, heavy, and durable feel. 88% cotton & 12% polyester blend ensures comfort, breathability, and long-lasting fit with a crisp ribbed collar.',
    features: [
      'High-quality logo printing that stays sharp and vibrant even after multiple washes',
      '180 GSM brushed loopknit fabric for soft, heavy and durable feel',
      '88% cotton & 12% polyester blend ensures comfort, breathability and long-lasting fit',
      'Reinforced two-button placket and shape-retaining collar'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Original Black', hex: '#111111', isOriginalPhotoColor: true },
      { name: 'Navy Blue', hex: '#1E293B' },
      { name: 'Royal Blue', hex: '#2563EB' },
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Charcoal Grey', hex: '#4B5563' },
      { name: 'Crimson Red', hex: '#DC2626' },
      { name: 'Teal', hex: '#0D9488' },
      { name: 'Bottle Green', hex: '#065F46' }
    ],
    priceTiers: [
      { label: 'Upto 10', maxQty: 10, price: 450 },
      { label: 'Upto 20', maxQty: 20, price: 400 },
      { label: 'Upto 50', maxQty: 50, price: 380 },
      { label: '50+', maxQty: Infinity, price: 350 }
    ],
    images: {
      front: poloFrontImg,
      back: poloBackImg
    },
    printZones: {
      front: { top: 26, left: 26, width: 46, height: 34 },
      back: { top: 24, left: 26, width: 48, height: 38 }
    },
    defaultPlacement: 'front'
  },
  {
    id: 'premium-polo',
    name: 'Premium Polo - 220GSM',
    category: 'Polos',
    gsm: 220,
    fabric: 'Cotton Matty Fabric',
    blend: '88% Cotton & 12% Polyester Blend',
    description: '220 GSM cotton matty fabric for a soft, breathable, and structured feel. 88% cotton & 12% polyester blend ensures comfort, breathability, and long-lasting fit with a luxurious piqué texture.',
    features: [
      'High-quality logo printing that stays sharp and vibrant even after multiple washes',
      '220 GSM cotton matty fabric for a soft, breathable and structured feel',
      '88% cotton & 12% polyester blend ensures comfort, breathability and long-lasting fit',
      'Denser waffle/matty weave with superior shape retention and collar structure'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Original Black', hex: '#111111', isOriginalPhotoColor: true },
      { name: 'Navy Blue', hex: '#1E293B' },
      { name: 'Royal Blue', hex: '#2563EB' },
      { name: 'Charcoal Grey', hex: '#4B5563' },
      { name: 'Crimson Red', hex: '#DC2626' },
      { name: 'Classic White', hex: '#F9FAFB' },
      { name: 'Bottle Green', hex: '#065F46' },
      { name: 'Mustard Yellow', hex: '#CA8A04' }
    ],
    priceTiers: [
      { label: 'Upto 10', maxQty: 10, price: 475 },
      { label: 'Upto 20', maxQty: 20, price: 450 },
      { label: 'Upto 50', maxQty: 50, price: 410 },
      { label: '50+', maxQty: Infinity, price: 380 }
    ],
    images: {
      front: poloFrontImg,
      back: poloBackImg
    },
    printZones: {
      front: { top: 26, left: 26, width: 46, height: 34 },
      back: { top: 24, left: 26, width: 48, height: 38 }
    },
    defaultPlacement: 'front'
  },
  {
    id: 'custom-cap',
    name: 'Custom Cap - Universal Free Size',
    category: 'Headwear',
    gsm: 260,
    fabric: 'Heavy Cotton Twill',
    blend: '100% Cotton Twill',
    description: 'Universal FREE SIZE CAP designed to fit most adults with adjustable strap. Made from high-quality cotton twill for soft, breathable, and durable feel with a structured 6-panel crown.',
    features: [
      'High-quality logo printing that stays sharp and vibrant even after multiple washes',
      'Made from high-quality cotton twill for soft, breathable and durable feel',
      'Structured crown and adjustable strap ensure a perfect, comfortable fit',
      'Universal FREE SIZE CAP designed to fit most adults with adjustable metal buckle/strap'
    ],
    sizes: ['Universal Free Size (Adjustable)'],
    colors: [
      { name: 'Original Black', hex: '#111111', isOriginalPhotoColor: true },
      { name: 'Crisp White', hex: '#F9FAFB' },
      { name: 'Navy Blue', hex: '#1E293B' },
      { name: 'Classic Red', hex: '#DC2626' },
      { name: 'Royal Blue', hex: '#2563EB' }
    ],
    priceTiers: [
      { label: 'Upto 10', maxQty: 10, price: 250 },
      { label: 'Upto 20', maxQty: 20, price: 230 },
      { label: 'Upto 50', maxQty: 50, price: 210 },
      { label: '50+', maxQty: Infinity, price: 190 }
    ],
    images: {
      front: capFrontImg
    },
    printZones: {
      front: { top: 30, left: 28, width: 44, height: 26 }
    },
    defaultPlacement: 'front'
  }
];

export function getPriceForQuantity(product: Product, quantity: number): { unitPrice: number; tierLabel: string } {
  const safeQty = Math.max(1, quantity);
  for (const tier of product.priceTiers) {
    if (safeQty <= tier.maxQty) {
      return { unitPrice: tier.price, tierLabel: tier.label };
    }
  }
  const lastTier = product.priceTiers[product.priceTiers.length - 1];
  return { unitPrice: lastTier.price, tierLabel: lastTier.label };
}
