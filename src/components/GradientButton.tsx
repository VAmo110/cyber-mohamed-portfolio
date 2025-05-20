
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  [x: string]: any;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  className, 
  onClick,
  href,
  target,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  icon,
  type = "button",
  ...props 
}) => {
  // Define different gradient styles
  const gradients = {
    default: "bg-gradient-purple hover:bg-gradient-purple-dark",
    secondary: "bg-gradient-terminal hover:bg-cyber-purple/30",
    outline: "border-2 border-cyber-purple hover:bg-cyber-purple/10",
    ghost: "hover:bg-cyber-purple/10"
  };
  
  // Text color based on variant
  const textColors = {
    default: "text-white",
    secondary: "text-white",
    outline: "text-cyber-purple2",
    ghost: "text-cyber-light hover:text-cyber-purple2"
  };
  
  const buttonClass = cn(
    gradients[variant],
    textColors[variant],
    "font-medium transition-all duration-300 purple-glow hover:shadow-lg",
    disabled && "opacity-60 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {loading && (
        <span className="mr-2 inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (href && !disabled) {
    return (
      <a 
        href={href} 
        target={target || "_self"}
        className={cn(
          "inline-block",
          disabled && "pointer-events-none"
        )}
        {...props}
      >
        <Button 
          className={cn(
            buttonClass,
            "bg-transparent border-none hover:bg-transparent"
          )}
          disabled={disabled}
          size={size}
        >
          {content}
        </Button>
      </a>
    );
  }

  return (
    <Button 
      className={buttonClass}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      size={size}
      type={type}
      {...props}
    >
      {content}
    </Button>
  );
};

export default GradientButton;
