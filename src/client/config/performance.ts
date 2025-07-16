export const PERFORMANCE_CONFIG = {
  // Configuration du cache
  cache: {
    maxAge: 7 * 24 * 60 * 60, // 7 jours en secondes
    staleWhileRevalidate: 24 * 60 * 60, // 1 jour en secondes
  },

  // Configuration des images
  images: {
    defaultQuality: 80,
    formats: ['webp', 'avif'],
    sizes: {
      thumbnail: 150,
      small: 300,
      medium: 600,
      large: 1200,
    },
  },

  // Configuration du lazy loading
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px',
  },

  // Configuration de la compression
  compression: {
    gzip: true,
    brotli: true,
    minify: true,
  },

  // Configuration du preload
  preload: {
    critical: [
      '/fonts/main-font.woff2',
      '/css/critical.css',
    ],
    images: [
      '/logo.png',
    ],
  },

  // Configuration du service worker
  serviceWorker: {
    enabled: true,
    cacheName: 'famoustech-cache-v1',
    strategies: {
      static: 'CacheFirst',
      api: 'NetworkFirst',
      images: 'CacheFirst',
    },
  },
}; 