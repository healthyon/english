
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, id, error, icon, className, ...props }) => {
  const baseInputClasses = "block w-full px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-yellow-500 dark:focus:border-yellow-500";
  const errorInputClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";
  const iconPadding = icon ? "pl-10" : "";

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`${baseInputClasses} ${error ? errorInputClasses : ''} ${iconPadding} ${className || ''}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, id, error, className, ...props }) => {
  const baseInputClasses = "block w-full px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-yellow-500 dark:focus:border-yellow-500";
  const errorInputClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <textarea
        id={id}
        className={`${baseInputClasses} ${error ? errorInputClasses : ''} ${className || ''}`}
        rows={3}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
