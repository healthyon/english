
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGeminiStream } from '../services/geminiService';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { PaperAirplaneIcon, BeeIcon, GEMINI_CHATBOT_NAME, HoneycombBackground } from '../constants';
import { LoadingSpinner } from './LoadingSpinner';


export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    // Initial greeting from bot
    setMessages([
      { 
        id: Date.now().toString(), 
        text: `안녕하세요! 저는 당신의 스마트한 소비 비서, ${GEMINI_CHATBOT_NAME}입니다. 무엇을 도와드릴까요? 윙윙! 🐝`, 
        sender: 'bot', 
        timestamp: Date.now() 
      }
    ]);
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: 'user',
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    const botMessageId = (Date.now() + 1).toString(); // Unique ID for bot's streaming message
    setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot', timestamp: Date.now(), isStreaming: true }]);
    
    let fullBotResponse = "";

    await sendMessageToGeminiStream(
      trimmedInput,
      (chunkText) => { // onStreamChunk
        fullBotResponse += chunkText;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: fullBotResponse, isStreaming: true } : msg
        ));
      },
      () => { // onStreamEnd
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: fullBotResponse, isStreaming: false } : msg
        ));
        setIsLoading(false);
        inputRef.current?.focus();
      },
      (errorMessage) => { // onError
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: errorMessage, isStreaming: false, sender: 'bot' } : msg
        ));
        setIsLoading(false);
        inputRef.current?.focus();
      }
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <HoneycombBackground className="text-yellow-400 dark:text-yellow-600" />
      <header className="p-4 bg-yellow-400 dark:bg-yellow-600 text-white shadow-md z-10 sticky top-0">
        <h2 className="text-xl font-semibold flex items-center">
          <BeeIcon className="w-7 h-7 mr-2 text-black" /> {GEMINI_CHATBOT_NAME} AI 챗봇
        </h2>
      </header>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4 relative">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2.5 rounded-2xl shadow ${
                msg.sender === 'user'
                  ? 'bg-yellow-500 text-white rounded-br-none'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">
                {msg.text}
                {msg.isStreaming && <span className="inline-block w-1 h-4 ml-1 bg-gray-500 dark:bg-gray-400 animate-pulse rounded-full"></span>}
              </p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-yellow-100 text-right' : 'text-gray-400 dark:text-gray-500 text-left'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-10 sticky bottom-0">
        <div className="flex items-center space-x-2">
          <Input
            ref={inputRef}
            id="userInput"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={`${GEMINI_CHATBOT_NAME}에게 무엇이든 물어보세요...`}
            className="flex-grow !rounded-full !py-3"
            disabled={isLoading}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button type="submit" variant="primary" size="md" className="!rounded-full !p-3" disabled={isLoading || !userInput.trim()} aria-label="Send message">
            {isLoading ? <LoadingSpinner size="sm" color="text-white" /> : <PaperAirplaneIcon className="w-5 h-5" />}
          </Button>
        </div>
      </form>
    </div>
  );
};
