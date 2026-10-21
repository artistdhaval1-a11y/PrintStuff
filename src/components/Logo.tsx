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
    ? 'w-7 h-7 shrink-0 drop-shadow-sm'
    : isHeader
    ? 'w-10 h-10 sm:w-12 sm:h-12 shrink-0 drop-shadow-md'
    : 'w-8 h-8 sm:w-10 sm:h-10 shrink-0 drop-shadow-md';

  const wordmarkBoxClass = isSm
    ? 'h-6 max-w-[110px]'
    : isHeader
    ? 'h-8 sm:h-10 min-w-[120px] max-w-[210px] sm:max-w-[260px]'
    : 'h-7 sm:h-8 max-w-[150px] sm:max-w-[180px]';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none shrink-0 ${className}`}>
      {/* 1st Logo: Official PrintStuff Apparel Tag Emblem */}
      <PrintStuffTagLogo className={tagClass} />

      {/* 2nd Logo: Official PrintStuff Wordmark */}
      <div className="flex flex-col justify-center shrink-0">
        <div className="relative flex items-center">
          <PrintStuffWordmark
            className={`${wordmarkBoxClass} flex items-center`}
            color={wordmarkColor}
          />
        </div>

        {showSubtitle && (
          <span className="text-[8.5px] sm:text-[9.5px] font-sans font-bold tracking-[0.22em] text-neutral-400 uppercase -mt-0.5 ml-0.5 whitespace-nowrap">
            Custom Apparel Co.
          </span>
        )}
      </div>
    </div>
  );
};
