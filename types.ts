
export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  amount: number;
  memo?: string;
  tabId: string | null;
  createdAt: number; // timestamp for sorting
}

export interface Tab {
  id:string;
  name: string;
  icon: string; // Emoji or SVG identifier from constants
  color: string; // Tailwind color class e.g. 'bg-blue-500'
}

export enum ActivePage {
  Home = 'Home',
  Tabs = 'Tabs',
  Chat = 'Chat',
  Stats = 'Stats', // Added for potential future statistics page
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  isStreaming?: boolean;
}

export interface SortConfig {
  key: keyof Transaction;
  direction: 'ascending' | 'descending';
}

// For useLocalStorage hook
export type SetValue<T> = (value: T | ((val: T) => T)) => void;
