
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  [x: string]: any;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  className, 
  onClick,
  href,
  target,
  ...props 
}) => {
  const buttonClass = cn(
    "bg-gradient-purple hover:bg-gradient-purple-dark text-white font-medium transition-all duration-300 purple-glow hover:shadow-lg",
    className
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={target || "_self"}
        className={cn(
          "inline-block",
          buttonClass
        )}
        {...props}
      >
        <Button 
          className={cn(
            "bg-transparent border-none hover:bg-transparent",
            className
          )}
        >
          {children}
        </Button>
      </a>
    );
  }

  return (
    <Button 
      className={buttonClass}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
