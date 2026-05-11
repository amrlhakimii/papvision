import React from 'react';
import { Activity, Bug, Shield, AlertTriangle, AlertCircle } from 'lucide-react';
import { categories } from '../../data/categories';
import type { CategoryId } from '../../types/learning';

const iconMap: Record<string, React.ReactNode> = {
  Activity: <Activity size={20} />,
  Bug: <Bug size={20} />,
  Shield: <Shield size={20} />,
  AlertTriangle: <AlertTriangle size={20} />,
  AlertCircle: <AlertCircle size={20} />
};

interface CategorySidebarProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="w-full lg:w-72 flex-shrink-0 space-y-2">
      <h3 className="text-lg font-display font-semibold text-slate-800 mb-4 px-2">Morphology Categories</h3>
      
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-start gap-3 ${
              isSelected 
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className={`mt-0.5 ${isSelected ? 'text-brand-100' : 'text-brand-500'}`}>
              {iconMap[cat.icon]}
            </div>
            <div>
              <p className={`font-medium ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {cat.title}
              </p>
              <p className={`text-xs mt-1 ${isSelected ? 'text-brand-100' : 'text-slate-500'}`}>
                {cat.imageCount} slides
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
