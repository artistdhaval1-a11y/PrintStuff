import React from 'react';
import { useBrand } from '../context/BrandContext';

interface LogoProps {
  className?: string;
  size?: number | string;
  alt?: string;
}

/**
 * 1st Logo: Official PrintStuff Apparel Tag Logo
 * Features the tilted hanging price tag with bold cyan "P", magenta "S", and yellow drip "T".
 */
export const PrintStuffTagLogo: React.FC<LogoProps & { standalone?: boolean }> = ({
  className = 'w-10 h-10',
  alt = 'PrintStuff Official Apparel Tag Logo',
}) => {
  const { tagLogoUrl } = useBrand();

  return (
    <img
      src={tagLogoUrl}
      alt={alt}
      width={737}
      height={783}
      className={`object-contain select-none pointer-events-none drop-shadow-sm shrink-0 ${className}`}
      referrerPolicy="no-referrer"
      loading="eager"
      decoding="async"
    />
  );
};

// Aliases for 1st Logo
export const PrintStuffLogoMark = PrintStuffTagLogo;

/**
 * 2nd Logo: PrintStuff Brand Name (Wordmark)
 * Renders the uploaded or default brand wordmark with real-time responsive scaling.
 */
export const PrintStuffWordmark: React.FC<
  LogoProps & {
    color?: string;
    underlineColor?: string;
    showUnderline?: boolean;
    style?: React.CSSProperties;
    scaleMultiplier?: number;
  }
> = ({
  className = '',
  color = '#FFFFFF',
  alt = 'PrintStuff',
  style,
  scaleMultiplier = 1,
}) => {
  const { wordmarkUrl, wordmarkDarkUrl, wordmarkScale } = useBrand();

  const isDark = color === '#000000' || color === '#0C0C0E' || color === '#171717';
  const effectiveSrc = isDark ? wordmarkDarkUrl : wordmarkUrl;
  const effectiveScale = wordmarkScale * scaleMultiplier;

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-all ${className}`}
      style={{
        transform: effectiveScale !== 1 ? `scale(${effectiveScale})` : undefined,
        transformOrigin: 'left center',
        ...style,
      }}
    >
      <img
        src={effectiveSrc}
        alt={alt}
        className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none shrink-0"
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
        onError={(e) => {
          // If custom uploaded image fails or is missing, fallback gracefully
          const target = e.currentTarget as HTMLImageElement;
          if (target.src !== '/brand/printstuff-wordmark-white.png') {
            target.src = '/brand/printstuff-wordmark-white.png';
          }
        }}
      />
    </div>
  );
};

// Aliases for 2nd Logo
export const PrintStuffNameLogo = PrintStuffWordmark;
export const PrintStuffWordmarkLogo = PrintStuffWordmark;

/**
 * Combined Official Brand Lockup:
 * 1st Logo (Tag Icon) + 2nd Logo (Wordmark)
 */
export const OfficialBrandLockup: React.FC<{
  className?: string;
  tagClassName?: string;
  wordmarkClassName?: string;
  wordmarkColor?: string;
  showSubtitle?: boolean;
}> = ({
  className = 'h-14',
  tagClassName = 'w-10 h-10 sm:w-12 sm:h-12 shrink-0 drop-shadow-md',
  wordmarkClassName = 'h-7 sm:h-9 max-w-[180px] sm:max-w-[220px]',
  wordmarkColor = '#FFFFFF',
  showSubtitle = false,
}) => {
  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      <PrintStuffTagLogo className={tagClassName} />
      <div className="flex flex-col justify-center shrink-0">
        <PrintStuffWordmark className={wordmarkClassName} color={wordmarkColor} />
        {showSubtitle && (
          <span className="text-[8.5px] font-sans font-semibold tracking-[0.25em] text-neutral-400 uppercase -mt-0.5 ml-1 whitespace-nowrap">
            Custom Apparel Co.
          </span>
        )}
      </div>
    </div>
  );
};
