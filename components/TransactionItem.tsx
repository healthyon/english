
import React from 'react';
import { Transaction, Tab } from '../types';
import { CURRENCY_SYMBOL, PencilIcon, TrashIcon } from '../constants';
import { formatDate } from '../utils/dateUtils';

interface TransactionItemProps {
  transaction: Transaction;
  tab?: Tab;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, tab, onEdit, onDelete }) => {
  const tabStyle = tab ? `${tab.color} text-white` : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200';
  
  return (
    <li className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-200">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${tabStyle} flex-shrink-0`}>
        {tab ? tab.icon : '💸'}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <p className="font-semibold text-gray-800 dark:text-gray-100 truncate" title={transaction.description}>
            {transaction.description}
          </p>
          <p className="text-sm font-medium text-red-500 dark:text-red-400 whitespace-nowrap">
            {CURRENCY_SYMBOL}{transaction.amount.toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(transaction.date)} {tab ? `· ${tab.name}` : '· 미분류'}
          </p>
        </div>
        {transaction.memo && (
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 italic truncate" title={transaction.memo}>
            {transaction.memo}
          </p>
        )}
      </div>
      <div className="flex space-x-2 flex-shrink-0">
        <button
          onClick={() => onEdit(transaction)}
          className="p-1.5 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          aria-label="Edit transaction"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(transaction.id)}
          className="p-1.5 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          aria-label="Delete transaction"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};
