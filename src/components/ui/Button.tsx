import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Size styles
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 py-2 px-4',
    lg: 'h-12 px-6 text-lg',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 shadow-md hover:shadow-lg',
    outline: 'border border-accent-500 text-accent-500 hover:bg-accent-50 hover:text-accent-600',
    ghost: 'text-primary-500 hover:bg-primary-50 hover:text-primary-600',
  };
  
  // Special styles for the concert theme
  const concertStyles = {
    primary: 'bg-concert-highlight text-white hover:bg-opacity-90 shadow-md shadow-concert-highlight/30 hover:shadow-lg hover:shadow-concert-highlight/40',
    secondary: 'bg-concert-glow text-concert-dark hover:bg-opacity-90 shadow-md shadow-concert-glow/30 hover:shadow-lg hover:shadow-concert-glow/40',
    outline: 'border border-concert-glow text-concert-glow hover:bg-concert-glow/10',
    ghost: 'text-concert-glow hover:bg-concert-glow/10',
  };
  
  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${concertStyles[variant]}
        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      
      {icon && !isLoading && <span className="mr-2">{icon}</span>}
      
      {children}
    </button>
  );
};

export default Button;