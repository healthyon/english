
import React, { useState, useEffect, useCallback } from 'react';
import { ActivePage, Transaction, Tab } from './types';
import { useLocalStorage } from './utils/localStorage';
import { Layout } from './components/Layout';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { TabManager } from './components/TabManager';
import { ChatView } from './components/ChatView';
import { Modal } from './components/Modal';
import { DEFAULT_TABS, APP_NAME } from './constants';

// Placeholder for actual icons. In a real project, these would be image files.
// For the purpose of this example, manifest.json will point to these paths.
// Ensure you have these files in your public/icons directory.
// const ICON_192_PATH = '/icons/icon-192x192.png';
// const ICON_512_PATH = '/icons/icon-512x512.png';
// const MASKABLE_ICON_PATH = '/icons/maskable_icon.png';


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>(ActivePage.Home);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('ggoolmoney-transactions', []);
  const [tabs, setTabs] = useLocalStorage<Tab[]>('ggoolmoney-tabs', DEFAULT_TABS);
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true); // For initial load simulation

  // Simulate initial data loading
  useEffect(() => {
    // Check if API_KEY is set (for Gemini)
    if (!process.env.API_KEY && activePage === ActivePage.Chat) {
        // This is a good place to inform the user if the API key is missing for chat.
        // However, the geminiService already logs an error.
        // We could show a specific UI message if needed.
        console.warn("Gemini API key is not set. Chat functionality might be limited.");
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate loading delay
    return () => clearTimeout(timer);
  }, [activePage]);


  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo(0,0); // Scroll to top on page change
  };

  const handleOpenFormModal = (transaction?: Transaction) => {
    setTransactionToEdit(transaction || null);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setTransactionToEdit(null);
  };

  const handleSaveTransaction = (transaction: Transaction) => {
    setTransactions(prev => {
      if (transactionToEdit) {
        return prev.map(t => t.id === transaction.id ? transaction : t);
      }
      return [...prev, transaction].sort((a,b) => b.createdAt - a.createdAt); // Keep sorted by newest
    });
    handleCloseFormModal();
  };

  const handleDeleteTransaction = (transactionId: string) => {
    if (window.confirm("정말로 이 내역을 삭제하시겠습니까?")) {
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
    }
  };

  const handleTabsUpdate = useCallback((updatedTabs: Tab[]) => {
    setTabs(updatedTabs);
    // When a tab is deleted, transactions associated with it should become 'unclassified' (tabId: null)
    const deletedTabIds = tabs.filter(t => !updatedTabs.find(ut => ut.id === t.id)).map(t => t.id);
    if (deletedTabIds.length > 0) {
      setTransactions(prevTransactions => 
        prevTransactions.map(tx => 
          deletedTabIds.includes(tx.tabId || '') ? { ...tx, tabId: null } : tx
        )
      );
    }
  }, [tabs, setTabs, setTransactions]);


  const renderPage = () => {
    switch (activePage) {
      case ActivePage.Home:
        return (
          <div className="p-4 md:p-6">
            <TransactionList
              transactions={transactions}
              tabs={tabs}
              onEditTransaction={handleOpenFormModal}
              onDeleteTransaction={handleDeleteTransaction}
              isLoading={isLoading}
            />
          </div>
        );
      case ActivePage.Tabs:
        return <TabManager tabs={tabs} onTabsUpdate={handleTabsUpdate} />;
      case ActivePage.Chat:
        return <ChatView />;
      // case ActivePage.Stats:
      //   return <div className="p-4 text-center">통계 기능은 준비 중입니다. 윙윙!</div>;
      default:
        return <div className="p-4 text-center">페이지를 찾을 수 없습니다.</div>;
    }
  };

  return (
    <>
      <Layout 
        activePage={activePage} 
        onNavigate={handleNavigate}
        showAddButton={activePage === ActivePage.Home}
        onAddButtonClick={() => handleOpenFormModal()}
      >
        {renderPage()}
      </Layout>

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={transactionToEdit ? '지출 내역 수정' : '새 지출 내역 추가'}
        size="md"
      >
        <TransactionForm
          onSubmit={handleSaveTransaction}
          onCancel={handleCloseFormModal}
          tabs={tabs}
          transactionToEdit={transactionToEdit}
        />
      </Modal>
    </>
  );
};

export default App;
