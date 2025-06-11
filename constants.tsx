
import React from 'react';

export const APP_NAME = "꿀머니";
export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";
export const GEMINI_CHATBOT_NAME = "꿀머니";

export const DEFAULT_TABS: Tab[] = [
  { id: 'food', name: '식비', icon: '🍔', color: 'bg-red-500' },
  { id: 'transport', name: '교통', icon: '🚌', color: 'bg-blue-500' },
  { id: 'hobby', name: '취미', icon: '🎮', color: 'bg-green-500' },
  { id: 'living', name: '생활', icon: '🏠', color: 'bg-yellow-500' },
  { id: 'etc', name: '기타', icon: '📎', color: 'bg-gray-500' },
];

export const CURRENCY_SYMBOL = "₩";

// SVG Icons (iOS Style - Heroicons like)
interface IconProps {
  className?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

export const ChatBubbleIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.68-3.091a4.501 4.501 0 00-1.547-.322H9.75V9.588a4.5 4.5 0 012.023-3.832M12.75 8.25V6M15 8.25V6.75M17.25 8.25V6.75M12 12.75h.008v.008H12v-.008zM12.75 12.75h.008v.008h-.008v-.008zM10.5 15h.008v.008h-.008v-.008zm.75 0h.008v.008h-.008V15zm1.5 0h.008v.008h-.008V15zm.75 0h.008v.008h-.008V15zM12 15h.008v.008H12V15zm.75 0h.008v.008h-.008V15zm1.5 0h.008v.008h-.008V15z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h.008v.008H8.25V6.75zm.75 0h.008v.008h-.008V6.75zm1.5 0h.008v.008h-.008V6.75zM3 9.75A2.25 2.25 0 015.25 7.5h6a2.25 2.25 0 012.25 2.25v6.173M6 12.75v3.375c0 .621.504 1.125 1.125 1.125h2.25" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.096M9.75 5.25c0-.966.394-1.858 1.006-2.485l.006-.007M9.75 5.25c-.202.263-.388.55-.545.86M14.25 5.25c0-.966-.394-1.858-1.006-2.485l-.006-.007M14.25 5.25c.202.263.388.55.545.86" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export const XMarkIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const BeeIcon: React.FC<IconProps> = ({ className = "w-8 h-8 text-yellow-400" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10.75 3.5V2.25a.75.75 0 00-1.5 0V3.5h.003a7.736 7.736 0 00-4.06 1.763l-.707-.707a.75.75 0 00-1.061 1.061l.707.707A7.712 7.712 0 003.5 10c0 .907.159 1.782.449 2.585l-.707.707a.75.75 0 101.061 1.061l.707-.707A7.736 7.736 0 008.25 15.405V17a.75.75 0 001.5 0v-1.595a7.736 7.736 0 004.06-1.763l.707.707a.75.75 0 101.06-1.06l-.706-.708A7.712 7.712 0 0016.5 10c0-.907-.159-1.782-.449-2.585l.707-.707a.75.75 0 00-1.061-1.061l-.707.707A7.736 7.736 0 0011.75 4.5h-.997zM10 6.625a3.375 3.375 0 100 6.75 3.375 3.375 0 000-6.75z" />
    <path fillRule="evenodd" d="M5.793 4.563A.75.75 0 016.25 4h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.457-.937zM13.25 4a.75.75 0 01.457.937l-.75 1.299a.75.75 0 01-1.3-.75l.75-1.299A.75.75 0 0113.25 4z" clipRule="evenodd" />
  </svg>
);

// Honeycomb pattern for Chatbot background
export const HoneycombBackground: React.FC<{className?: string}> = ({ className }) => (
  <div className={`absolute inset-0 opacity-10 dark:opacity-5 ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="honeycomb" patternUnits="userSpaceOnUse" width="60" height="104" patternTransform="scale(1) rotate(0)">
          <path d="M30 0 L60 17.32 L60 52 L30 69.28 L0 52 L0 17.32 Z M0 52 L30 69.28 L30 103.92 L0 86.6 Z M60 52 L30 69.28 L30 103.92 L60 86.6 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#honeycomb)" />
    </svg>
  </div>
);

import { Tab, ActivePage } from './types';
export const NAV_ITEMS: { page: ActivePage; label: string; icon: React.FC<IconProps> }[] = [
  { page: ActivePage.Home, label: '가계부', icon: HomeIcon },
  { page: ActivePage.Tabs, label: '탭 관리', icon: TagIcon },
  { page: ActivePage.Chat, label: GEMINI_CHATBOT_NAME, icon: ChatBubbleIcon },
];

export const CHO_SUNG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];
