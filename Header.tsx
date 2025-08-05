import React from 'react';

const CineBotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3V21H24V3H0ZM4.5 19.5H3V18H4.5V19.5ZM4.5 6H3V4.5H4.5V6ZM12 19.5C9.24 19.5 6.99999 17.26 6.99999 14.5C6.99999 11.74 9.24 9.50001 12 9.50001C14.76 9.50001 17 11.74 17 14.5C17 17.26 14.76 19.5 12 19.5ZM19.5 19.5H18V18H19.5V19.5ZM19.5 6H18V4.5H19.5V6Z"/>
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-brand-bg/80 backdrop-blur-md border-b border-white/10 shadow-xl p-4 flex items-center space-x-3 sticky top-0 z-20">
        <CineBotIcon />
        <h1 className="text-2xl font-bold text-brand-light tracking-tight">
            CineBot
        </h1>
    </header>
  );
};

export default Header;