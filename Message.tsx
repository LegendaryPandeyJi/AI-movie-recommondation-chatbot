import React from 'react';
import { ChatMessage, Movie } from '../types';
import MovieCard from './MovieCard';

interface MessageProps {
  message: ChatMessage;
}

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-light" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);

const BotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3V21H24V3H0ZM4.5 19.5H3V18H4.5V19.5ZM4.5 6H3V4.5H4.5V6ZM12 19.5C9.24 19.5 6.99999 17.26 6.99999 14.5C6.99999 11.74 9.24 9.50001 12 9.50001C14.76 9.50001 17 11.74 17 14.5C17 17.26 14.76 19.5 12 19.5ZM19.5 19.5H18V18H19.5V19.5ZM19.5 6H18V4.5H19.5V6Z"/>
    </svg>
);

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isMovieList = Array.isArray(message.content);

  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const bubbleClasses = isUser
    ? 'bg-user-bubble text-brand-light rounded-br-none'
    : 'bg-brand-surface text-brand-medium rounded-bl-none';
  const icon = isUser ? <UserIcon /> : <BotIcon />;
  const alignmentClass = isUser ? 'items-end' : 'items-start';

  return (
    <div className={`flex ${containerClasses} max-w-full animate-fade-in-up`}>
        <div className={`flex flex-col ${alignmentClass} w-full md:w-5/6`}>
            <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 p-2 rounded-full ${isUser ? 'bg-user-bubble' : 'bg-brand-surface'}`}>
                    {icon}
                </div>
                <div className={`p-4 rounded-2xl shadow-lg ${bubbleClasses}`}>
                    {isMovieList ? (
                        <div className="space-y-4">
                             <p className="text-lg font-semibold text-brand-light mb-2">Here are some movies you might like:</p>
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(message.content as Movie[]).map((movie, index) => (
                                    <MovieCard key={`${movie.title}-${index}`} movie={movie} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="whitespace-pre-wrap text-base leading-relaxed">{message.content as string}</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Message;