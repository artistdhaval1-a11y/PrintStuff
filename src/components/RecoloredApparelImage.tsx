import React, { useEffect, useState, useRef } from 'react';
import { ProductColor } from '../types';

interface RecoloredApparelImageProps {
  src: string;
  productId: string;
  view: 'front' | 'back';
  color: ProductColor;
  className?: string;
  alt: string;
}

// In-memory cache for processed canvas data URLs: key = `${src}_${color.hex}`
const imageCache = new Map<string, string>();

// In-memory cache for garment segmentation masks: key = src
const maskCache = new Map<string, { mask: Float32Array; w: number; h: number }>();

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export const RecoloredApparelImage: React.FC<RecoloredApparelImageProps> = ({
  src,
  productId,
  view,
  color,
  className = '',
  alt
}) => {
  const [renderedSrc, setRenderedSrc] = useState<string>(src);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const isOriginalBlack =
    color.isOriginalPhotoColor ||
    color.hex.toLowerCase() === '#111111' ||
    color.hex.toLowerCase() === '#000000' ||
    color.name.toLowerCase().includes('black');

  useEffect(() => {
    // 1. If Original Black or no color change requested, show master photography directly
    if (isOriginalBlack) {
      setRenderedSrc(src);
      setIsProcessing(false);
      return;
    }

    // 2. Check in-memory image cache
    const cacheKey = `${src}_${color.hex}`;
    if (imageCache.has(cacheKey)) {
      setRenderedSrc(imageCache.get(cacheKey)!);
      setIsProcessing(false);
      return;
    }

    // 3. Process garment recoloring preserving fabric texture, folds, and neutral background shadows
    setIsProcessing(true);
    let isCancelled = false;

    const processRecolor = async () => {
      try {
        let imgSource: ImageBitmap | HTMLImageElement;

        // Try modern createImageBitmap with fetch for clean same-origin access
        try {
          const response = await fetch(src);
          const blob = await response.blob();
          imgSource = await createImageBitmap(blob);
        } catch {
          // Fallback to standard Image loading
          imgSource = await new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
          });
        }

        if (isCancelled || !isMountedRef.current) return;

        const w = ('naturalWidth' in imgSource ? imgSource.naturalWidth : imgSource.width) || 896;
        const h = ('naturalHeight' in imgSource ? imgSource.naturalHeight : imgSource.height) || 1200;

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          if (isMountedRef.current) {
            setRenderedSrc(src);
            setIsProcessing(false);
          }
          return;
        }

        ctx.drawImage(imgSource, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // Obtain or compute the perimeter-segmented garment mask
        let maskEntry = maskCache.get(src);
        if (!maskEntry || maskEntry.w !== w || maskEntry.h !== h) {
          const isCap = productId === 'cap' || productId.includes('cap');
          const bgThreshold = isCap ? 64 : 56;

          // Perimeter BFS flood-fill to identify background floor and cast shadows
          const visited = new Uint8Array(w * h);
          const queue = new Int32Array(w * h * 2);
          let qHead = 0;
          let qTail = 0;

          // Seed perimeter
          for (let x = 0; x < w; x++) {
            queue[qTail++] = x;
            queue[qTail++] = 0;
            queue[qTail++] = x;
            queue[qTail++] = h - 1;
            visited[x] = 1;
            visited[(h - 1) * w + x] = 1;
          }
          for (let y = 0; y < h; y++) {
            queue[qTail++] = 0;
            queue[qTail++] = y;
            queue[qTail++] = w - 1;
            queue[qTail++] = y;
            visited[y * w] = 1;
            visited[y * w + (w - 1)] = 1;
          }

          while (qHead < qTail) {
            const cx = queue[qHead++];
            const cy = queue[qHead++];

            // Check 4 neighbors
            const n1 = cy * w + (cx + 1);
            if (cx + 1 < w && !visited[n1]) {
              const p = n1 * 4;
              if (0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2] > bgThreshold) {
                visited[n1] = 1;
                queue[qTail++] = cx + 1;
                queue[qTail++] = cy;
              }
            }
            const n2 = cy * w + (cx - 1);
            if (cx - 1 >= 0 && !visited[n2]) {
              const p = n2 * 4;
              if (0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2] > bgThreshold) {
                visited[n2] = 1;
                queue[qTail++] = cx - 1;
                queue[qTail++] = cy;
              }
            }
            const n3 = (cy + 1) * w + cx;
            if (cy + 1 < h && !visited[n3]) {
              const p = n3 * 4;
              if (0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2] > bgThreshold) {
                visited[n3] = 1;
                queue[qTail++] = cx;
                queue[qTail++] = cy + 1;
              }
            }
            const n4 = (cy - 1) * w + cx;
            if (cy - 1 >= 0 && !visited[n4]) {
              const p = n4 * 4;
              if (0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2] > bgThreshold) {
                visited[n4] = 1;
                queue[qTail++] = cx;
                queue[qTail++] = cy - 1;
              }
            }
          }

          // Build smooth antialiased 3x3 boundary mask
          const mask = new Float32Array(w * h);
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              const idx = y * w + x;
              if (visited[idx] === 0) {
                let sum = 0;
                for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                    if (visited[(y + dy) * w + (x + dx)] === 0) sum++;
                  }
                }
                mask[idx] = sum / 9.0;
              }
            }
          }

          maskEntry = { mask, w, h };
          maskCache.set(src, maskEntry);
        }

        const garmentMask = maskEntry.mask;
        const target = hexToRgb(color.hex);
        const isTargetWhite = target.r > 210 && target.g > 210 && target.b > 210;

        // Apply realistic textile lighting to masked garment pixels
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            const alpha = garmentMask[idx];
            if (alpha <= 0.01) continue;

            const pIdx = idx * 4;
            const r = data[pIdx];
            const g = data[pIdx + 1];
            const b = data[pIdx + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            // Preserve buttons, metal zippers, or strong non-fabric specular highlights
            if (lum > 140) continue;

            let nr: number;
            let ng: number;
            let nb: number;

            if (isTargetWhite) {
              // Realistic white apparel with authentic textile fold shading
              const norm = Math.min(1.0, Math.max(0, lum / 42.0));
              const whiteVal = 175 + 72 * Math.pow(norm, 0.82);
              nr = Math.min(255, Math.round(whiteVal));
              ng = Math.min(255, Math.round(whiteVal));
              nb = Math.min(255, Math.round(whiteVal + 2));
            } else {
              // Modulate target dyed fabric maintaining depth in shadows and soft fabric sheen
              const lightFactor = Math.pow(Math.max(0.12, lum / 30.0), 0.85);
              const sheen = Math.max(0, (lum - 36) * 0.35);
              nr = Math.min(255, Math.round(target.r * lightFactor + sheen));
              ng = Math.min(255, Math.round(target.g * lightFactor + sheen));
              nb = Math.min(255, Math.round(target.b * lightFactor + sheen));
            }

            // Antialiased edge blend
            data[pIdx] = Math.round(r * (1 - alpha) + nr * alpha);
            data[pIdx + 1] = Math.round(g * (1 - alpha) + ng * alpha);
            data[pIdx + 2] = Math.round(b * (1 - alpha) + nb * alpha);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const recoloredUrl = canvas.toDataURL('image/jpeg', 0.92);

        imageCache.set(cacheKey, recoloredUrl);

        if (isMountedRef.current && !isCancelled) {
          setRenderedSrc(recoloredUrl);
          setIsProcessing(false);
        }
      } catch (err) {
        console.warn('Recolor fallback to original:', err);
        if (isMountedRef.current && !isCancelled) {
          setRenderedSrc(src);
          setIsProcessing(false);
        }
      }
    };

    processRecolor();

    return () => {
      isCancelled = true;
    };
  }, [src, color.hex, color.name, isOriginalBlack, productId, view]);

  return (
    <img
      src={renderedSrc}
      alt={alt}
      className={`${className} transition-opacity duration-200 ${isProcessing ? 'opacity-90' : 'opacity-100'}`}
      loading="eager"
    />
  );
};
