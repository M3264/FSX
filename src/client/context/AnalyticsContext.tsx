import React, { createContext, useContext, ReactNode } from 'react';

let ReactGA: typeof import('react-ga') | undefined = undefined;
if (typeof window !== 'undefined') {
  ReactGA = require('react-ga');
}

// Types pour les événements
interface TrackEventProps {
  category: string;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

interface TrackExceptionProps {
  description: string;
  fatal: boolean;
}

interface TrackTimingProps {
  category: string;
  variable: string;
  value: number;
  label?: string;
}

// Interface du contexte
interface AnalyticsContextType {
  trackPageView: (path: string) => void;
  trackEvent: (params: TrackEventProps) => void;
  trackException: (params: TrackExceptionProps) => void;
  trackTiming: (params: TrackTimingProps) => void;
  trackNavigationClick: (label: string) => void;
  trackExternalLinkClick: (label: string, url?: string) => void;
}

// Création du contexte
const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

// Props du provider
interface AnalyticsProviderProps {
  children: ReactNode;
}

// Provider component
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  // Méthodes de suivi
  const trackPageView = (path: string) => {
    if (ReactGA) {
      ReactGA.pageview(path);
    }
  };

  const trackEvent = ({ category, action, label, value, nonInteraction }: TrackEventProps) => {
    if (ReactGA) {
      ReactGA.event({
        category,
        action,
        label,
        value,
        nonInteraction
      });
    }
  };

  const trackException = ({ description, fatal }: TrackExceptionProps) => {
    if (ReactGA) {
      ReactGA.exception({
        description,
        fatal
      });
    }
  };

  const trackTiming = ({ category, variable, value, label }: TrackTimingProps) => {
    if (ReactGA) {
      ReactGA.timing({
        category,
        variable,
        value,
        label
      });
    }
  };

  // Raccourcis pratiques pour les cas d'utilisation communs
  const trackNavigationClick = (label: string) => {
    trackEvent({
      category: 'Navigation',
      action: 'Clic',
      label
    });
  };

  const trackExternalLinkClick = (label: string, url?: string) => {
    trackEvent({
      category: 'Lien externe',
      action: 'Clic',
      label: url ? `${label} (${url})` : label
    });
  };

  const value = {
    trackPageView,
    trackEvent,
    trackException,
    trackTiming,
    trackNavigationClick,
    trackExternalLinkClick
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics doit être utilisé à l\'intérieur d\'un AnalyticsProvider');
  }
  return context;
};

export default AnalyticsProvider; 