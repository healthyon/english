
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className,
  ...props
}) => {
  const baseStyle = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out inline-flex items-center justify-center";
  
  let variantStyle = "";
  switch (variant) {
    case 'primary':
      variantStyle = "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400";
      break;
    case 'secondary':
      variantStyle = "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:focus:ring-gray-500";
      break;
    case 'danger':
      variantStyle = "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400";
      break;
    case 'ghost':
      variantStyle = "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-yellow-500 focus:ring-yellow-400";
      break;
  }

  let sizeStyle = "";
  switch (size) {
    case 'sm':
      sizeStyle = "px-3 py-1.5 text-sm";
      break;
    case 'md':
      sizeStyle = "px-4 py-2 text-base";
      break;
    case 'lg':
      sizeStyle = "px-6 py-3 text-lg";
      break;
  }

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${widthStyle} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
