import type { Category } from '../types/learning';

export const categories: Category[] = [
  {
    id: 'normal',
    title: 'Normal Cervical Cells',
    description: 'Learn to identify normal squamous, columnar, and metaplastic cells in various stages of maturation.',
    imageCount: 5,
    icon: 'Activity'
  },
  {
    id: 'infections',
    title: 'Infectious Organisms',
    description: 'Recognize common vaginal infections including Trichomonas, Candida, HSV, bacterial vaginosis, and Actinomyces.',
    imageCount: 5,
    icon: 'Bug'
  },
  {
    id: 'benign',
    title: 'Benign Cellular Changes',
    description: 'Identify reactive changes associated with inflammation, radiation, IUD usage, and atrophic patterns.',
    imageCount: 4,
    icon: 'Shield'
  },
  {
    id: 'squamous',
    title: 'Squamous Abnormalities',
    description: 'Learn the morphological spectrum from ASC-US and ASC-H through HSIL to Squamous Cell Carcinoma.',
    imageCount: 5,
    icon: 'AlertTriangle'
  },
  {
    id: 'glandular',
    title: 'Glandular Abnormalities',
    description: 'Identify normal endometrial cells, AGC, Adenocarcinoma in Situ, and invasive Adenocarcinoma.',
    imageCount: 4,
    icon: 'AlertCircle'
  }
];
