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
  backImg: 
…[1 chars truncated — re-run with head/grep/tail for full output]…
d": false,
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
