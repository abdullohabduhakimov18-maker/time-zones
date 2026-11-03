import React, { useState, useEffect } from 'react';
import { TruckTypeData } from '../data/truckTypesData';
import { Truck } from 'lucide-react';

// Global cache of successfully loaded and decoded image URLs
const loadedImageCache = new Set<string>();

interface TruckImageProps {
  truck: TruckTypeData;
  className?: string;
  containerClassName?: string;
  isTransparentBlend?: boolean;
  isThumbnail?: boolean;
  onLoaded?: () => void;
  alt?: string;
}

export const TruckImage: React.FC<TruckImageProps> = ({
  truck,
  className = 'w-full h-auto object-contain',
  containerClassName = '',
  isTransparentBlend = false,
  isThumbnail = false,
  onLoaded,
  alt
}) => {
  // Determine best image source: tiny WebP thumbnail for step buttons, optimized WebP for main view
  const primarySrc = isThumbnail
    ? (truck.thumbImagePath || `/images/trucks/${truck.id}-thumb.webp`)
    : (truck.webpImagePath || truck.publicImagePath || `/images/trucks/${truck.id}.webp`);

  const fallbackJpg = `/images/trucks/${truck.id}.jpg`;

  const [currentSrc, setCurrentSrc] = useState<string>(primarySrc);
  const [hasError, setHasError] = useState<boolean>(false);
  // If already loaded in memory, render immediately with 0ms delay
  const [isLoaded, setIsLoaded] = useState<boolean>(() => loadedImageCache.has(primarySrc));
  const [triedFallback, setTriedFallback] = useState<boolean>(false);

  useEffect(() => {
    const nextSrc = isThumbnail
      ? (truck.thumbImagePath || `/images/trucks/${truck.id}-thumb.webp`)
      : (truck.webpImagePath || truck.publicImagePath || `/images/trucks/${truck.id}.webp`);

    setCurrentSrc(nextSrc);
    setHasError(false);
    setTriedFallback(false);

    // If this specific URL was already loaded in browser session, display immediately without flashing
    if (loadedImageCache.has(nextSrc)) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [truck.id, isThumbnail, truck.thumbImagePath, truck.webpImagePath, truck.publicImagePath]);

  const handleLoad = () => {
    loadedImageCache.add(currentSrc);
    setIsLoaded(true);
    if (onLoaded) {
      onLoaded();
    }
  };

  const handleError = () => {
    if (!triedFallback) {
      setTriedFallback(true);
      // Fallback from WebP to optimized JPEG or bundled asset
      if (currentSrc !== fallbackJpg) {
        setCurrentSrc(fallbackJpg);
      } else if (truck.realImagePath && currentSrc !== truck.realImagePath) {
        setCurrentSrc(truck.realImagePath);
      } else {
        setHasError(true);
      }
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 text-center select-none ${containerClassName}`}>
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#02a2f0] mb-2">
          <Truck className="w-5 h-5" />
        </div>
        <div className="font-extrabold text-xs text-slate-800">{truck.name}</div>
        <div className="text-[10px] text-slate-400 font-medium mt-0.5">{truck.category}</div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Ultra-light skeleton that disappears the instant the image is cached */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-50/80 flex items-center justify-center z-0 transition-opacity duration-150">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 border-t-[#02a2f0] animate-spin" />
        </div>
      )}

      {/* High-speed image tag */}
      <img
        src={currentSrc}
        alt={alt || `${truck.name} - ${truck.category}`}
        loading="eager"
        decoding="async"
        fetchPriority={isThumbnail ? 'low' : 'high'}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${isTransparentBlend ? 'mix-blend-multiply' : ''}`}
        style={{
          transition: isLoaded ? 'none' : 'opacity 0.15s ease-out'
        }}
      />
    </div>
  );
};
