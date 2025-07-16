import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../context/AnalyticsContext';

/**
 * Hook pour mesurer le temps passé sur une page
 */
export const usePageViewTiming = () => {
  const { trackTiming } = useAnalytics();
  const location = useLocation();
  const startTimeRef = useRef<number>(Date.now());
  const pathRef = useRef<string>(location.pathname);

  useEffect(() => {
    // Réinitialise le temps au changement de page
    startTimeRef.current = Date.now();
    pathRef.current = location.pathname;

    // Mesure le temps passé sur la page quand l'utilisateur quitte
    return () => {
      const timeSpent = Date.now() - startTimeRef.current;
      if (timeSpent > 1000) { // Ignorer les redirections trop rapides
        trackTiming({
          category: 'Page',
          variable: 'Temps passé',
          value: timeSpent,
          label: pathRef.current,
        });
      }
    };
  }, [location.pathname, trackTiming]);
};

export default usePageViewTiming; 