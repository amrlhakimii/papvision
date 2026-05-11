import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'brand' | 'accent' | 'white' | 'slate';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'brand',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  const colors = {
    brand: 'border-brand-200 border-t-brand-600',
    accent: 'border-accent-200 border-t-accent-600',
    white: 'border-white/30 border-t-white',
    slate: 'border-slate-200 border-t-slate-600',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        className={`animate-spin rounded-full ${sizes[size]} ${colors[color]}`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};
