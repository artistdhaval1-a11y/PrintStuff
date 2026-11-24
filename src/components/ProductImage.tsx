import React, { useState } from 'react';
import { Shirt } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#ECECE8] text-[#6E6E73] p-4 text-center select-none">
        <Shirt className="w-8 h-8 mb-2 opacity-40" />
        <span className="text-[11px] font-medium leading-tight line-clamp-2 max-w-[140px]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface GarmentHangerProps {
  compact?: boolean;
  isActive?: boolean;
}

export const GarmentHanger: React.FC<GarmentHangerProps> = ({
  compact = false,
  isActive = false,
}) => {
  return (
    <svg
      viewBox="0 0 120 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`mx-auto block shrink-0 transition-transform duration-200 ${
        compact ? 'w-16 h-6' : 'w-24 h-9'
      } ${isActive ? 'scale-105' : ''}`}
    >
      {/* Brushed Chrome Hook */}
      <path
        d="M60 2C54.5 2 51.5 6 52.5 10.5C53.2 13.5 56.8 14.8 59.5 16.5V22"
        stroke="#71717A"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="60" cy="4.2" r="2.2" fill="#A1A1AA" />
      {/* Carved Dark Walnut Wooden Shoulders */}
      <path
        d="M60 21C55 21 20 35 11 40.5C9.2 41.6 10.2 44.5 12.8 44.5H107.2C109.8 44.5 110.8 41.6 109 40.5C100 35 65 21 60 21Z"
        fill="url(#walnutGrad)"
        stroke="#271C15"
        strokeWidth="1.2"
      />
      <defs>
        <linearGradient id="walnutGrad" x1="11" y1="21" x2="109" y2="44.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A2E1B" />
          <stop offset="50%" stopColor="#6D452A" />
          <stop offset="100%" stopColor="#3B2314" />
        </linearGradient>
      </defs>
    </svg>
  );
};
