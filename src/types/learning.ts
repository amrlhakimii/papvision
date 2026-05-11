export type CategoryId = 'normal' | 'infections' | 'benign' | 'squamous' | 'glandular';

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
  imageCount: number;
  icon: string; // lucide icon name
}

export interface MorphologyCue {
  id: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  title: string;
  description: string;
}

export interface SlideContent {
  id: string;
  categoryId: CategoryId;
  title: string;
  imageUrl: string;
  cellularFeatures: string[];
  nuclearFeatures: string[];
  backgroundFeatures: string[];
  diagnosticNotes: string;
  clinicalRelevance: string;
  cues: MorphologyCue[];
}
