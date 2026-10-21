export interface SampleLogo {
  id: string;
  name: string;
  category: 'Official Logo' | 'Brand Name' | 'Brand Lockup';
  dataUrl: string;
  defaultWidth: number;
  aspectRatio: number;
}

/**
 * Official Brand Assets directly matching user-provided files:
 * 1st Logo (printstuff (logo).png): Iconic apparel hang tag with Cyan P, Magenta S, and Yellow Drip.
 * 2nd Logo (printstuffL.png): Custom handwritten street graffiti brush-script "PrintStuff" with underline.
 */
export const SAMPLE_LOGOS: SampleLogo[] = [
  {
    id: 'printstuff-tag-logo',
    name: 'PrintStuff Tag Logo',
    category: 'Official Logo',
    defaultWidth: 36,
    aspectRatio: 737 / 783,
    dataUrl: '/brand/printstuff-tag-logo.png'
  },
  {
    id: 'printstuff-graffiti-white',
    name: 'PrintStuff Brand Name (White)',
    category: 'Brand Name',
    defaultWidth: 50,
    aspectRatio: 1136 / 486,
    dataUrl: '/brand/printstuff-wordmark-white.png'
  },
  {
    id: 'printstuff-graffiti-black',
    name: 'PrintStuff Brand Name (Black - 2nd Image)',
    category: 'Brand Name',
    defaultWidth: 50,
    aspectRatio: 1136 / 486,
    dataUrl: '/brand/printstuff-wordmark-black.png'
  },
  {
    id: 'printstuff-full-lockup-white',
    name: 'PrintStuff Official Lockup (White)',
    category: 'Brand Lockup',
    defaultWidth: 56,
    aspectRatio: 1613 / 486,
    dataUrl: '/brand/printstuff-lockup-white.png'
  },
  {
    id: 'printstuff-full-lockup-black',
    name: 'PrintStuff Official Lockup (Black)',
    category: 'Brand Lockup',
    defaultWidth: 56,
    aspectRatio: 1613 / 486,
    dataUrl: '/brand/printstuff-lockup-black.png'
  }
];
