
import React from 'react';
import { XMarkIcon } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  let sizeClasses = "max-w-md"; // default md
  if (size === 'sm') sizeClasses = "max-w-sm";
  if (size === 'lg') sizeClasses = "max-w-lg";
  if (size === 'full') sizeClasses = "max-w-full h-full";


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 m-4 w-full ${sizeClasses} transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow`}
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h2 id="modal-title" className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>
        <div>{children}</div>
      </div>
      <style jsx global>{`
        @keyframes modalShow {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalShow {
          animation: modalShow 0.3s forwards;
        }
      `}</style>
    </div>
  );
};
