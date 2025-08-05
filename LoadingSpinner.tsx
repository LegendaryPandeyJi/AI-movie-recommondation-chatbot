import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center space-x-1.5">
        <div className="w-2 h-2 bg-brand-medium rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-brand-medium rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-brand-medium rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingSpinner;