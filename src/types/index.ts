import type { CustomPrintTierKey } from '../data/shopifyCatalog';

export interface BagItem {
  id: string;
  productId: string;
  handle: string;
  title: string;
  image: string;
  size: string;
  color?: string;
  printSummary?: string;
  frontPrint?: CustomPrintTierKey;
  backPrint?: CustomPrintTierKey;
  customArtworkName?: string;
  customArtworkDataUrl?: string;
  unitPrice: number;
  quantity: number;
  variantId?: string;
}

export interface CustomerCheckoutInfo {
  name: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  notes: string;
}
