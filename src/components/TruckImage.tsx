import React, { useState, useEffect } from 'react';
import { TruckTypeData } from '../data/truckTypesData';
import { Truck } from 'lucide-react';

interface TruckImageProps {
  truck: TruckTypeData;
  className?: string;
  containerClassName?: string;
  isTransparentBlend?: boolean;
  onLoaded?: () => void;
  alt?: string;
}

export const TruckImage: React.FC<TruckImageProps> = ({
  truck,
  className = 'w-full h-auto object-contain',
  containerClassName = '',
  isTransparentBlend = false,
  onLoaded,
  alt
}) => {
  // Try primary (Vite bundled asset) first, then fallback to static public URL
  const [currentSrc, setCurrentSrc] = useState<string>(truck.publicImagePath || truck.realImagePath);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [triedFallback, setTriedFallback] = useState<boolean>(false);

  useEffect(() => {
    // When truck changes, reset error & loaded state
    setCurrentSrc(truck.publicImagePath || truck.realImagePath);
    setHasError(false);
    setIsLoaded(false);
    setTriedFallback(false);
  }, [truck.id, truck.realImagePath, truck.publicImagePath]);

  const handleError = () => {
    if (!triedFallback) {
      setTriedFallback(true);
      // Try switching between realImagePath and publicImagePath
      if (currentSrc === truck.publicImagePath && truck.realImagePath) {
        setCurrentSrc(truck.realImagePath);
      } else if (truck.publicImagePath) {
        setCurrentSrc(truck.publicImagePath);
      } else {
        setHasError(true);
      }
    } else {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoaded) {
      onLoaded();
    }
  };

  if (hasError) {
    // Elegant SVG fallback with truck details if image completely fails
    return (
      <div className={`flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 text-center select-none ${containerClassName}`}>
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#02a2f0] mb-3">
          <Truck className="w-7 h-7" />
        </div>
        <div className="font-extrabold text-sm text-slate-800">{truck.name}</div>
        <div className="text-xs text-slate-500 font-medium mt-1">{truck.category}</div>
        <div className="mt-2 text-[10px] font-mono font-semibold px-2.5 py-1 bg-white rounded-md border border-slate-200 text-slate-600">
          {truck.length} · {truck.maxCargoWeightLbs.toLocaleString()} lbs Payload
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Loading Skeleton Pulse */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-50 flex items-center justify-center z-0">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 border-t-[#02a2f0] animate-spin" />
            <span>Loading {truck.name.split(' ')[0]} photo...</span>
          </div>
        </div>
      )}

      {/* Main Image */}
      <img
        src={currentSrc}
        alt={alt || `${truck.name} - ${truck.category}`}
        loading="eager"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${isTransparentBlend ? 'mix-blend-multiply' : ''}`}
      />
    </div>
  );
};
