export type Product = {
  id: string;
  name: string;
  fabric: string;
  prices: number[];
  colors: string[];
  image: string;
  category: string;
  sku?: string;
  source?: "local" | "qikink";
};

export const products: Product[] = [
  { id: "zipper-hoodie", name: "Zipper Hoodie", fabric: "320 GSM", prices: [600, 550, 525, 500], colors: ["Black", "Charcoal", "Grey"], image: "/products/zipper-hoodie.webp", category: "HOODIES", source: "local" },
  { id: "regular-hoodie", name: "Regular Hoodie", fabric: "320 GSM", prices: [550, 525, 500, 475], colors: ["Black", "White", "Green"], image: "/products/regular-hoodie.webp", category: "HOODIES", source: "local" },
  { id: "normal-polo", name: "Normal Polo", fabric: "180 GSM", prices: [450, 400, 380, 350], colors: ["Black", "Navy", "Maroon", "Yellow", "White", "Grey"], image: "/products/normal-polo.webp", category: "T-SHIRTS", source: "local" },
  { id: "premium-polo", name: "Premium Polo", fabric: "220 GSM", prices: [475, 450, 410, 380], colors: ["Black", "Navy", "Red", "White", "Sky Blue"], image: "/products/premium-polo.webp", category: "T-SHIRTS", source: "local" },
  { id: "crew-neck", name: "Crew Neck T-Shirt", fabric: "180 GSM", prices: [450, 400, 380, 350], colors: ["Black", "Navy", "Maroon", "Yellow", "White", "Grey"], image: "/products/crew-neck.webp", category: "T-SHIRTS", source: "local" },
  { id: "cap", name: "Cap", fabric: "FREE SIZE", prices: [250, 230, 210, 190], colors: ["White", "Black"], image: "/products/cap.webp", category: "ACCESSORIES", source: "local" }
];
