import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import Message from './Message';
import LoadingSpinner from './LoadingSpinner';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <main ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start animate-fade-in-up">
            <div className="flex items-center space-x-4 bg-brand-surface p-3 rounded-2xl rounded-bl-none">
                <LoadingSpinner />
                <span className="text-brand-medium text-sm font-medium">CineBot is thinking...</span>
            </div>
        </div>
      )}
    </main>
  );
};

export default ChatWindow;