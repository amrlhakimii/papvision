import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 ${className}`}>
      <div className="w-16 h-16 mb-4 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-display font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-md mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
