
import React, { useState, useEffect } from 'react';
import { Transaction, Tab } from '../types';
import { Input, TextArea } from './common/Input';
import { Select } from './common/Select';
import { Button } from './common/Button';
import { CURRENCY_SYMBOL } from '../constants';
import { getCurrentDateISO } from '../utils/dateUtils';

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
  onCancel: () => void;
  tabs: Tab[];
  transactionToEdit?: Transaction | null;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, onCancel, tabs, transactionToEdit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getCurrentDateISO());
  const [tabId, setTabId] = useState<string | null>(null);
  const [memo, setMemo] = useState('');
  const [errors, setErrors] = useState<{ description?: string; amount?: string; date?: string }>({});

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(String(transactionToEdit.amount));
      setDate(transactionToEdit.date);
      setTabId(transactionToEdit.tabId);
      setMemo(transactionToEdit.memo || '');
    } else {
      // Reset form for new transaction
      setDescription('');
      setAmount('');
      setDate(getCurrentDateISO());
      setTabId(tabs.length > 0 ? tabs[0].id : null);
      setMemo('');
    }
  }, [transactionToEdit, tabs]);

  const validate = (): boolean => {
    const newErrors: { description?: string; amount?: string; date?: string } = {};
    if (!description.trim()) newErrors.description = '사용처를 입력해주세요.';
    if (!amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = '유효한 금액을 입력해주세요.';
    }
    if (!date) newErrors.date = '날짜를 선택해주세요.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newTransaction: Transaction = {
      id: transactionToEdit ? transactionToEdit.id : Date.now().toString(),
      description,
      amount: parseFloat(amount),
      date,
      tabId,
      memo,
      createdAt: transactionToEdit ? transactionToEdit.createdAt : Date.now(),
    };
    onSubmit(newTransaction);
  };
  
  const tabOptions = tabs.map(tab => ({ value: tab.id, label: `${tab.icon} ${tab.name}` }));
  if (!tabs.find(t => t.id === tabId) && tabs.length > 0) {
      if (!tabId && !transactionToEdit) setTabId(tabs[0].id); // Default to first tab if none selected for new item
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-1">
      <Input
        label="사용처"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="예: 스타벅스 커피"
        error={errors.description}
        required
      />
      <Input
        label={`금액 (${CURRENCY_SYMBOL})`}
        id="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="예: 5000"
        error={errors.amount}
        required
      />
      <Input
        label="날짜"
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={errors.date}
        required
      />
      <Select
        label="분류 (탭)"
        id="tabId"
        value={tabId || ''}
        onChange={(e) => setTabId(e.target.value || null)}
        options={[{value: '', label: '미분류'}, ...tabOptions]}
        
      />
      <TextArea
        label="메모 (선택)"
        id="memo"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="간단한 메모를 남겨보세요"
      />
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" variant="primary">
          {transactionToEdit ? '수정하기' : '추가하기'}
        </Button>
      </div>
    </form>
  );
};
