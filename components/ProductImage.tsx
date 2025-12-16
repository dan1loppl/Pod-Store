'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface ProductImageProps extends Omit<ImageProps, 'onError' | 'placeholder' | 'blurDataURL'> {
  fallbackText?: string;
}

// Blur placeholder base64 - small purple gradient
const shimmer = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwYTBhMGMiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzFhMWEyMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzBhMGEwYyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=`;

export function ProductImage({ fallbackText = 'Imagem', alt, src, className, ...props }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  if (hasError) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card via-zinc-900 to-accent/5"
        role="img"
        aria-label={alt as string}
      >
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-accent/10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-accent/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-xs text-zinc-600 font-medium line-clamp-2">{fallbackText}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-card via-zinc-900 to-card animate-pulse" />
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={shimmer}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        className={`${className || ''} ${isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'} transition-all duration-500 ease-out`}
      />
    </>
  );
}
