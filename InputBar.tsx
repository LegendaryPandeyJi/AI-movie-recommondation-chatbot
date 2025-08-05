import React, { useState } from 'react';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const SendIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);


const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <footer className="bg-brand-bg/80 backdrop-blur-md p-4 border-t border-white/10 mt-auto sticky bottom-0">
      <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-3xl mx-auto">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell me about a movie you want to see..."
          disabled={isLoading}
          className="flex-1 bg-brand-surface border border-white/20 rounded-full px-5 py-3 text-brand-light placeholder-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50 transition-all duration-300"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-brand-primary text-white rounded-full p-3 hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary-hover focus:ring-offset-2 focus:ring-offset-brand-bg disabled:bg-brand-primary/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
          aria-label="Send message"
        >
          <SendIcon className="w-6 h-6"/>
        </button>
      </form>
    </footer>
  );
};

export default InputBar;