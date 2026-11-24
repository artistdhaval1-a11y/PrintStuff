// Auto-generated from live Shopify store: https://print-stuff-store.myshopify.com/
// Total unique products: 76

export type CollectionKey =
  | "all"
  | "custom-printing"
  | "t-shirts"
  | "hoodies"
  | "sweatshirts"
  | "jackets"
  | "cargos"
  | "pants-trackpants";

export interface ShopifyOption {
  name: string;
  values: string[];
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: number;
  option1: string;
  option2?: string;
  option3?: string;
  available: boolean;
}

export interface StoreProduct {
  id: string;
  handle: string;
  title: string;
  productType: string;
  collections: string[];
  isFeatured: boolean;
  isCustomTee: boolean;
  minPrice: number;
  maxPrice: number;
  description: string;
  images: string[];
  options: ShopifyOption[];
  variants: ShopifyVariant[];
}

export const STORE_COLLECTIONS: { key: CollectionKey; label: string; count: number }[] = [
  { key: "all", label: "All Pieces", count: 76 },
  { key: "custom-printing", label: "Custom Printing", count: 1 },
  { key: "t-shirts", label: "T-Shirts", count: 4 },
  { key: "hoodies", label: "Hoodies", count: 8 },
  { key: "sweatshirts", label: "Sweatshirts", count: 3 },
  { key: "jackets", label: "Jackets", count: 37 },
  { key: "cargos", label: "Cargos", count: 7 },
  { key: "pants-trackpants", label: "Pants & Trackpants", count: 16 },
];

export const CUSTOM_TEE_PRINT_TIERS = [
  { key: "None", label: "No Print", charge: 0, dimensions: "Blank side" },
  { key: "Pocket", label: "Pocket Print", charge: 50, dimensions: "4 × 4 in" },
  { key: "A4", label: "A4 Print", charge: 100, dimensions: "8.3 × 11.7 in" },
  { key: "A3", label: "A3 Print", charge: 150, dimensions: "11.7 × 16.5 in" },
  { key: "Full print", label: "Full Print", charge: 200, dimensions: "14 × 18 in" },
] as const;

export type CustomPrintTierKey = (typeof CUSTOM_TEE_PRINT_TIERS)[number]["key"];

export const CUSTOM_TEE_COLORS: {
  name: string;
  hex: string;
  frontImg: string;
  backImg: string;
}[] = [
  {
    name: "Black",
    hex: "#18181B",
    frontImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_black_front.webp?v=1794922424",
    backImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_black_back.webp?v=1794922425",
  },
  {
    name: "White",
    hex: "#F8F8F6",
    frontImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_white_front.webp?v=1794922423",
    backImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_white_back.webp?v=1794922423",
  },
  {
    name: "Navy Blue",
    hex: "#1E293B",
    frontImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_navy_blue_front.webp?v=1794922429",
    backImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_navy_blue_back.webp?v=1794922430",
  },
  {
    name: "Red",
    hex: "#DC2626",
    frontImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_red_front.webp?v=1794922433",
    backImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_red_back.webp?v=1794922433",
  },
  {
    name: "Dark Green",
    hex: "#14532D",
    frontImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_green_front.webp?v=1794922426",
    backImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_green_back.webp?v=1794922427",
  },
  {
    name: "Light Blue",
    hex: "#7DD3FC",
    frontImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_light_blue_front.webp?v=1794922428",
    backImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_light_blue_back.webp?v=1794922429",
  },
  {
    name: "Grey",
    hex: "#9CA3AF",
    frontImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_Grey_front.jpg?v=1794922431",
    backImg: "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_Grey_back.jpg?v=1794922432",
  },
];

export const SHOPIFY_PRODUCTS: StoreProduct[] = [
  {
    "id": "11014367019148",
    "handle": "custom-printed-t-shirt",
    "title": "Custom Printed T-Shirt",
    "productType": "T-shirt",
    "collections": [
      "custom-printing"
    ],
    "isFeatured": false,
    "isCustomTee": true,
    "minPrice": 199,
    "maxPrice": 599,
    "description": "Create your custom T-shirt by choosing a print size separately for the front and back. The base T-shirt price is ₹199. Print charges apply per side: pocket print ₹50, A4 ₹100, A3 ₹150, or full print ₹200. Select No print for any side you want to leave blank. Y",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_white_front.webp?v=1794922423",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_white_back.webp?v=1794922423",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_black_front.webp?v=1794922424",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_black_back.webp?v=1794922425",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_green_front.webp?v=1794922426",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_green_back.webp?v=1794922427",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_light_blue_front.webp?v=1794922428",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_light_blue_back.webp?v=1794922429",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_navy_blue_front.webp?v=1794922429",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_navy_blue_back.webp?v=1794922430",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_Grey_front.jpg?v=1794922431",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_Grey_back.jpg?v=1794922432",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_red_front.webp?v=1794922433",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/printstuff_custom_red_back.webp?v=1794922433"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "S",
          "M",
          "L",
          "XL",
          "2XL"
        ]
      },
      {
        "name": "Colour",
        "values": [
          "Black",
          "White",
          "Navy Blue",
          "Red",
          "Dark Green",
          "Light Blue",
          "Grey"
        ]
      },
      {
        "name": "Print combination",
        "values": [
          "Front: None | Back: None",
          "Front: None | Back: Pocket",
          "Front: None | Back: A4",
          "Front: None | Back: A3",
          "Front: None | Back: Full print",
          "Front: Pocket | Back: None",
          "Front: Pocket | Back: Pocket",
          "Front: Pocket | Back: A4",
          "Front: Pocket | Back: A3",
          "Front: Pocket | Back: Full print",
          "Front: A4 | Back: None",
          "Front: A4 | Back: Pocket",
          "Front: A4 | Back: A4",
          "Front: A4 | Back: A3",
          "Front: A4 | Back: Full print",
          "Front: A3 | Back: None",
          "Front: A3 | Back: Pocket",
          "Front: A3 | Back: A4",
          "Front: A3 | Back: A3",
          "Front: A3 | Back: Full print",
          "Front: Full print | Back: None",
          "Front: Full print | Back: Pocket",
          "Front: Full print | Back: A4",
          "Front: Full print | Back: A3",
          "Front: Full print | Back: Full print"
        ]
      }
    ],
    "variants": []
  },
  {
    "id": "10997243805836",
    "handle": "aesthetic-green-unisex-cargo-by-montelino",
    "title": "Aesthetic Green Unisex Cargo by PrintStuff",
    "productType": "cargo",
    "collections": [
      "cargos"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1449,
    "description": "Aesthetic Green Unisex Cargo Bring an earthy colour accent to your outfit with these green unisex cargo trousers. Pair the utility-inspired style with neutral basics or a statement jacket. Unisex styling Size & Care Check the available size options before orde",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_74.jpg?v=1794820129",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-258.jpg?v=1794848326",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-259.jpg?v=1794848329",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-260.jpg?v=1794848330",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-261.jpg?v=1794848330",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-262.jpg?v=1794848332",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-263.jpg?v=1794848332"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863531012236",
        "title": "28",
        "price": 1449,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863531045004",
        "title": "30",
        "price": 1449,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863531077772",
        "title": "32",
        "price": 1449,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863531110540",
        "title": "34",
        "price": 1449,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863531143308",
        "title": "36",
        "price": 1449,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863531176076",
        "title": "38",
        "price": 1449,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863531208844",
        "title": "40",
        "price": 1449,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863531241612",
        "title": "42",
        "price": 1449,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997243773068",
    "handle": "aesthetics-steel-gray-unisex-cargo-by-montelino",
    "title": "Aesthetics Steel Gray Unisex Cargo by PrintStuff",
    "productType": "cargo",
    "collections": [
      "cargos"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1449,
    "description": "Aesthetics Steel Gray Unisex Cargo Build a tonal streetwear outfit around these steel-grey unisex cargo trousers. Their utility-inspired styling works well with simple tees, sweatshirts and casual jackets. Unisex styling Size & Care Check the available size op",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_73.jpg?v=1794820128",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-254.jpg?v=1794848315",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-255.jpg?v=1794848315",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-256.jpg?v=1794848316",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-257.jpg?v=1794848318"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863530750092",
        "title": "28",
        "price": 1449,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863530782860",
        "title": "30",
        "price": 1449,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863530815628",
        "title": "32",
        "price": 1449,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863530848396",
        "title": "34",
        "price": 1449,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863530881164",
        "title": "36",
        "price": 1449,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863530913932",
        "title": "38",
        "price": 1449,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863530946700",
        "title": "40",
        "price": 1449,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863530979468",
        "title": "42",
        "price": 1449,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997243740300",
    "handle": "marlboro-racing-jacket-unisex-by-montelino",
    "title": "Marlboro Racing Jacket unisex by PrintStuff",
    "productType": "Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2449,
    "maxPrice": 2749,
    "description": "Marlboro Racing Jacket unisex Bring a vintage racing theme to your outerwear with this Marlboro unisex jacket. Style it with a plain tee and denim to keep its motorsport-inspired identity in focus. Unisex styling Size & Care Check the available size options be",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_72.jpg?v=1794820125",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-244.jpg?v=1794848303",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-245.jpg?v=1794848303"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863530487948",
        "title": "xs",
        "price": 2449,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863530520716",
        "title": "s",
        "price": 2449,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863530553484",
        "title": "m",
        "price": 2449,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863530586252",
        "title": "l",
        "price": 2449,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863530619020",
        "title": "xl",
        "price": 2449,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863530651788",
        "title": "2xl",
        "price": 2449,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863530684556",
        "title": "3xl",
        "price": 2549,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863530717324",
        "title": "4xl",
        "price": 2749,
        "option1": "4xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243707532",
    "handle": "red-ferrari-f1-jacket-for-unisex-iconic-streetwear-by-montelino",
    "title": "F1 TRIO FERRARI UNISEX EMBROIDED JACKET by PrintStuff",
    "productType": "Embroidery Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2649,
    "maxPrice": 2649,
    "description": "F1 TRIO FERRARI UNISEX EMBROIDED JACKET Add textured motorsport detailing to your layers with this Trio Ferrari F1 embroidered jacket. The unisex design works well over simple casual basics. Unisex styling Embroidered detailing",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_71.png?v=1794820124",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-240.png?v=1794848298",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-241.png?v=1794848299",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-242.png?v=1794848301",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-243.png?v=1794848301"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863530291340",
        "title": "xs",
        "price": 2649,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863530324108",
        "title": "s",
        "price": 2649,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863530356876",
        "title": "m",
        "price": 2649,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863530389644",
        "title": "l",
        "price": 2649,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863530422412",
        "title": "xl",
        "price": 2649,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863530455180",
        "title": "2xl",
        "price": 2649,
        "option1": "2xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243674764",
    "handle": "trio-f1-parachute-puffer-jacket-by-montelino",
    "title": "F1 FERRARI BLACK PUFFER PRINTED UNISEX JACKET by PrintStuff",
    "productType": "puffer jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1649,
    "maxPrice": 1999,
    "description": "F1 FERRARI BLACK PUFFER PRINTED UNISEX JACKET Build a darker motorsport-inspired outfit around this black Ferrari F1 puffer jacket. Printed detailing gives the unisex puffer silhouette its graphic character. Unisex styling Size & Care Check the available size ",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_70.jpg?v=1794820123",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-235.jpg?v=1794848293",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-236.jpg?v=1794848295",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-237.jpg?v=1794848295",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-238.jpg?v=1794848296",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-239.jpg?v=1794848297"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863528980620",
        "title": "xs",
        "price": 1649,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863529013388",
        "title": "s",
        "price": 1649,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863529046156",
        "title": "m",
        "price": 1649,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863529078924",
        "title": "l",
        "price": 1649,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863529111692",
        "title": "xl",
        "price": 1649,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863529144460",
        "title": "2xl",
        "price": 1649,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863529177228",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863529209996",
        "title": "4xl",
        "price": 1999,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863529242764",
        "title": "5xl",
        "price": 1999,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863529275532",
        "title": "6xl",
        "price": 1999,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243641996",
    "handle": "f1-tri-puffer-jacket-unisex-by-montelino",
    "title": "F1 FERRARI TRIO PUFFER PRINTED UNISEX JACKET by PrintStuff",
    "productType": "puffer jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1649,
    "maxPrice": 1999,
    "description": "F1 FERRARI TRIO PUFFER PRINTED UNISEX JACKET Make this Trio Ferrari F1 puffer jacket the focal point of a racing-inspired outfit. Printed detailing adds a graphic finish to the unisex puffer silhouette. Unisex styling Size & Care Check the available size optio",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_69.jpg?v=1794820123",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-230.jpg?v=1794848287",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-231.jpg?v=1794848288",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-232.jpg?v=1794848290",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-233.jpg?v=1794848291",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-234.jpg?v=1794848293"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863528652940",
        "title": "xs",
        "price": 1649,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863528685708",
        "title": "s",
        "price": 1649,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863528718476",
        "title": "m",
        "price": 1649,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863528751244",
        "title": "l",
        "price": 1649,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863528784012",
        "title": "xl",
        "price": 1649,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863528816780",
        "title": "2xl",
        "price": 1649,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863528849548",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863528882316",
        "title": "4xl",
        "price": 1999,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863528915084",
        "title": "5xl",
        "price": 1999,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863528947852",
        "title": "6xl",
        "price": 1999,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243576460",
    "handle": "f1-blackair-unisex-racing-jacket-by-montelino",
    "title": "F1 BLACKAIR UNISEX VINTAGE JACKET MEETS MOTORSPORTS by PrintStuff",
    "productType": "Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1999,
    "maxPrice": 2199,
    "description": "F1 BLACKAIR UNISEX VINTAGE JACKET MEETS MOTORSPORTS Add vintage racing influence to your casual layers with this Blackair F1 jacket. Style its unisex motorsport-inspired design with understated tees and neutral bottoms. Unisex styling Size & Care Check the ava",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_68.png?v=1794820122",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-226.png?v=1794848283",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-227.png?v=1794848284",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-228.png?v=1794848286",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-229.png?v=1794848287"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863527407756",
        "title": "xs",
        "price": 1999,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863527440524",
        "title": "s",
        "price": 1999,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863527473292",
        "title": "m",
        "price": 1999,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863527506060",
        "title": "l",
        "price": 1999,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863527538828",
        "title": "xl",
        "price": 1999,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863527571596",
        "title": "2xl",
        "price": 2199,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863527604364",
        "title": "3xl",
        "price": 2199,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243543692",
    "handle": "black-unisex-leather-jacket-by-montelino",
    "title": "BLACK PLAIN LEATHER UNISEX LEATHER JACKET by PrintStuff",
    "productType": "Leather Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2199,
    "maxPrice": 2549,
    "description": "BLACK PLAIN LEATHER UNISEX LEATHER JACKET Keep your outerwear rotation understated with this black plain leather-style jacket. Its unisex design pairs easily with denim, cargos and casual everyday layers. Unisex styling Size & Care Check the available size opt",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_67.jpg?v=1794820122",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-214.jpg?v=1794848265",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-215.jpg?v=1794848266",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-216.jpg?v=1794848267",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-217.jpg?v=1794848268"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863527211148",
        "title": "s",
        "price": 2199,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863527243916",
        "title": "m",
        "price": 2199,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863527276684",
        "title": "l",
        "price": 2199,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863527309452",
        "title": "xl",
        "price": 2199,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863527342220",
        "title": "2xl",
        "price": 2199,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863527374988",
        "title": "3xl",
        "price": 2549,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243478156",
    "handle": "gear-5-varsityjacket-luffy-edition-by-montelino",
    "title": "GEAR 5 VARSITYJACKET –LUFFY EDITION l UNISEX by PrintStuff",
    "productType": "Hoodie",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1649,
    "maxPrice": 1899,
    "description": "GEAR 5 VARSITYJACKET –LUFFY EDITION l UNISEX Add an anime-inspired layer to your wardrobe with this Gear 5 varsity jacket, Luffy Edition. Its unisex styling makes it a statement partner for a plain tee and denim. Unisex styling Size & Care Check the available ",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_66.jpg?v=1794820120",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-206.jpg?v=1794848257",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-207.jpg?v=1794848258",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-208.jpg?v=1794848259",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-209.png?v=1794848401"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863526949004",
        "title": "xs",
        "price": 1649,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863526981772",
        "title": "s",
        "price": 1649,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863527014540",
        "title": "m",
        "price": 1649,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863527047308",
        "title": "l",
        "price": 1649,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863527080076",
        "title": "xl",
        "price": 1649,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863527112844",
        "title": "2xl",
        "price": 1649,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863527145612",
        "title": "3xl",
        "price": 1899,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243445388",
    "handle": "jack-daniels-motorsports-vintage-racing-jacket-by-montelino",
    "title": "JACK DANIELS MOTORSPORTS VINTAGE RACING JACKET UNISEX by PrintStuff",
    "productType": "puffer jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1999,
    "maxPrice": 2199,
    "description": "JACK DANIELS MOTORSPORTS VINTAGE RACING JACKET UNISEX Give your layers a vintage racing identity with this Jack Daniels Motorsport puffer jacket. The unisex design pairs naturally with denim, cargos or casual trackpants. Unisex styling Size & Care Check the av",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_65.jpg?v=1794820120",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-202.jpg?v=1794848254",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-203.jpg?v=1794848254",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-204.jpg?v=1794848255",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-205.jpg?v=1794848256"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863526654092",
        "title": "s",
        "price": 1999,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863526686860",
        "title": "m",
        "price": 1999,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863526719628",
        "title": "l",
        "price": 1999,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863526752396",
        "title": "xl",
        "price": 1999,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863526785164",
        "title": "2xl",
        "price": 1999,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863526817932",
        "title": "3xl",
        "price": 2199,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863526850700",
        "title": "4xl",
        "price": 2199,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863526883468",
        "title": "5xl",
        "price": 2199,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863526916236",
        "title": "6xl",
        "price": 2199,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243412620",
    "handle": "mc-laren-jacket-v1-by-montelino",
    "title": "Mc Laren Jacket by PrintStuff",
    "productType": "puffer jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2199,
    "maxPrice": 2199,
    "description": "Mc Laren Jacket Build a racing-inspired layered outfit around this Mc Laren puffer jacket. Keep the rest of your outfit simple to let the motorsport theme stand out. Size & Care Check the available size options before ordering. Follow the care instructions on ",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_64.jpg?v=1794820119",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-198.jpg?v=1794848249",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-199.jpg?v=1794848250",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-200.jpg?v=1794848251",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-201.jpg?v=1794848252"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863526424716",
        "title": "xs",
        "price": 2199,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863526457484",
        "title": "s",
        "price": 2199,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863526490252",
        "title": "m",
        "price": 2199,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863526523020",
        "title": "l",
        "price": 2199,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863526555788",
        "title": "xl",
        "price": 2199,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863526588556",
        "title": "2xl",
        "price": 2199,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863526621324",
        "title": "3xl",
        "price": 2199,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243379852",
    "handle": "f1-bmw-parachute-puffer-jacket-by-montelino",
    "title": "F1 BMW PARACHUTE PUFFER JACKET by PrintStuff",
    "productType": "puffer jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2199,
    "maxPrice": 2199,
    "description": "F1 BMW PARACHUTE PUFFER JACKET Bring a motorsport theme to your outerwear with this BMW F1 Parachute puffer jacket. The puffer silhouette works as a statement layer over simple casual basics. Size & Care Check the available size options before ordering. Follow",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_63.jpg?v=1794820118",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-195.jpg?v=1794848246",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-196.jpg?v=1794848247",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-197.jpg?v=1794848248"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863526097036",
        "title": "xs",
        "price": 2199,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863526129804",
        "title": "s",
        "price": 2199,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863526162572",
        "title": "m",
        "price": 2199,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863526195340",
        "title": "l",
        "price": 2199,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863526228108",
        "title": "xl",
        "price": 2199,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863526260876",
        "title": "2xl",
        "price": 2199,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863526293644",
        "title": "3xl",
        "price": 2199,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863526326412",
        "title": "4xl",
        "price": 2199,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863526359180",
        "title": "5xl",
        "price": 2199,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863526391948",
        "title": "6xl",
        "price": 2199,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243347084",
    "handle": "racing-red-leather-unisex-jacket-by-montelino",
    "title": "F1 RED FERRARI UNISEX LEATHER JACKET by PrintStuff",
    "productType": "Leather Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2749,
    "maxPrice": 2749,
    "description": "F1 RED FERRARI UNISEX LEATHER JACKET Make red the focal point of your outerwear with this Ferrari F1 faux-leather jacket. Its unisex motorsport-inspired styling pairs well with dark denim or neutral cargos. Unisex styling Material Faux leather.",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_62.jpg?v=1794820118",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-191.jpg?v=1794848241",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-192.jpg?v=1794848242",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-193.jpg?v=1794848243",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-194.jpg?v=1794848244"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863525900428",
        "title": "xs",
        "price": 2749,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863525933196",
        "title": "s",
        "price": 2749,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863525965964",
        "title": "m",
        "price": 2749,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863525998732",
        "title": "l",
        "price": 2749,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863526031500",
        "title": "xl",
        "price": 2749,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863526064268",
        "title": "2xl",
        "price": 2749,
        "option1": "2xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243314316",
    "handle": "mc-laren-jacket-by-montelino",
    "title": "Mc Laren Jacket by PrintStuff",
    "productType": "puffer jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2199,
    "maxPrice": 2199,
    "description": "Mc Laren Jacket Make a motorsport-inspired statement with this Mc Laren puffer jacket. Layer the puffer silhouette over a simple tee or sweatshirt and keep the rest of the outfit understated. Size & Care Check the available size options before ordering. Follow",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_61.jpg?v=1794820117",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-140.png?v=1794848397",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-141.jpg?v=1794848180",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-142.png?v=1794848398",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-143.png?v=1794848400"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863525572748",
        "title": "xs",
        "price": 2199,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863525605516",
        "title": "s",
        "price": 2199,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863525638284",
        "title": "m",
        "price": 2199,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863525671052",
        "title": "l",
        "price": 2199,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863525703820",
        "title": "xl",
        "price": 2199,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863525736588",
        "title": "2xl",
        "price": 2199,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863525769356",
        "title": "3xl",
        "price": 2199,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863525802124",
        "title": "4xl",
        "price": 2199,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863525834892",
        "title": "5xl",
        "price": 2199,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863525867660",
        "title": "6xl",
        "price": 2199,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243281548",
    "handle": "red-sweatshirt-premium-motorsport-inspired-cotton-fleece-by-montelino",
    "title": "Red Sweatshirt Hoodie -Premium Motorsport-Inspired Cotton Fleece by PrintStuff",
    "productType": "sweatshirt",
    "collections": [
      "hoodies"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1899,
    "description": "Red Sweatshirt Hoodie -Premium Motorsport-Inspired Cotton Fleece Bring a red colour accent to your layers with this motorsport-inspired hoodie. Cotton fleece and racing-inspired styling make it a natural match for casual denim or trackpants. Material Cotton fl",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_60.jpg?v=1794820117",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-136.jpg?v=1794848165",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-137.png?v=1794848396",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-138.jpg?v=1794848177",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-139.jpg?v=1794848178"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863525245068",
        "title": "xs",
        "price": 1549,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863525277836",
        "title": "s",
        "price": 1549,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863525310604",
        "title": "m",
        "price": 1549,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863525343372",
        "title": "l",
        "price": 1549,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863525376140",
        "title": "xl",
        "price": 1549,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863525408908",
        "title": "2xl",
        "price": 1649,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863525441676",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863525474444",
        "title": "4xl",
        "price": 1899,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863525507212",
        "title": "5xl",
        "price": 1899,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863525539980",
        "title": "6xl",
        "price": 1899,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243216012",
    "handle": "black-asthetic-unisex-trackpants-by-montelino",
    "title": "White Trackpants with Zip at Bottom - Classic Aesthetic by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1799,
    "maxPrice": 1799,
    "description": "White Trackpants with Zip at Bottom - Classic Aesthetic Add a lighter option to your off-duty wardrobe with these white Classic Aesthetic trackpants. Zips at the bottom provide a distinctive detail for your casual outfit. Zip detailing at the bottom Size & Car",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_59.png?v=1794820115",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-132.png?v=1794848162",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-133.png?v=1794848162",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-134.png?v=1794848163",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-135.png?v=1794848164"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863524950156",
        "title": "28",
        "price": 1799,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863524982924",
        "title": "30",
        "price": 1799,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863525015692",
        "title": "32",
        "price": 1799,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863525048460",
        "title": "34",
        "price": 1799,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863525081228",
        "title": "36",
        "price": 1799,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863525113996",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863525146764",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863525179532",
        "title": "42",
        "price": 1799,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997243150476",
    "handle": "black-trackpants-classic-aesthetic-streetwear-by-montelino",
    "title": "Black Trackpants - Classic Aesthetic by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1799,
    "maxPrice": 1799,
    "description": "Black Trackpants - Classic Aesthetic Keep your everyday casual rotation simple with these black Classic Aesthetic trackpants. Pair the black colourway with a graphic tee, plain sweatshirt or relaxed jacket. Size & Care Check the available size options before o",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_58.png?v=1794820115",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-130.png?v=1794848160",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-131.png?v=1794848161"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863524622476",
        "title": "28",
        "price": 1799,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863524655244",
        "title": "30",
        "price": 1799,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863524688012",
        "title": "32",
        "price": 1799,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863524720780",
        "title": "34",
        "price": 1799,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863524753548",
        "title": "36",
        "price": 1799,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863524786316",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863524819084",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863524851852",
        "title": "42",
        "price": 1799,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997243117708",
    "handle": "black-plain-unisex-collar-jacket-faux-leather-by-montelino",
    "title": "BLACK PLAIN UNISEX COLLAR LEATHER JACKET by PrintStuff",
    "productType": "Leather Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1649,
    "description": "BLACK PLAIN UNISEX COLLAR LEATHER JACKET Build a versatile layered outfit around this black faux-leather jacket. The plain design and collar keep the look understated and easy to coordinate. Unisex styling Collared design",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_57.jpg?v=1794820113",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-128.jpg?v=1794848160",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-129.jpg?v=1794848160"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863523410060",
        "title": "xs",
        "price": 1449,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863523442828",
        "title": "s",
        "price": 1449,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863523475596",
        "title": "m",
        "price": 1449,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863523508364",
        "title": "l",
        "price": 1449,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863523541132",
        "title": "xl",
        "price": 1449,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863523573900",
        "title": "2xl",
        "price": 1449,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863523606668",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997243052172",
    "handle": "black-boxy-cropped-jacket-unisex-faux-leather-by-montelino",
    "title": "BURGUNDY PLAIN UNISEX COLLAR LEATHER JACKET by PrintStuff",
    "productType": "Leather Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1649,
    "description": "BURGUNDY PLAIN UNISEX COLLAR LEATHER JACKET Give everyday layers a deeper colour accent with this burgundy faux-leather jacket. Its plain, collared design pairs easily with denim and neutral basics. Unisex styling Collared design",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_56.png?v=1794820113",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-126.png?v=1794848157",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-127.png?v=1794848158"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863522164876",
        "title": "xs",
        "price": 1449,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863522197644",
        "title": "s",
        "price": 1449,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863522230412",
        "title": "m",
        "price": 1449,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863522263180",
        "title": "l",
        "price": 1449,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863522295948",
        "title": "xl",
        "price": 1449,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863522328716",
        "title": "2xl",
        "price": 1449,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863522361484",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997242986636",
    "handle": "brown-boxy-cropped-jacket-unisex-faux-leather-by-montelino",
    "title": "CHERRY RED PLAIN UNISEX COLLAR LEATHER JACKET by PrintStuff",
    "productType": "Leather Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1649,
    "description": "CHERRY RED PLAIN UNISEX COLLAR LEATHER JACKET Bring a rich colour accent to your layers with this cherry-red faux-leather jacket. Its plain, collared design lets the colourway lead the outfit. Unisex styling Collared design",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_55.jpg?v=1794820112",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-122.jpg?v=1794848153",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-123.jpg?v=1794848154"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863521902732",
        "title": "xs",
        "price": 1449,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863521935500",
        "title": "s",
        "price": 1449,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863521968268",
        "title": "m",
        "price": 1449,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863522001036",
        "title": "l",
        "price": 1449,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863522033804",
        "title": "xl",
        "price": 1449,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863522066572",
        "title": "2xl",
        "price": 1449,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863522099340",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997242921100",
    "handle": "red-boxy-cropped-jacket-unisex-faux-leather-by-montelino",
    "title": "WHITE PLAIN UNISEX COLLAR LEATHER JACKET by PrintStuff",
    "productType": "Leather Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1649,
    "description": "WHITE PLAIN UNISEX COLLAR LEATHER JACKET Add a clean, light-coloured layer with this white faux-leather jacket. A plain design and collar make it easy to wear with both printed tees and simple basics. Unisex styling Collared design",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_54.jpg?v=1794820111",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-120.jpg?v=1794848151",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-121.jpg?v=1794848152"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863521640588",
        "title": "xs",
        "price": 1449,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863521673356",
        "title": "s",
        "price": 1449,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863521706124",
        "title": "m",
        "price": 1449,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863521738892",
        "title": "l",
        "price": 1449,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863521771660",
        "title": "xl",
        "price": 1449,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863521804428",
        "title": "2xl",
        "price": 1449,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863521837196",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997242888332",
    "handle": "f1-blackair-unisex-jacket-by-montelino",
    "title": "F1 BLACKAIR UNISEX VINTAGE JACKET MEETS MOTORSPORTS by PrintStuff",
    "productType": "Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1999,
    "maxPrice": 2399,
    "description": "F1 BLACKAIR UNISEX VINTAGE JACKET MEETS MOTORSPORTS Bring vintage motorsport styling to your outfit with this Blackair F1 jacket. Its unisex design works as a statement layer over understated casual basics. Unisex styling Size & Care Check the available size o",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_53.png?v=1794820110",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-108.png?v=1794848136",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-109.png?v=1794848137",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-110.png?v=1794848139",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-111.png?v=1794848140"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863521411212",
        "title": "xs",
        "price": 1999,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863521443980",
        "title": "s",
        "price": 1999,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863521476748",
        "title": "m",
        "price": 1999,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863521509516",
        "title": "l",
        "price": 1999,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863521542284",
        "title": "xl",
        "price": 1999,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863521575052",
        "title": "2xl",
        "price": 2399,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863521607820",
        "title": "3xl",
        "price": 2199,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997242855564",
    "handle": "racing-petronas-puffer-embroidery-jacket-by-montelino",
    "title": "F1 PETRONAS UNISEX EMBROIDED JACKET by PrintStuff",
    "productType": "Embroidery Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2749,
    "maxPrice": 2749,
    "description": "F1 PETRONAS UNISEX EMBROIDED JACKET Build a motorsport-inspired outfit around this Petronas F1 embroidered jacket. Its embroidered detailing makes it a statement layer over a simple tee. Unisex styling Embroidered detailing",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_52.jpg?v=1794820109",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-89.jpg?v=1794848109",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-90.jpg?v=1794848110",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-91.jpg?v=1794848111",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-92.jpg?v=1794848112",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-93.jpg?v=1794848113"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863521247372",
        "title": "s",
        "price": 2749,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863521280140",
        "title": "m",
        "price": 2749,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863521312908",
        "title": "l",
        "price": 2749,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863521345676",
        "title": "xl",
        "price": 2749,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863521378444",
        "title": "2xl",
        "price": 2749,
        "option1": "2xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997242822796",
    "handle": "grey-kraken-straight-fit-baggy-pants-by-montelino",
    "title": "Grey Kraken Straight Fit Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1899,
    "description": "Grey Kraken Straight Fit Baggy Pants Build a tonal outfit around the Grey Kraken baggy pants. Their grey colourway and straight-fit silhouette work with a simple tee or a statement jacket. Straight-fit, baggy silhouette Size & Care Check the available size opt",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_51.jpg?v=1794820109",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-75.jpg?v=1794848093"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863520985228",
        "title": "28",
        "price": 1549,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863521017996",
        "title": "30",
        "price": 1549,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863521050764",
        "title": "32",
        "price": 1549,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863521083532",
        "title": "34",
        "price": 1549,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863521116300",
        "title": "36",
        "price": 1549,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863521149068",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863521181836",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863521214604",
        "title": "42",
        "price": 1899,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242790028",
    "handle": "sand-heat-straight-fit-baggy-pants-by-montelino",
    "title": "Sand Heat Straight Fit Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1799,
    "description": "Sand Heat Straight Fit Baggy Pants Keep a relaxed outfit light and neutral with the Sand Heat pants. A straight-fit, baggy silhouette makes this style easy to pair with graphic tees and casual layers. Straight-fit, baggy silhouette Size & Care Check the availa",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_50.jpg?v=1794820108",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-74.jpg?v=1794848093"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863520723084",
        "title": "28",
        "price": 1549,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863520755852",
        "title": "30",
        "price": 1549,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863520788620",
        "title": "32",
        "price": 1549,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863520821388",
        "title": "34",
        "price": 1549,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863520854156",
        "title": "36",
        "price": 1549,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863520886924",
        "title": "38",
        "price": 1649,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863520919692",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863520952460",
        "title": "42",
        "price": 1799,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242757260",
    "handle": "razor-brown-straight-fit-baggy-pants-by-montelino",
    "title": "Razor Brown Straight Fit Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1899,
    "description": "Razor Brown Straight Fit Baggy Pants Add an earthy neutral to a relaxed outfit with the Razor Brown pants. Their straight-fit, baggy silhouette works with light tees or darker layered tops. Straight-fit, baggy silhouette Size & Care Check the available size op",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_49.jpg?v=1794820039",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-73.jpg?v=1794848092"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863520460940",
        "title": "28",
        "price": 1549,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863520493708",
        "title": "30",
        "price": 1549,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863520526476",
        "title": "32",
        "price": 1549,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863520559244",
        "title": "34",
        "price": 1549,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863520592012",
        "title": "36",
        "price": 1549,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863520624780",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863520657548",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863520690316",
        "title": "42",
        "price": 1899,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242724492",
    "handle": "raudra-unisex-straight-fit-baggy-pants-by-montelino",
    "title": "Raudra Unisex Straight Fit Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1649,
    "maxPrice": 1899,
    "description": "Raudra Unisex Straight Fit Baggy Pants Make the Raudra unisex baggy pants part of your everyday streetwear lineup. The straight-fit silhouette pairs easily with tees, sweatshirts and casual jackets. Unisex styling Straight-fit, baggy silhouette",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_48.jpg?v=1794820039",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-72.jpg?v=1794848091"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863520198796",
        "title": "28",
        "price": 1649,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863520231564",
        "title": "30",
        "price": 1649,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863520264332",
        "title": "32",
        "price": 1649,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863520297100",
        "title": "34",
        "price": 1649,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863520329868",
        "title": "36",
        "price": 1649,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863520362636",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863520395404",
        "title": "40",
        "price": 1899,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863520428172",
        "title": "42",
        "price": 1899,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242691724",
    "handle": "mutation-unisex-straight-fit-baggy-pants-montelino",
    "title": "Mutation Unisex Straight Fit Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1649,
    "maxPrice": 1899,
    "description": "Mutation Unisex Straight Fit Baggy Pants Bring an easy straight-fit silhouette to your daily rotation with the Mutation unisex baggy pants. Pair them with a graphic tee or layer up with a sweatshirt and jacket. Unisex styling Straight-fit, baggy silhouette",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_47.jpg?v=1794820040",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-70.jpg?v=1794848090",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-71.jpg?v=1794848091"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863519936652",
        "title": "28",
        "price": 1649,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863519969420",
        "title": "30",
        "price": 1649,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863520002188",
        "title": "32",
        "price": 1649,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863520034956",
        "title": "34",
        "price": 1649,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863520067724",
        "title": "36",
        "price": 1649,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863520100492",
        "title": "38",
        "price": 1899,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863520133260",
        "title": "40",
        "price": 1899,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863520166028",
        "title": "42",
        "price": 1899,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242658956",
    "handle": "pythonic-unisex-straight-fit-baggy-pants-montelino",
    "title": "Pythonic Unisex Straight Fit Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1899,
    "description": "Pythonic Unisex Straight Fit Baggy Pants Build a relaxed streetwear outfit around the Pythonic unisex pants. Their straight-fit, baggy silhouette works with simple tops or statement outerwear. Unisex styling Straight-fit, baggy silhouette",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_46.jpg?v=1794820038",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-69.jpg?v=1794848089"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863519674508",
        "title": "28",
        "price": 1449,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863519707276",
        "title": "30",
        "price": 1449,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863519740044",
        "title": "32",
        "price": 1449,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863519772812",
        "title": "34",
        "price": 1449,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863519805580",
        "title": "36",
        "price": 1449,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863519838348",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863519871116",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863519903884",
        "title": "42",
        "price": 1899,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242626188",
    "handle": "grey-mutation-unisex-straight-fit-baggy-pants-by-monte-lino",
    "title": "Grey Mutation Unisex Straight Fit Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1649,
    "maxPrice": 1899,
    "description": "Grey Mutation Unisex Straight Fit Baggy Pants Give your casual outfits a relaxed foundation with the Grey Mutation unisex pants. Their straight-fit, baggy silhouette makes them a natural partner for tees and sweatshirts. Unisex styling Straight-fit, baggy silh",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_45.jpg?v=1794820037",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-67.jpg?v=1794848088",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-68.jpg?v=1794848088"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863517446284",
        "title": "28",
        "price": 1649,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863517479052",
        "title": "30",
        "price": 1649,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863517511820",
        "title": "32",
        "price": 1649,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863517544588",
        "title": "34",
        "price": 1649,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863517577356",
        "title": "36",
        "price": 1649,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863517610124",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863517642892",
        "title": "40",
        "price": 1899,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863517675660",
        "title": "42",
        "price": 1899,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242593420",
    "handle": "saiyan-black-unisex-straight-fit-baggy-pants-by-montelino",
    "title": "Saiyan Black Unisex Straight Fit Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1899,
    "description": "Saiyan Black Unisex Straight Fit Baggy Pants Keep your baggy-pants rotation versatile with the Saiyan Black unisex style. A straight-fit silhouette and black colourway work with both bold graphics and understated layers. Unisex styling Straight-fit, baggy silh",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_44.jpg?v=1794820037",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-66.jpg?v=1794848087"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863517184140",
        "title": "28",
        "price": 1549,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863517216908",
        "title": "30",
        "price": 1549,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863517249676",
        "title": "32",
        "price": 1549,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863517282444",
        "title": "34",
        "price": 1549,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863517315212",
        "title": "36",
        "price": 1549,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863517347980",
        "title": "38",
        "price": 1649,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863517380748",
        "title": "40",
        "price": 1899,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863517413516",
        "title": "42",
        "price": 1899,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242462348",
    "handle": "sand-kraken-straight-fit-baggy-pants-by-montelino",
    "title": "Sand Kraken Straight Fit Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1899,
    "description": "Sand Kraken Straight Fit Baggy Pants Take a neutral approach to a baggy silhouette with the Sand Kraken pants. The straight-fit cut pairs well with graphic tops, plain tees and layered jackets. Straight-fit, baggy silhouette Size & Care Check the available siz",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_43.jpg?v=1794820036"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863516823692",
        "title": "28",
        "price": 1549,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863516856460",
        "title": "30",
        "price": 1549,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863516889228",
        "title": "32",
        "price": 1549,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863516921996",
        "title": "34",
        "price": 1549,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863516954764",
        "title": "36",
        "price": 1549,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863516987532",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863517020300",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863517053068",
        "title": "42",
        "price": 1899,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242429580",
    "handle": "grey-saiyan-unisex-straight-baggy-pants-by-montelino",
    "title": "Grey Saiyan Unisex Straight Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1899,
    "description": "Grey Saiyan Unisex Straight Baggy Pants Build an everyday streetwear outfit around the Grey Saiyan unisex baggy pants. A straight-leg silhouette and grey colourway keep the look easy to coordinate. Unisex styling Straight-fit, baggy silhouette",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_42.jpg?v=1794820034"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863516561548",
        "title": "28",
        "price": 1549,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863516594316",
        "title": "30",
        "price": 1549,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863516627084",
        "title": "32",
        "price": 1549,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863516659852",
        "title": "34",
        "price": 1549,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863516692620",
        "title": "36",
        "price": 1549,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863516725388",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863516758156",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863516790924",
        "title": "42",
        "price": 1899,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242396812",
    "handle": "heat-unisex-straight-fit-baggy-pants-by-montelino",
    "title": "Heat Unisex Straight Fit Baggy Pants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1799,
    "description": "Heat Unisex Straight Fit Baggy Pants Bring a relaxed silhouette to your streetwear rotation with the Heat unisex baggy pants. Their straight-fit cut is an easy match for a simple tee, sweatshirt or statement jacket. Unisex styling Straight-fit, baggy silhouett",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_41.jpg?v=1794820034",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-65.jpg?v=1794848086"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863516299404",
        "title": "28",
        "price": 1549,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863516332172",
        "title": "30",
        "price": 1549,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863516364940",
        "title": "32",
        "price": 1549,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863516397708",
        "title": "34",
        "price": 1549,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863516430476",
        "title": "36",
        "price": 1549,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863516463244",
        "title": "38",
        "price": 1649,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863516496012",
        "title": "40",
        "price": 1649,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863516528780",
        "title": "42",
        "price": 1799,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242364044",
    "handle": "jd-printed-puffer-jacket-l-unisex-jacket-by-montelino",
    "title": "JACK DANIELS MOTORSPORTS VINTAGE RACING JACKET by PrintStuff",
    "productType": "Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1999,
    "maxPrice": 2199,
    "description": "JACK DANIELS MOTORSPORTS VINTAGE RACING JACKET Give your layers a vintage racing theme with this Jack Daniels Motorsport jacket. Wear it over a simple tee to keep its motorsport-inspired styling in focus. Size & Care Check the available size options before ord",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_40.png?v=1794820034",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-61.png?v=1794848082",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-62.png?v=1794848083",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-63.png?v=1794848085",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-64.png?v=1794848085"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863516004492",
        "title": "s",
        "price": 1999,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863516037260",
        "title": "m",
        "price": 1999,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863516070028",
        "title": "l",
        "price": 1999,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863516102796",
        "title": "xl",
        "price": 1999,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863516135564",
        "title": "2xl",
        "price": 1999,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863516168332",
        "title": "3xl",
        "price": 2199,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863516201100",
        "title": "4xl",
        "price": 2199,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863516233868",
        "title": "5xl",
        "price": 2199,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863516266636",
        "title": "6xl",
        "price": 2199,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997242331276",
    "handle": "red-f1-racing-t-shirt-by-montelino",
    "title": "Red F1 Racing T-Shirt by PrintStuff",
    "productType": "T-shirt",
    "collections": [
      "t-shirts"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1349,
    "maxPrice": 1449,
    "description": "Red F1 Racing T-Shirt Give your casual lineup a racing-inspired accent with this red F1 Racing T-shirt. Pair the red colourway with neutral bottoms to keep the outfit focused. Size & Care Check the available size options before ordering. Follow the care instru",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_39.jpg?v=1794820032",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-16.jpg?v=1794848002"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863515709580",
        "title": "s",
        "price": 1349,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863515742348",
        "title": "m",
        "price": 1349,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863515775116",
        "title": "l",
        "price": 1349,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863515807884",
        "title": "xl",
        "price": 1349,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863515840652",
        "title": "2xl",
        "price": 1349,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863515873420",
        "title": "3xl",
        "price": 1349,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863515906188",
        "title": "4xl",
        "price": 1449,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863515938956",
        "title": "5xl",
        "price": 1449,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863515971724",
        "title": "6xl",
        "price": 1449,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997242298508",
    "handle": "white-f1-t-shirt-montelino",
    "title": "White F1 T-shirt by PrintStuff",
    "productType": "T-shirt",
    "collections": [
      "t-shirts"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1349,
    "maxPrice": 1449,
    "description": "White F1 T-shirt Add a motorsport theme to your everyday tee rotation with this white F1 T-shirt. Wear it as a simple standalone piece or as the base for a layered streetwear outfit. Size & Care Check the available size options before ordering. Follow the care",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_38.jpg?v=1794820032",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-15.jpg?v=1794848001"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863515414668",
        "title": "s",
        "price": 1349,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863515447436",
        "title": "m",
        "price": 1349,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863515480204",
        "title": "l",
        "price": 1349,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863515512972",
        "title": "xl",
        "price": 1349,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863515545740",
        "title": "2xl",
        "price": 1349,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863515578508",
        "title": "3xl",
        "price": 1349,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863515611276",
        "title": "4xl",
        "price": 1449,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863515644044",
        "title": "5xl",
        "price": 1449,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863515676812",
        "title": "6xl",
        "price": 1449,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997242265740",
    "handle": "white-f1-t-shirt-by-montelino",
    "title": "White F1 T-Shirt by PrintStuff",
    "productType": "T-shirt",
    "collections": [
      "t-shirts"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1349,
    "maxPrice": 1449,
    "description": "White F1 T-Shirt Build a racing-inspired casual outfit around this white F1 T-shirt. The white colourway makes it easy to pair with dark denim, cargos or a statement jacket. Size & Care Check the available size options before ordering. Follow the care instruct",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_37.jpg?v=1794820031",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-14.jpg?v=1794848000"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863515119756",
        "title": "s",
        "price": 1349,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863515152524",
        "title": "m",
        "price": 1349,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863515185292",
        "title": "l",
        "price": 1349,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863515218060",
        "title": "xl",
        "price": 1349,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863515250828",
        "title": "2xl",
        "price": 1349,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863515283596",
        "title": "3xl",
        "price": 1349,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863515316364",
        "title": "4xl",
        "price": 1449,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863515349132",
        "title": "5xl",
        "price": 1449,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863515381900",
        "title": "6xl",
        "price": 1449,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997242232972",
    "handle": "red-f1-t-shirt-by-montelino",
    "title": "Red F1 T-Shirt by PrintStuff",
    "productType": "T-shirt",
    "collections": [
      "t-shirts"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1349,
    "maxPrice": 1449,
    "description": "Red F1 T-Shirt Take motorsport-inspired styling into your everyday rotation with this red F1 T-shirt. The red colourway makes a statement worn on its own or under an open jacket. Size & Care Check the available size options before ordering. Follow the care ins",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_36.jpg?v=1794820030",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-13.jpg?v=1794847999"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863514824844",
        "title": "s",
        "price": 1349,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863514857612",
        "title": "m",
        "price": 1349,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863514890380",
        "title": "l",
        "price": 1349,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863514923148",
        "title": "xl",
        "price": 1349,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863514955916",
        "title": "2xl",
        "price": 1349,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863514988684",
        "title": "3xl",
        "price": 1349,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863515021452",
        "title": "4xl",
        "price": 1449,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863515054220",
        "title": "5xl",
        "price": 1449,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863515086988",
        "title": "6xl",
        "price": 1449,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997242200204",
    "handle": "black-thuder-strom-track-pants-unisex-by-montelino",
    "title": "Thunder Trackpants - Classic Aesthetic by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1799,
    "maxPrice": 1799,
    "description": "Thunder Trackpants - Classic Aesthetic Build an off-duty outfit around the Thunder Trackpants. This Classic Aesthetic style pairs naturally with a simple tee or sweatshirt and your favourite sneakers. Size & Care Check the available size options before orderin",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_35.jpg?v=1794820029"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863514562700",
        "title": "28",
        "price": 1799,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863514595468",
        "title": "30",
        "price": 1799,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863514628236",
        "title": "32",
        "price": 1799,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863514661004",
        "title": "34",
        "price": 1799,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863514693772",
        "title": "36",
        "price": 1799,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863514726540",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863514759308",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863514792076",
        "title": "42",
        "price": 1799,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242167436",
    "handle": "asthetic-unisex-trackpants-by-montelino",
    "title": "Black Asthetic Unisex Trackpants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1799,
    "maxPrice": 1799,
    "description": "Black Asthetic Unisex Trackpants Keep your off-duty rotation versatile with these black unisex trackpants. The black colourway pairs easily with graphic tees, hoodies and motorsport-inspired layers. Unisex styling Size & Care Check the available size options b",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_34.jpg?v=1794820029",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-56.jpg?v=1794848042",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-57.jpg?v=1794848043",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-58.jpg?v=1794848080",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-59.jpg?v=1794848080",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-60.jpg?v=1794848080"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863512334476",
        "title": "28",
        "price": 1799,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863512367244",
        "title": "30",
        "price": 1799,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863512400012",
        "title": "32",
        "price": 1799,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863512432780",
        "title": "34",
        "price": 1799,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863512465548",
        "title": "36",
        "price": 1799,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863512498316",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863512531084",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863512563852",
        "title": "42",
        "price": 1799,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242134668",
    "handle": "asthetic-green-track-pants-by-montelino",
    "title": "Green Asthetic Unisex Trackpants by PrintStuff",
    "productType": "Bottom",
    "collections": [
      "pants-trackpants"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1799,
    "maxPrice": 1799,
    "description": "Green Asthetic Unisex Trackpants Add colour to a casual streetwear outfit with these green unisex trackpants. Pair them with a neutral tee or sweatshirt for a coordinated off-duty look. Unisex styling Size & Care Check the available size options before orderin",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_33.jpg?v=1794820029",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-51.jpg?v=1794848039",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-52.jpg?v=1794848039",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-53.jpg?v=1794848040",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-54.jpg?v=1794848040",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-55.jpg?v=1794848041"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863512006796",
        "title": "28",
        "price": 1799,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863512039564",
        "title": "30",
        "price": 1799,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863512072332",
        "title": "32",
        "price": 1799,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863512105100",
        "title": "34",
        "price": 1799,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863512137868",
        "title": "36",
        "price": 1799,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863512170636",
        "title": "38",
        "price": 1799,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863512203404",
        "title": "40",
        "price": 1799,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863512236172",
        "title": "42",
        "price": 1799,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997242036364",
    "handle": "spiderman-hoodie-for-men-and-women-by-montelino",
    "title": "Spiderman Hoodie For Men and Women by PrintStuff",
    "productType": "Hoodie",
    "collections": [
      "hoodies"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1699,
    "maxPrice": 1699,
    "description": "Spiderman Hoodie For Men and Women Make a superhero-inspired statement with this Spiderman hoodie for men and women. Pair it with simple bottoms so its character-inspired styling stays at the centre of your outfit. Unisex styling Size & Care Check the availabl",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_31.jpg?v=1794820029",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-31.jpg?v=1794848023",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-32.jpg?v=1794848023",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-33.jpg?v=1794848023"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863511777420",
        "title": "s",
        "price": 1699,
        "option1": "s",
        "available": false
      },
      {
        "id": "63863511810188",
        "title": "m",
        "price": 1699,
        "option1": "m",
        "available": false
      },
      {
        "id": "63863511842956",
        "title": "l",
        "price": 1699,
        "option1": "l",
        "available": false
      },
      {
        "id": "63863511875724",
        "title": "xl",
        "price": 1699,
        "option1": "xl",
        "available": false
      },
      {
        "id": "63863511908492",
        "title": "2xl",
        "price": 1699,
        "option1": "2xl",
        "available": false
      },
      {
        "id": "63863511941260",
        "title": "3xl",
        "price": 1699,
        "option1": "3xl",
        "available": false
      },
      {
        "id": "63863511974028",
        "title": "4xl",
        "price": 1699,
        "option1": "4xl",
        "available": false
      }
    ]
  },
  {
    "id": "10997242003596",
    "handle": "aesthetic-beige-unisex-cargo-by-montelino",
    "title": "Aesthetic Beige Unisex Cargo by PrintStuff",
    "productType": "cargo",
    "collections": [
      "cargos"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1449,
    "description": "Aesthetic Beige Unisex Cargo Keep your utility-inspired outfits easy to coordinate with these beige unisex cargo trousers. The neutral colourway pairs well with both understated tops and bold graphic layers. Unisex styling Size & Care Check the available size ",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_30.jpg?v=1794820029",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-22.jpg?v=1794848011",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-23.jpg?v=1794848013",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-24.jpg?v=1794848013"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863511548044",
        "title": "30",
        "price": 1449,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863511580812",
        "title": "32",
        "price": 1449,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863511613580",
        "title": "34",
        "price": 1449,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863511646348",
        "title": "36",
        "price": 1449,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863511679116",
        "title": "38",
        "price": 1449,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863511711884",
        "title": "40",
        "price": 1449,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863511744652",
        "title": "42",
        "price": 1449,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997241970828",
    "handle": "white-spiderman-hoodie-premium-quality-by-montelino",
    "title": "White Spiderman Hoodie by PrintStuff",
    "productType": "Hoodie",
    "collections": [
      "hoodies"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1799,
    "maxPrice": 1799,
    "description": "White Spiderman Hoodie Add a light colourway to your character-inspired wardrobe with this white Spiderman hoodie. Wear it over a tee with denim or cargos for an easy casual outfit. Size & Care Check the available size options before ordering. Follow the care ",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_32.jpg?v=1794820029",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-34.jpg?v=1794848024",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-35.jpg?v=1794848025",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-36.jpg?v=1794848025",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-37.jpg?v=1794848026",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-38.jpg?v=1794848027"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863511253132",
        "title": "s",
        "price": 1799,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863511285900",
        "title": "m",
        "price": 1799,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863511318668",
        "title": "l",
        "price": 1799,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863511351436",
        "title": "xl",
        "price": 1799,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863511384204",
        "title": "2xl",
        "price": 1799,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863511416972",
        "title": "3xl",
        "price": 1799,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863511449740",
        "title": "4xl",
        "price": 1799,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863511482508",
        "title": "5xl",
        "price": 1799,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863511515276",
        "title": "6xl",
        "price": 1799,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997241938060",
    "handle": "aesthetic-gray-unisex-cargo-by-montelino",
    "title": "Aesthetic Gray Unisex Cargo by PrintStuff",
    "productType": "cargo",
    "collections": [
      "cargos"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1449,
    "description": "Aesthetic Gray Unisex Cargo Keep your casual wardrobe easy to coordinate with these grey unisex cargo trousers. The neutral colourway works with both graphic tops and understated everyday layers. Unisex styling Size & Care Check the available size options befo",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_28.jpg?v=1794820023",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-264.jpg?v=1794848334",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-265.jpg?v=1794848336",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-266.jpg?v=1794848339",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-267.jpg?v=1794848338",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-268.jpg?v=1794848340",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-269.jpg?v=1794848341"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863510990988",
        "title": "28",
        "price": 1449,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863511023756",
        "title": "30",
        "price": 1449,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863511056524",
        "title": "32",
        "price": 1449,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863511089292",
        "title": "34",
        "price": 1449,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863511122060",
        "title": "36",
        "price": 1449,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863511154828",
        "title": "38",
        "price": 1449,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863511187596",
        "title": "40",
        "price": 1449,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863511220364",
        "title": "42",
        "price": 1449,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997241905292",
    "handle": "aesthetic-unisex-cargo-by-montelino",
    "title": "Aesthetic Unisex Cargo by PrintStuff",
    "productType": "cargo",
    "collections": [
      "cargos"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1449,
    "description": "Aesthetic Unisex Cargo Build a utility-inspired outfit around these Aesthetic unisex cargo trousers. Their cargo styling works with a simple tee for daytime wear or a statement jacket for a layered streetwear look. Unisex styling Size & Care Check the availabl",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_29.jpg?v=1794820026",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-17.jpg?v=1794848004",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-18.jpg?v=1794848006",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-19.jpg?v=1794848008",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-20.jpg?v=1794848008",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-21.jpg?v=1794848010"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42",
          "28"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863508762764",
        "title": "30",
        "price": 1449,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863508795532",
        "title": "32",
        "price": 1449,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863508828300",
        "title": "34",
        "price": 1449,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863508861068",
        "title": "36",
        "price": 1449,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863508893836",
        "title": "38",
        "price": 1449,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863508926604",
        "title": "40",
        "price": 1449,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863508959372",
        "title": "42",
        "price": 1449,
        "option1": "42",
        "available": true
      },
      {
        "id": "63863508992140",
        "title": "28",
        "price": 1449,
        "option1": "28",
        "available": true
      }
    ]
  },
  {
    "id": "10997241872524",
    "handle": "aesthetic-beige-unisex-cargo-v1_by-montelino",
    "title": "Aesthetic Beige Unisex Cargo by PrintStuff",
    "productType": "cargo",
    "collections": [
      "cargos"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1449,
    "description": "Aesthetic Beige Unisex Cargo Add a neutral utility-inspired style to your everyday wardrobe with these beige unisex cargo trousers. Pair them with a plain tee or a bold graphic layer. Unisex styling Size & Care Check the available size options before ordering.",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_27.jpg?v=1794820022",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-248.jpg?v=1794848305",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-249.jpg?v=1794848307",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-250.jpg?v=1794848309",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-251.jpg?v=1794848310",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-252.jpg?v=1794848311",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-253.jpg?v=1794848312"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863508500620",
        "title": "28",
        "price": 1449,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863508533388",
        "title": "30",
        "price": 1449,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863508566156",
        "title": "32",
        "price": 1449,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863508598924",
        "title": "34",
        "price": 1449,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863508631692",
        "title": "36",
        "price": 1449,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863508664460",
        "title": "38",
        "price": 1449,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863508697228",
        "title": "40",
        "price": 1449,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863508729996",
        "title": "42",
        "price": 1449,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997241741452",
    "handle": "premium-black-unisex-leather-jacket-by-montelino",
    "title": "BROWN PLAIN LEATHER UNISEX JACKET by PrintStuff",
    "productType": "Leather Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2199,
    "maxPrice": 2549,
    "description": "BROWN PLAIN LEATHER UNISEX JACKET Add an earthy colourway to your outerwear rotation with this brown plain leather-style jacket. The unisex design works with printed tees or simple everyday basics. Unisex styling Size & Care Check the available size options be",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_24.jpg?v=1794820020",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-156.jpg?v=1794848195",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-157.jpg?v=1794848195",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-158.jpg?v=1794848195",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-159.jpg?v=1794848196"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863508172940",
        "title": "s",
        "price": 2199,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863508205708",
        "title": "m",
        "price": 2199,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863508238476",
        "title": "l",
        "price": 2199,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863508271244",
        "title": "xl",
        "price": 2199,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863508304012",
        "title": "2xl",
        "price": 2199,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863508336780",
        "title": "3xl",
        "price": 2549,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997241708684",
    "handle": "f1-ferrari-red-puffer-printed-unisex-jacket-by-montelino",
    "title": "F1 FERRARI RED PUFFER PRINTED UNISEX JACKET by PrintStuff",
    "productType": "puffer jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1999,
    "description": "F1 FERRARI RED PUFFER PRINTED UNISEX JACKET Bring a bold red colourway to your outerwear with this printed Ferrari F1 puffer jacket. Its unisex motorsport-inspired design works well with simple, neutral bottoms. Unisex styling Size & Care Check the available s",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_25.jpg?v=1794820020",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-210.jpg?v=1794848262",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-211.jpg?v=1794848263",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-212.jpg?v=1794848264",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-213.jpg?v=1794848264"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863507845260",
        "title": "xs",
        "price": 1449,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863507878028",
        "title": "s",
        "price": 1449,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863507910796",
        "title": "m",
        "price": 1649,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863507943564",
        "title": "l",
        "price": 1649,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863507976332",
        "title": "xl",
        "price": 1649,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863508009100",
        "title": "2xl",
        "price": 1649,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863508041868",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863508074636",
        "title": "4xl",
        "price": 1999,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863508107404",
        "title": "5xl",
        "price": 1999,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863508140172",
        "title": "6xl",
        "price": 1999,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997241643148",
    "handle": "f1-porsche-embroidery-unisex-racing-jacket-by-montelino",
    "title": "F1 PORSCHE UNISEX EMBROIDED JACKET by PrintStuff",
    "productType": "Embroidery Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2749,
    "maxPrice": 2749,
    "description": "F1 PORSCHE UNISEX EMBROIDED JACKET Bring embroidered motorsport detailing to your layers with this Porsche F1 jacket. The unisex design is easy to style over a plain tee with denim or cargos. Unisex styling Embroidered detailing",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_26.png?v=1794820021",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-222.png?v=1794848278",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-223.png?v=1794848279",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-224.png?v=1794848281",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-225.png?v=1794848282"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863507583116",
        "title": "s",
        "price": 2749,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863507615884",
        "title": "m",
        "price": 2749,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863507648652",
        "title": "l",
        "price": 2749,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863507681420",
        "title": "xl",
        "price": 2749,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863507714188",
        "title": "2xl",
        "price": 2749,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863507746956",
        "title": "3xl",
        "price": 2749,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997241512076",
    "handle": "racing-black-leather-unisex-jacket-by-montelino",
    "title": "F1 BLACK FERRARI UNISEX LEATHER JACKET by PrintStuff",
    "productType": "Leather Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2749,
    "maxPrice": 2749,
    "description": "F1 BLACK FERRARI UNISEX LEATHER JACKET Give your casual layers a motorsport-inspired finish with this black Ferrari F1 jacket. Its faux-leather material offers a leather-look alternative for an everyday racing-inspired outfit. Unisex styling Material Faux leat",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_21.jpg?v=1794820017",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-76.jpg?v=1794848095",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-77.jpg?v=1794848095",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-78.jpg?v=1794848096",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-79.jpg?v=1794848097",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-80.jpg?v=1794848098"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863507288204",
        "title": "xs",
        "price": 2749,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863507320972",
        "title": "s",
        "price": 2749,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863507353740",
        "title": "m",
        "price": 2749,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863507386508",
        "title": "l",
        "price": 2749,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863507419276",
        "title": "xl",
        "price": 2749,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863507452044",
        "title": "2xl",
        "price": 2749,
        "option1": "2xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997241413772",
    "handle": "red-racing-edition-sweatshirt-premium-motorsport-inspired-cotton-fleece-streetwear-by-montelino",
    "title": "Red Sweatshirt -Premium Motorsport-Inspired Cotton Fleece by PrintStuff",
    "productType": "sweatshirt",
    "collections": [
      "sweatshirts"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1899,
    "description": "Red Sweatshirt -Premium Motorsport-Inspired Cotton Fleece Bring colour to your casual layers with this red motorsport-inspired sweatshirt. Cotton fleece and racing-inspired styling make it an easy partner for neutral bottoms. Material Cotton fleece. Fibre perc",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_23.png?v=1794820070",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-152.png?v=1794848194",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-153.jpg?v=1794848191",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-154.png?v=1794848194",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-155.jpg?v=1794848193"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863506894988",
        "title": "xs",
        "price": 1549,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863506927756",
        "title": "s",
        "price": 1549,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863506960524",
        "title": "m",
        "price": 1549,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863506993292",
        "title": "l",
        "price": 1549,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863507026060",
        "title": "xl",
        "price": 1549,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863507058828",
        "title": "2xl",
        "price": 1649,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863507091596",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863507124364",
        "title": "4xl",
        "price": 1899,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863507157132",
        "title": "5xl",
        "price": 1899,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863507189900",
        "title": "6xl",
        "price": 1899,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997241282700",
    "handle": "aesthetic-brown-unisex-cargo-by-montelino",
    "title": "Aesthetic Brown Unisex Cargo by PrintStuff",
    "productType": "cargo",
    "collections": [
      "cargos"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1449,
    "description": "Aesthetic Brown Unisex Cargo Bring earthy colour to your casual rotation with these brown unisex cargo trousers. Style their utility-inspired look with a plain tee or a statement streetwear jacket. Unisex styling Size & Care Check the available size options be",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_20.jpg?v=1794820018",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-25.jpg?v=1794848015",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-26.jpg?v=1794848016",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-27.jpg?v=1794848018",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-28.jpg?v=1794848018",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-29.jpg?v=1794848020",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-30.jpg?v=1794848021"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "42"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863506567308",
        "title": "28",
        "price": 1449,
        "option1": "28",
        "available": true
      },
      {
        "id": "63863506600076",
        "title": "30",
        "price": 1449,
        "option1": "30",
        "available": true
      },
      {
        "id": "63863506632844",
        "title": "32",
        "price": 1449,
        "option1": "32",
        "available": true
      },
      {
        "id": "63863506665612",
        "title": "34",
        "price": 1449,
        "option1": "34",
        "available": true
      },
      {
        "id": "63863506698380",
        "title": "36",
        "price": 1449,
        "option1": "36",
        "available": true
      },
      {
        "id": "63863506731148",
        "title": "38",
        "price": 1449,
        "option1": "38",
        "available": true
      },
      {
        "id": "63863506763916",
        "title": "40",
        "price": 1449,
        "option1": "40",
        "available": true
      },
      {
        "id": "63863506796684",
        "title": "42",
        "price": 1449,
        "option1": "42",
        "available": true
      }
    ]
  },
  {
    "id": "10997241184396",
    "handle": "racing-jd-puffer-embroidery-unisex-jacket-by-montelino",
    "title": "F1 JACK DANIEL'S UNISEX EMBROIDED JACKET by PrintStuff",
    "productType": "Embroidery Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2199,
    "maxPrice": 2199,
    "description": "F1 JACK DANIEL'S UNISEX EMBROIDED JACKET Make this Jack Daniel's F1 embroidered jacket the focal point of a racing-inspired outfit. Embroidered detailing adds texture to this unisex layer. Unisex styling Embroidered detailing",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_22.png?v=1794820018",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-100.png?v=1794848126",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-101.png?v=1794848127",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-102.png?v=1794848129",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-103.png?v=1794848130"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863506305164",
        "title": "s",
        "price": 2199,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863506337932",
        "title": "m",
        "price": 2199,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863506370700",
        "title": "l",
        "price": 2199,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863506403468",
        "title": "xl",
        "price": 2199,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863506436236",
        "title": "2xl",
        "price": 2199,
        "option1": "2xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997241086092",
    "handle": "f1-inspired-black-petronas-sweatshirt-premium-cotton-fleece-by-montelino",
    "title": "F1 Inspired White PETRONAS Sweatshirt -Premium Cotton Fleece by PrintStuff",
    "productType": "sweatshirt",
    "collections": [
      "sweatshirts"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1899,
    "description": "F1 Inspired White PETRONAS Sweatshirt -Premium Cotton Fleece Build a light-coloured racing-inspired outfit around this white Petronas sweatshirt. Cotton fleece and motorsport-inspired styling make it an easy casual layer. Material Cotton fleece. Fibre percenta",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_19.jpg?v=1794820016",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-144.jpg?v=1794848184",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-145.jpg?v=1794848184",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-146.jpg?v=1794848185",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-147.jpg?v=1794848186"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863505846412",
        "title": "xs",
        "price": 1549,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863505879180",
        "title": "s",
        "price": 1549,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863505911948",
        "title": "m",
        "price": 1549,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863505944716",
        "title": "l",
        "price": 1549,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863505977484",
        "title": "xl",
        "price": 1549,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863506010252",
        "title": "2xl",
        "price": 1649,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863506043020",
        "title": "3xl",
        "price": 1899,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863506075788",
        "title": "4xl",
        "price": 1899,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863506108556",
        "title": "5xl",
        "price": 1899,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863506141324",
        "title": "6xl",
        "price": 1899,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240987788",
    "handle": "racing-red-bull-puffer-embroidery-unisex-jacket-by-montelino",
    "title": "F1 REDBULL UNISEX EMBROIDED JACKET by PrintStuff",
    "productType": "Embroidery Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2749,
    "maxPrice": 2749,
    "description": "F1 REDBULL UNISEX EMBROIDED JACKET Give your casual layers a racing-inspired identity with this Red Bull F1 embroidered jacket. Wear it over a simple tee to keep the embroidered detailing in focus. Unisex styling Embroidered detailing",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_18.jpg?v=1794820016",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-104.jpg?v=1794848131",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-105.jpg?v=1794848132",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-106.jpg?v=1794848134",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-107.jpg?v=1794848135"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863505518732",
        "title": "s",
        "price": 2749,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863505551500",
        "title": "m",
        "price": 2749,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863505584268",
        "title": "l",
        "price": 2749,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863505617036",
        "title": "xl",
        "price": 2749,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863505649804",
        "title": "2xl",
        "price": 2749,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863505682572",
        "title": "3xl",
        "price": 2749,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240889484",
    "handle": "espresso-brown-boxy-cropped-jacket-unisex-faux-leather-by-montelino",
    "title": "Classic Trucker Collar Faux Leather Jacket – Espresso Brown by PrintStuff",
    "productType": "Leather Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1449,
    "maxPrice": 1649,
    "description": "Classic Trucker Collar Faux Leather Jacket – Espresso Brown Add an earthy finish to your casual wardrobe with this espresso-brown faux-leather jacket. A classic trucker collar gives the understated design a defined shape. Trucker collar Material Faux leather.",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_16.png?v=1794820013",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-124.png?v=1794848155",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-125.png?v=1794848156"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863503257740",
        "title": "xs",
        "price": 1449,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863503290508",
        "title": "s",
        "price": 1449,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863503323276",
        "title": "m",
        "price": 1449,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863503356044",
        "title": "l",
        "price": 1449,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863503388812",
        "title": "xl",
        "price": 1449,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863503421580",
        "title": "2xl",
        "price": 1449,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863503454348",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240791180",
    "handle": "f1-white-mercedes-unisex-leather-jacket-by-montelino",
    "title": "F1 WHITE MERCEDES UNISEX LEATHER JACKET UNISEX by PrintStuff",
    "productType": "Leather Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2749,
    "maxPrice": 2749,
    "description": "F1 WHITE MERCEDES UNISEX LEATHER JACKET UNISEX Build a light-coloured motorsport outfit around this white Mercedes F1 faux-leather jacket. The unisex racing-inspired design makes a statement over simple basics. Unisex styling Material Faux leather.",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_17.jpg?v=1794820013",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-218.jpg?v=1794848274",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-219.jpg?v=1794848276",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-220.jpg?v=1794848276",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-221.jpg?v=1794848276"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863503028364",
        "title": "s",
        "price": 2749,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863503061132",
        "title": "m",
        "price": 2749,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863503093900",
        "title": "l",
        "price": 2749,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863503126668",
        "title": "xl",
        "price": 2749,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863503159436",
        "title": "2xl",
        "price": 2749,
        "option1": "2xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240660108",
    "handle": "racing-red-puffer-embroidery-unisex-jacket-by-montelino",
    "title": "F1 RED FERRARI UNISEX EMBROIDED JACKET by PrintStuff",
    "productType": "Embroidery Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2649,
    "maxPrice": 2649,
    "description": "F1 RED FERRARI UNISEX EMBROIDED JACKET Make red the focus of your outfit with this Ferrari F1 embroidered jacket. Embroidered detailing brings texture to a unisex motorsport-inspired layer. Unisex styling Embroidered detailing",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_14.png?v=1794820013",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-85.png?v=1794848105",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-86.png?v=1794848107",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-87.png?v=1794848108",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-88.png?v=1794848109"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863502700684",
        "title": "xs",
        "price": 2649,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863502733452",
        "title": "s",
        "price": 2649,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863502766220",
        "title": "m",
        "price": 2649,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863502798988",
        "title": "l",
        "price": 2649,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863502831756",
        "title": "xl",
        "price": 2649,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863502864524",
        "title": "2xl",
        "price": 2649,
        "option1": "2xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240561804",
    "handle": "racing-black-puffer-embroidery-unisex-jacket-by-montelino",
    "title": "F1 BLACK FERRARI UNISEX EMBROIDED JACKET by PrintStuff",
    "productType": "Embroidery Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2649,
    "maxPrice": 2649,
    "description": "F1 BLACK FERRARI UNISEX EMBROIDED JACKET Add textured detailing to your racing-inspired rotation with this black Ferrari F1 embroidered jacket. The unisex design pairs naturally with simple denim or cargos. Unisex styling Embroidered detailing",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_13.png?v=1794820010",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-81.png?v=1794848100",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-82.png?v=1794848101",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-83.png?v=1794848103",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-84.png?v=1794848103"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863502471308",
        "title": "xs",
        "price": 2649,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863502504076",
        "title": "s",
        "price": 2649,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863502536844",
        "title": "m",
        "price": 2649,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863502569612",
        "title": "l",
        "price": 2649,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863502602380",
        "title": "xl",
        "price": 2649,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863502635148",
        "title": "2xl",
        "price": 2649,
        "option1": "2xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240529036",
    "handle": "racing-lamborghini-puffer-embroidery-unisex-jacket-by-montelino",
    "title": "F1 LAMBORGINI UNISEX EMBROIDED JACKET by PrintStuff",
    "productType": "Embroidery Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 2749,
    "maxPrice": 2749,
    "description": "F1 LAMBORGINI UNISEX EMBROIDED JACKET Bring embroidered detailing to your casual layers with this Lamborgini F1 jacket. The unisex motorsport-inspired design works well with understated bottoms. Unisex styling Embroidered detailing",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_15.png?v=1794820012",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-94.png?v=1794848114",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-95.jpg?v=1794848115",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-96.png?v=1794848117",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-97.jpg?v=1794848117",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-98.png?v=1794848123",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-99.png?v=1794848125"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863502274700",
        "title": "s",
        "price": 2749,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863502307468",
        "title": "m",
        "price": 2749,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863502340236",
        "title": "l",
        "price": 2749,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863502373004",
        "title": "xl",
        "price": 2749,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863502405772",
        "title": "2xl",
        "price": 2749,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863502438540",
        "title": "3xl",
        "price": 2749,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240496268",
    "handle": "red-ferrari-f1-jacket-premium-racing-streetwear-unisex-racing-jacket-by-montelino",
    "title": "F1 RED FERRARI UNISEX RACING JACKET I DTF by PrintStuff",
    "productType": "Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1349,
    "maxPrice": 1999,
    "description": "F1 RED FERRARI UNISEX RACING JACKET I DTF Bring racing-inspired graphics to your layers with this red Ferrari F1 jacket. DTF print detailing gives this unisex design a different finish from the embroidered styles in the collection. Unisex styling DTF print det",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_12.png?v=1794820010",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-47.png?v=1794848034",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-48.png?v=1794848035",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-49.png?v=1794848037",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-50.png?v=1794848038"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863501947020",
        "title": "xs",
        "price": 1349,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863501979788",
        "title": "s",
        "price": 1349,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863502012556",
        "title": "m",
        "price": 1349,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863502045324",
        "title": "l",
        "price": 1349,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863502078092",
        "title": "xl",
        "price": 1349,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863502110860",
        "title": "2xl",
        "price": 1349,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863502143628",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863502176396",
        "title": "4xl",
        "price": 1899,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863502209164",
        "title": "5xl",
        "price": 1999,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863502241932",
        "title": "6xl",
        "price": 1999,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240463500",
    "handle": "white-spiderman-unisex-hoodie-by-montelino",
    "title": "White Spiderman Unisex Hoodie by PrintStuff",
    "productType": "Hoodie",
    "collections": [
      "hoodies"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1799,
    "maxPrice": 1799,
    "description": "White Spiderman Unisex Hoodie Give your character-inspired wardrobe a lighter layer with this white Spiderman unisex hoodie. Pair it with dark denim or neutral cargos for an easy casual outfit. Unisex styling Size & Care Check the available size options before",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_11.jpg?v=1794820008",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-246.jpg?v=1794848304",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-247.jpg?v=1794848304"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863501652108",
        "title": "s",
        "price": 1799,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863501684876",
        "title": "m",
        "price": 1799,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863501717644",
        "title": "l",
        "price": 1799,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863501750412",
        "title": "xl",
        "price": 1799,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863501783180",
        "title": "2xl",
        "price": 1799,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863501815948",
        "title": "3xl",
        "price": 1799,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863501848716",
        "title": "4xl",
        "price": 1799,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863501881484",
        "title": "5xl",
        "price": 1799,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863501914252",
        "title": "6xl",
        "price": 1799,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240430732",
    "handle": "cny-inspired-premium-mustard-yellow-suede-jacket-by-montelino",
    "title": "CNY-Inspired Premium Suede Jacket by PrintStuff",
    "productType": "CNY Jackets",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1899,
    "maxPrice": 1899,
    "description": "CNY-Inspired Premium Suede Jacket Add a mustard-yellow accent to your layers with this CNY-inspired suede-style jacket. Heritage-inspired detailing gives the casual silhouette a distinctive identity. Material Suede-touch / suede-finish fabric. Fibre compositio",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_8.png?v=1794820006",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-167.png?v=1794848206",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-168.png?v=1794848207",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-169.png?v=1794848208",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-170.png?v=1794848208",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-171.png?v=1794848209",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-172.png?v=1794848211",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-173.jpg?v=1794848210",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-174.jpg?v=1794848211",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-1.png?v=1794846863",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-11.jpg?v=1794846870",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-12.jpg?v=1794846872",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-7.jpg?v=1794846868",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-13.jpg?v=1794846872",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-10.jpg?v=1794846870",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-14.png?v=1794846874"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863501488268",
        "title": "s",
        "price": 1899,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863501521036",
        "title": "m",
        "price": 1899,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863501553804",
        "title": "l",
        "price": 1899,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863501586572",
        "title": "xl",
        "price": 1899,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863501619340",
        "title": "2xl",
        "price": 1899,
        "option1": "2xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240397964",
    "handle": "cny-inspired-premium-red-suede-jacket-by-montelino",
    "title": "CNY-Inspired Premium Red Suede Jacket by PrintStuff",
    "productType": "CNY Jackets",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1899,
    "maxPrice": 1899,
    "description": "CNY-Inspired Premium Red Suede Jacket Bring CNY-inspired detailing to your outfit with this red suede-style jacket. Wear the heritage-inspired design with neutral denim or cargos for a balanced streetwear look. Material Suede-touch / suede-finish fabric. Fibre",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_7.png?v=1794820004",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-160.png?v=1794848198",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-161.png?v=1794848198",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-162.png?v=1794848200",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-163.png?v=1794848200",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-164.png?v=1794848202",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-165.png?v=1794848204",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-166.jpg?v=1794848204",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-15.jpg?v=1794846873",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-5.jpg?v=1794846866",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-4.jpg?v=1794846866",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-14.png?v=1794846874"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863501258892",
        "title": "xs",
        "price": 1899,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863501291660",
        "title": "s",
        "price": 1899,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863501324428",
        "title": "m",
        "price": 1899,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863501357196",
        "title": "l",
        "price": 1899,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863501389964",
        "title": "xl",
        "price": 1899,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863501422732",
        "title": "2xl",
        "price": 1899,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863501455500",
        "title": "3xl",
        "price": 1899,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240365196",
    "handle": "cny-inspired-premium-navy-blue-suede-jacket-by-montelino",
    "title": "CNY-Inspired Premium Navy Blue Suede Jacket by PrintStuff",
    "productType": "CNY Jackets",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1899,
    "maxPrice": 1899,
    "description": "CNY-Inspired Premium Navy Blue Suede Jacket Add a navy-blue option to your CNY-inspired wardrobe with this suede-style jacket. Heritage-inspired detailing gives this casual layer a distinctive streetwear look. Material Suede-touch / suede-finish fabric. Fibre ",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_5.png?v=1794820003",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-183.png?v=1794848231",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-184.png?v=1794848232",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-185.png?v=1794848234",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-186.png?v=1794848234",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-187.png?v=1794848235",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-188.png?v=1794848237",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-189.png?v=1794848237",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-190.png?v=1794848241",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-3.jpg?v=1794846865",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-9.jpg?v=1794846869",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-2.jpg?v=1794846864",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-6.jpg?v=1794846867",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-8.jpg?v=1794846868",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/mercy-reference-20261116-14.png?v=1794846874"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863501029516",
        "title": "xs",
        "price": 1899,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863501062284",
        "title": "s",
        "price": 1899,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863501095052",
        "title": "m",
        "price": 1899,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863501127820",
        "title": "l",
        "price": 1899,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863501160588",
        "title": "xl",
        "price": 1899,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863501193356",
        "title": "2xl",
        "price": 1899,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863501226124",
        "title": "3xl",
        "price": 1899,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240332428",
    "handle": "cny-inspired-premium-black-suede-jacket-by-montelino",
    "title": "CNY-Inspired Premium Black Suede Jacket by PrintStuff",
    "productType": "CNY Jackets",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1899,
    "maxPrice": 1899,
    "description": "CNY-Inspired Premium Black Suede Jacket Build a darker heritage-inspired outfit around this black CNY jacket. Its suede-style look pairs well with denim, cargos and understated tees. Size & Care Check the available size options before ordering. Follow the care",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_6.png?v=1794820004",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-175.png?v=1794848214",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-176.png?v=1794848214",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-177.png?v=1794848215",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-178.png?v=1794848226",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-179.png?v=1794848228",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-180.png?v=1794848229",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-181.jpg?v=1794848229",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-182.png?v=1794848230"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863500800140",
        "title": "xs",
        "price": 1899,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863500832908",
        "title": "s",
        "price": 1899,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863500865676",
        "title": "m",
        "price": 1899,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863500898444",
        "title": "l",
        "price": 1899,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863500931212",
        "title": "xl",
        "price": 1899,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863500963980",
        "title": "2xl",
        "price": 1899,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863500996748",
        "title": "3xl",
        "price": 1899,
        "option1": "3xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240299660",
    "handle": "f1-black-petronas-sweatshirt-premium-cotton-fleece-by-montelino",
    "title": "F1 Inspired Black PETRONAS Sweatshirt -Premium Cotton Fleece by PrintStuff",
    "productType": "sweatshirt",
    "collections": [
      "sweatshirts"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1549,
    "maxPrice": 1899,
    "description": "F1 Inspired Black PETRONAS Sweatshirt -Premium Cotton Fleece Add a dark racing-inspired layer with this black Petronas sweatshirt. Its cotton-fleece material pairs naturally with denim, cargos or trackpants for everyday styling. Material Cotton fleece. Fibre p",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_10.jpg?v=1794820008",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-148.jpg?v=1794848186",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-149.jpg?v=1794848187",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-150.jpg?v=1794848188",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-151.jpg?v=1794848190"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863500472460",
        "title": "xs",
        "price": 1549,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863500505228",
        "title": "s",
        "price": 1549,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863500537996",
        "title": "m",
        "price": 1549,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863500570764",
        "title": "l",
        "price": 1549,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863500603532",
        "title": "xl",
        "price": 1549,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863500636300",
        "title": "2xl",
        "price": 1649,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863500669068",
        "title": "3xl",
        "price": 1899,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863500701836",
        "title": "4xl",
        "price": 1899,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863500734604",
        "title": "5xl",
        "price": 1899,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863500767372",
        "title": "6xl",
        "price": 1899,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240266892",
    "handle": "racing-black-unisex-jacket-by-montelino",
    "title": "F1 BLACK FERRARI UNISEX RACING JACKET I DTF by PrintStuff",
    "productType": "Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1349,
    "maxPrice": 1999,
    "description": "F1 BLACK FERRARI UNISEX RACING JACKET I DTF Build a darker racing-inspired outfit around this black Ferrari F1 jacket. Its DTF print detailing distinguishes it from the embroidered jackets in the collection. Unisex styling DTF print detailing",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_4.png?v=1794820002",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-112.png?v=1794848141",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-113.png?v=1794848142",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-114.png?v=1794848143",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-115.png?v=1794848144"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863500144780",
        "title": "xs",
        "price": 1349,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863500177548",
        "title": "s",
        "price": 1349,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863500210316",
        "title": "m",
        "price": 1349,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863500243084",
        "title": "l",
        "price": 1349,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863500275852",
        "title": "xl",
        "price": 1349,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863500308620",
        "title": "2xl",
        "price": 1349,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863500341388",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863500374156",
        "title": "4xl",
        "price": 1899,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863500406924",
        "title": "5xl",
        "price": 1999,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863500439692",
        "title": "6xl",
        "price": 1999,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240234124",
    "handle": "montelino-tribal-shadow-depth-hoodie-white-heavyweight-puff-print-graphic-hoodie",
    "title": "PrintStuff Tribal Shadow Depth Hoodie (White) | Heavyweight Puff Print Graphic Hoodie",
    "productType": "Hoodie",
    "collections": [
      "hoodies"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1524,
    "maxPrice": 1524,
    "description": "PrintStuff Tribal Shadow Depth Hoodie (White) | Heavyweight Puff Print Graphic Hoodie Make the white Tribal Shadow Depth hoodie the focal point of your winter outfit. Its raised 3D puff-print graphics contrast with a clean, drawcord-free hood and an oversized ",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_3.png?v=1794820000",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-6.png?v=1794847992",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-7.png?v=1794847993",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-8.png?v=1794847995",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-9.png?v=1794847996",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-10.png?v=1794847997",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-11.png?v=1794847998",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-12.png?v=1794847999"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "S",
          "M",
          "L",
          "XL",
          "2XL"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863499980940",
        "title": "S",
        "price": 1524,
        "option1": "S",
        "available": true
      },
      {
        "id": "63863500013708",
        "title": "M",
        "price": 1524,
        "option1": "M",
        "available": true
      },
      {
        "id": "63863500046476",
        "title": "L",
        "price": 1524,
        "option1": "L",
        "available": true
      },
      {
        "id": "63863500079244",
        "title": "XL",
        "price": 1524,
        "option1": "XL",
        "available": true
      },
      {
        "id": "63863500112012",
        "title": "2XL",
        "price": 1524,
        "option1": "2XL",
        "available": true
      }
    ]
  },
  {
    "id": "10997240201356",
    "handle": "racing-trio-jacket-unisex-by-montelino",
    "title": "F1 TRIO FERRARI UNISEX RACING JACKET I DTF by PrintStuff",
    "productType": "Jacket",
    "collections": [
      "jackets"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1349,
    "maxPrice": 1999,
    "description": "F1 TRIO FERRARI UNISEX RACING JACKET I DTF Make this Trio Ferrari F1 jacket the centre of your motorsport-inspired outfit. DTF print detailing gives this unisex layer its graphic finish. Unisex styling DTF print detailing",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_9.jpg?v=1794820007",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-116.jpg?v=1794848146",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-117.jpg?v=1794848148",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-118.jpg?v=1794848149",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-119.jpg?v=1794848150"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "xs",
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863499653260",
        "title": "xs",
        "price": 1349,
        "option1": "xs",
        "available": true
      },
      {
        "id": "63863499686028",
        "title": "s",
        "price": 1349,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863499718796",
        "title": "m",
        "price": 1349,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863499751564",
        "title": "l",
        "price": 1349,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863499784332",
        "title": "xl",
        "price": 1349,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863499817100",
        "title": "2xl",
        "price": 1349,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863499849868",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863499882636",
        "title": "4xl",
        "price": 1899,
        "option1": "4xl",
        "available": true
      },
      {
        "id": "63863499915404",
        "title": "5xl",
        "price": 1999,
        "option1": "5xl",
        "available": true
      },
      {
        "id": "63863499948172",
        "title": "6xl",
        "price": 1999,
        "option1": "6xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240168588",
    "handle": "montelino-tribal-shadow-depth-hoodie-black-heavyweight-puff-print-graphic-hoodie",
    "title": "PrintStuff Tribal Shadow Depth Hoodie (Black) | Heavyweight Puff Print Graphic Hoodie",
    "productType": "Hoodie",
    "collections": [
      "hoodies"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1374,
    "maxPrice": 1374,
    "description": "PrintStuff Tribal Shadow Depth Hoodie (Black) | Heavyweight Puff Print Graphic Hoodie Bring texture to your winter layers with the black Tribal Shadow Depth hoodie. Raised 3D puff-print graphics and a drop-shoulder silhouette give this heavyweight piece its di",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_1.png?v=1794819998",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-1.png?v=1794847986",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-2.png?v=1794847988",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-3.png?v=1794847989",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-4.png?v=1794847990",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-5.png?v=1794847991"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "S",
          "M",
          "L",
          "XL",
          "2XL"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863499489420",
        "title": "S",
        "price": 1374,
        "option1": "S",
        "available": true
      },
      {
        "id": "63863499522188",
        "title": "M",
        "price": 1374,
        "option1": "M",
        "available": true
      },
      {
        "id": "63863499554956",
        "title": "L",
        "price": 1374,
        "option1": "L",
        "available": true
      },
      {
        "id": "63863499587724",
        "title": "XL",
        "price": 1374,
        "option1": "XL",
        "available": true
      },
      {
        "id": "63863499620492",
        "title": "2XL",
        "price": 1374,
        "option1": "2XL",
        "available": true
      }
    ]
  },
  {
    "id": "10997240135820",
    "handle": "aesthetic-white-spider-unisex-hoodie-by-montelino",
    "title": "White Balaclava Aesthetic vintage Hoodi Unisex by PrintStuff",
    "productType": "Hoodie",
    "collections": [
      "hoodies"
    ],
    "isFeatured": false,
    "isCustomTee": false,
    "minPrice": 1799,
    "maxPrice": 1899,
    "description": "White Balaclava Aesthetic vintage Hoodi Unisex Stand out in a lighter colourway with this white Balaclava hoodie. The balaclava-inspired hood brings a distinctive detail to a casual unisex layer. Unisex styling Size & Care Check the available size options befo",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_2.png?v=1794819999",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-43.jpg?v=1794848031",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-44.png?v=1794848031",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-45.png?v=1794848032",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-46.jpg?v=1794848033"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863499260044",
        "title": "s",
        "price": 1799,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863499292812",
        "title": "m",
        "price": 1799,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863499325580",
        "title": "l",
        "price": 1799,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863499358348",
        "title": "xl",
        "price": 1799,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863499391116",
        "title": "2xl",
        "price": 1799,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863499423884",
        "title": "3xl",
        "price": 1799,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863499456652",
        "title": "4xl",
        "price": 1899,
        "option1": "4xl",
        "available": true
      }
    ]
  },
  {
    "id": "10997240070284",
    "handle": "black-balaclava-aesthetic-hoodie-for-men-women-by-montelino",
    "title": "Black Balaclava Aesthetic vintage Hoodi Unisex by PrintStuff",
    "productType": "Hoodie",
    "collections": [
      "hoodies"
    ],
    "isFeatured": true,
    "isCustomTee": false,
    "minPrice": 1649,
    "maxPrice": 1649,
    "description": "Black Balaclava Aesthetic vintage Hoodi Unisex Add a distinctive face-covering hood design to your layers with this black Balaclava hoodie. Its unisex styling and black colourway make it an easy choice for a streetwear-led outfit. Unisex styling Size & Care Ch",
    "images": [
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/montelinoimport20261116_0.jpg?v=1794819997",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-39.jpg?v=1794848028",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-40.jpg?v=1794848029",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-41.jpg?v=1794848030",
      "https://cdn.shopify.com/s/files/1/0805/8817/7548/files/ps-gallery-20261116-42.jpg?v=1794848031"
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "s",
          "m",
          "l",
          "xl",
          "2xl",
          "3xl",
          "4xl"
        ]
      }
    ],
    "variants": [
      {
        "id": "63863498997900",
        "title": "s",
        "price": 1649,
        "option1": "s",
        "available": true
      },
      {
        "id": "63863499030668",
        "title": "m",
        "price": 1649,
        "option1": "m",
        "available": true
      },
      {
        "id": "63863499063436",
        "title": "l",
        "price": 1649,
        "option1": "l",
        "available": true
      },
      {
        "id": "63863499096204",
        "title": "xl",
        "price": 1649,
        "option1": "xl",
        "available": true
      },
      {
        "id": "63863499128972",
        "title": "2xl",
        "price": 1649,
        "option1": "2xl",
        "available": true
      },
      {
        "id": "63863499161740",
        "title": "3xl",
        "price": 1649,
        "option1": "3xl",
        "available": true
      },
      {
        "id": "63863499194508",
        "title": "4xl",
        "price": 1649,
        "option1": "4xl",
        "available": true
      }
    ]
  }
];
