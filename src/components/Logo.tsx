import React from 'react';
import { PrintStuffTagLogo, PrintStuffWordmark } from './BrandLogos';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  wordmarkColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'header';
  allowQuickUpload?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showSubtitle = false,
  wordmarkColor = '#FFFFFF',
  size = 'header',
}) => {
  const isHeader = size === 'header' || size === 'lg';
  const isSm = size === 'sm';

  const tagClass = isSm
    ? 'w-7 h-7 shrink-0'
    : isHeader
    ? 'w-9 h-9 sm:w-10 sm:h-10 shrink-0'
    : 'w-8 h-8 sm:w-9 sm:h-9 shrink-0';

  const wordmarkBoxClass = isSm
    ? 'h-6 max-w-[110px]'
    : isHeader
    ? 'h-7 sm:h-8 min-w-[112px] max-w-[170px] sm:max-w-[190px]'
    : 'h-7 sm:h-8 max-w-[150px] sm:max-w-[170px]';

  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none shrink-0 rounded-xl bg-black px-3 py-2 border border-neutral-800 shadow-lg ${className}`}
      aria-label="PrintStuff brand logo"
    >
      <PrintStuffTagLogo className={tagClass} />
      <span className="h-8 w-px bg-neutral-700/80" aria-hidden="true" />
      <div className="flex flex-col justify-center shrink-0">
        <div className="relative flex items-center">
          <PrintStuffWordmark
            className={`${wordmarkBoxClass} flex items-center`}
            color={wordmarkColor}
          />
        </div>
        {showSubtitle && (
          <span className="text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.16em] text-neutral-400 uppercase mt-0.5 whitespace-nowrap">
            Custom Apparel Co.
          </span>
        )}
      </div>
    </div>
  );
};
