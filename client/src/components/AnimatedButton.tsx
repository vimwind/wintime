import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: AnimatedButtonProps) {
  const baseClasses = 'font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary',
    secondary: 'bg-secondary text-foreground hover:bg-secondary/80 border-2 border-secondary',
    outline: 'border-2 border-dashed border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:border-solid',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

  const Element = href ? 'a' : 'button';

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <Element
        href={href}
        onClick={onClick}
        className={buttonClasses}
        disabled={disabled}
        type={type}
      >
        {children}
      </Element>
    </motion.div>
  );
}
