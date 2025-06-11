
import React from 'react';
import { ChevronDownIcon } from '../../constants';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, id, error, options, className, ...props }) => {
  const baseSelectClasses = "block w-full pl-4 pr-10 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-yellow-500 dark:focus:border-yellow-500";
  const errorSelectClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <div className="relative">
        <select
          id={id}
          className={`${baseSelectClasses} ${error ? errorSelectClasses : ''} ${className || ''}`}
          {...props}
        >
          {props.placeholder && <option value="" disabled>{props.placeholder}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDownIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
