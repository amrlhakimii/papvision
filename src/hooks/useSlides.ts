import { useState, useEffect } from 'react';
import type { SlideContent } from '../types/learning';
import { getSlides } from '../services/firestoreService';
import { learningSlides as staticSlides } from '../data/learningData';

export const useSlides = () => {
  const [slides, setSlides] = useState<SlideContent[]>(staticSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSlides().then(data => {
      setSlides(data.length > 0 ? data : staticSlides);
    }).catch(() => {
      setSlides(staticSlides);
    }).finally(() => setLoading(false));
  }, []);

  return { slides, loading };
};
