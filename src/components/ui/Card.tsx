import React, { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', children, ...props }, ref) => {
    const base = 'rounded-2xl bg-white border border-slate-100 overflow-hidden';

    const variants = {
      default:     'shadow-sm',
      interactive: 'shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5',
      flat:        'shadow-none',
    };

    const paddings = {
      none: '',
      sm:   'p-4',
      md:   'p-5',
      lg:   'p-6',
    };

    return (
      <div
        ref={ref}
        className={`${base} ${variants[variant]} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
