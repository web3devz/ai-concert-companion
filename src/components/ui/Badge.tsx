import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className = '' 
}) => {
  const variantClasses = {
    default: 'bg-gray-700 text-gray-200',
    primary: 'bg-primary-700 text-primary-100',
    secondary: 'bg-secondary-700 text-secondary-100',
    accent: 'bg-accent-700 text-accent-100',
    success: 'bg-green-700 text-green-100',
    warning: 'bg-yellow-700 text-yellow-100',
    error: 'bg-red-700 text-red-100',
  };
  
  // Concert-themed badges
  const concertClasses = {
    default: 'bg-gray-700 text-gray-200',
    primary: 'bg-concert-highlight text-white',
    secondary: 'bg-concert-glow text-concert-dark',
    accent: 'bg-accent-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-black',
    error: 'bg-red-600 text-white',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        ${concertClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;