
import React, { useState, useEffect } from 'react';
import { Tab } from '../types';
import { DEFAULT_TABS, PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '../constants';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { Modal } from './Modal';

interface TabManagerProps {
  tabs: Tab[];
  onTabsUpdate: (tabs: Tab[]) => void;
}

const EMOJI_ICON_OPTIONS = ['🛍️', '🍽️', '☕', '🚌', '🏠', '🎬', '💪', '💊', '🎁', '💡', '💸', '📈', '🔧', '❤️', '✈️', '🐶', '📚', '🎓', '💼', '📊'];
const COLOR_OPTIONS = [
  'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 
  'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500',
  'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500',
  'bg-pink-500', 'bg-rose-500', 'bg-slate-500'
];


export const TabManager: React.FC<TabManagerProps> = ({ tabs, onTabsUpdate }) => {
  const [editingTab, setEditingTab] = useState<Tab | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [tabName, setTabName] = useState('');
  const [tabIcon, setTabIcon] = useState(EMOJI_ICON_OPTIONS[0]);
  const [tabColor, setTabColor] = useState(COLOR_OPTIONS[0]);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (editingTab) {
      setTabName(editingTab.name);
      setTabIcon(editingTab.icon);
      setTabColor(editingTab.color);
      setNameError('');
    } else { // For new tab
      setTabName('');
      setTabIcon(EMOJI_ICON_OPTIONS[0]); // Default icon
      setTabColor(COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)]); // Random color
      setNameError('');
    }
  }, [editingTab, isModalOpen]);

  const handleOpenModal = (tab?: Tab) => {
    setEditingTab(tab || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTab(null); // Clear editing state
  };

  const validateName = (name: string): boolean => {
    if (!name.trim()) {
      setNameError('탭 이름을 입력해주세요.');
      return false;
    }
    if (tabs.some(t => t.name === name.trim() && t.id !== editingTab?.id)) {
      setNameError('이미 사용 중인 탭 이름입니다.');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleSaveTab = () => {
    if (!validateName(tabName)) return;

    const newTab: Tab = {
      id: editingTab ? editingTab.id : Date.now().toString(),
      name: tabName.trim(),
      icon: tabIcon,
      color: tabColor,
    };

    let updatedTabs;
    if (editingTab) {
      updatedTabs = tabs.map(t => t.id === newTab.id ? newTab : t);
    } else {
      updatedTabs = [...tabs, newTab];
    }
    onTabsUpdate(updatedTabs);
    handleCloseModal();
  };

  const handleDeleteTab = (tabId: string) => {
    // Optionally, add a confirmation dialog here
    if (window.confirm("정말로 이 탭을 삭제하시겠습니까? 이 탭으로 분류된 모든 내역은 '미분류' 처리됩니다.")) {
        onTabsUpdate(tabs.filter(t => t.id !== tabId));
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm("모든 탭을 기본값으로 초기화하시겠습니까? 기존 탭과 분류는 사라집니다.")) {
      onTabsUpdate(DEFAULT_TABS);
    }
  };


  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">탭 관리</h2>
        <div className="flex space-x-2">
           <Button onClick={handleResetToDefault} variant="secondary" size="sm">
            기본값 복원
          </Button>
          <Button onClick={() => handleOpenModal()} variant="primary" size="sm">
            <PlusIcon className="w-5 h-5 mr-1" /> 새 탭 추가
          </Button>
        </div>
      </div>

      {tabs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          탭이 없습니다. 새 탭을 추가해보세요!
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tabs.map(tab => (
            <li key={tab.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center justify-between transition-all hover:shadow-xl">
              <div className="flex items-center space-x-3">
                <span className={`text-2xl p-2 rounded-full ${tab.color} text-white`}>{tab.icon}</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">{tab.name}</span>
              </div>
              <div className="space-x-2">
                <Button variant="ghost" size="sm" onClick={() => handleOpenModal(tab)} aria-label={`Edit ${tab.name} tab`}>
                  <PencilIcon className="w-5 h-5 text-blue-500" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteTab(tab.id)} aria-label={`Delete ${tab.name} tab`}>
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTab ? '탭 수정' : '새 탭 추가'}>
        <div className="space-y-5">
          <Input
            label="탭 이름"
            id="tabName"
            value={tabName}
            onChange={(e) => {
              setTabName(e.target.value);
              if (nameError) validateName(e.target.value);
            }}
            placeholder="예: 식비, 교통비"
            error={nameError}
            maxLength={15}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">아이콘</label>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
              {EMOJI_ICON_OPTIONS.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setTabIcon(icon)}
                  className={`p-2 rounded-md text-2xl transition-all ${tabIcon === icon ? 'ring-2 ring-yellow-500 bg-yellow-100 dark:bg-yellow-700' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">색상</label>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
              {COLOR_OPTIONS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setTabColor(color)}
                  className={`w-8 h-8 rounded-full ${color} transition-all ${tabColor === color ? 'ring-2 ring-offset-2 ring-yellow-500 dark:ring-offset-gray-800' : ''}`}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <Button variant="secondary" onClick={handleCloseModal}>취소</Button>
            <Button variant="primary" onClick={handleSaveTab}>저장</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
