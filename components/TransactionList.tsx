
import React, { useState, useMemo } from 'react';
import { Transaction, Tab, SortConfig } from '../types';
import { TransactionItem } from './TransactionItem';
import { Input } from './common/Input';
import { Select } from './common/Select';
import { SearchIcon, ChevronUpIcon, ChevronDownIcon } from '../constants';
import { textIncludesQuery } from '../utils/choseong';

interface TransactionListProps {
  transactions: Transaction[];
  tabs: Tab[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (transactionId: string) => void;
  isLoading?: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  tabs,
  onEditTransaction,
  onDeleteTransaction,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTabId, setFilterTabId] = useState<string | 'all'>('all');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({ key: 'date', direction: 'descending' });

  const getTabById = (tabId: string | null): Tab | undefined => tabs.find(t => t.id === tabId);

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    if (filterTabId !== 'all') {
      filtered = filtered.filter(t => t.tabId === filterTabId);
    }

    if (searchTerm) {
      filtered = filtered.filter(t => 
        textIncludesQuery(t.description, searchTerm) || 
        (t.memo && textIncludesQuery(t.memo, searchTerm)) ||
        (getTabById(t.tabId)?.name && textIncludesQuery(getTabById(t.tabId)!.name, searchTerm))
      );
    }

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        // Special handling for date sorting (string comparison works for YYYY-MM-DD)
        // For amount, ensure numeric comparison
        if (sortConfig.key === 'amount' || sortConfig.key === 'createdAt') {
            valA = Number(valA);
            valB = Number(valB);
        } else if (typeof valA === 'string' && typeof valB === 'string') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }


        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        // If values are equal, maintain original relative order or sort by creation time as secondary
        return b.createdAt - a.createdAt; // Secondary sort by newest first
      });
    }
    return filtered;
  }, [transactions, searchTerm, filterTabId, sortConfig, tabs]);

  const requestSort = (key: keyof Transaction) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader: React.FC<{ sortKey: keyof Transaction; label: string; className?: string }> = ({ sortKey, label, className }) => (
    <button
      onClick={() => requestSort(sortKey)}
      className={`font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 ${className}`}
    >
      {label}
      {sortConfig?.key === sortKey && (
        sortConfig.direction === 'ascending' ? <ChevronUpIcon className="inline ml-1 w-3 h-3" /> : <ChevronDownIcon className="inline ml-1 w-3 h-3" />
      )}
    </button>
  );
  
  const tabOptions = [{ value: 'all', label: '모든 탭' }, ...tabs.map(t => ({ value: t.id, label: `${t.icon} ${t.name}` }))]

  if (isLoading) {
    return (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            로딩 중...
        </div>
    );
  }


  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow space-y-3 md:flex md:space-y-0 md:space-x-3 md:items-end">
        <Input
          id="search"
          placeholder="사용처, 메모, 탭 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<SearchIcon className="w-5 h-5 text-gray-400" />}
          className="w-full md:flex-grow"
        />
        <Select
          id="filterTab"
          options={tabOptions}
          value={filterTabId}
          onChange={(e) => setFilterTabId(e.target.value)}
          className="w-full md:w-auto md:min-w-[150px]"
        />
      </div>

      <div className="hidden md:flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <SortableHeader sortKey="description" label="사용처/메모" className="text-left flex-grow"/>
        <SortableHeader sortKey="tabId" label="탭" className="w-24 text-center"/>
        <SortableHeader sortKey="date" label="날짜" className="w-32 text-center"/>
        <SortableHeader sortKey="amount" label="금액" className="w-28 text-right"/>
        <div className="w-20"></div> {/* Placeholder for actions */}
      </div>

      {filteredAndSortedTransactions.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <p className="text-xl mb-2">텅 비었어요! 🐝</p>
          <p>첫 지출 내역을 추가해보세요.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredAndSortedTransactions.map(transaction => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              tab={getTabById(transaction.tabId)}
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
