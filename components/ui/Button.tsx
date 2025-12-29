import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-md font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[#2672FA] text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(38,114,250,0.3)] hover:shadow-[0_0_30px_rgba(38,114,250,0.5)]",
    secondary: "bg-[#21CE99] text-black hover:bg-teal-400 shadow-[0_0_20px_rgba(33,206,153,0.3)] hover:shadow-[0_0_30px_rgba(33,206,153,0.5)]",
    outline: "border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};