import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Pour les images prioritaires, préchargement immédiat
    if (priority) {
      const preloadImg = new Image();
      preloadImg.src = src;
      preloadImg.onload = () => {
        setIsLoaded(true);
      };
      preloadImg.onerror = () => {
        setError(true);
      };
    }
  }, [src, priority]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder qui disparaît plus rapidement */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      )}
      
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`w-full h-full transition-opacity duration-200 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          // Force le navigateur à démarrer le téléchargement plus tôt
          contentVisibility: priority ? 'visible' : 'auto',
        }}
      />
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <span className="text-gray-400 text-sm">Image indisponible</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;