import React, { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', children, ...props }, ref) => {
    const base = 'rounded-2xl bg-white/90 backdrop-blur-sm border border-black/5 overflow-hidden';

    const variants = {
      default:     'shadow-[0_4px_24px_rgba(0,0,0,0.06)]',
      interactive: 'shadow-[0_4px_24px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)] hover:-translate-y-0.5',
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
