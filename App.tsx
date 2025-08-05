import React, { useState, useCallback } from 'react';
import { ChatMessage, Movie } from './types';
import { INITIAL_MESSAGES } from './constants';
import { getMovieRecommendations } from './services/geminiService';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      content: text,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const movies = await getMovieRecommendations(text);
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'ai',
        content: movies.length > 0 ? movies : "I couldn't find any movie recommendations for that. Could you try being more specific?",
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Sorry, something went wrong. ${errorMessage}`);
      const errorResponseMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'ai',
        content: `Sorry, I'm having trouble connecting. Please try again later.`,
      };
      setMessages(prev => [...prev, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div 
      className="flex flex-col h-screen text-brand-light font-sans"
      style={{
        background: 'radial-gradient(circle at top, rgba(32, 32, 32, 0.5) 0%, #141414 40%)',
      }}
    >
      <Header />
      <ChatWindow messages={messages} isLoading={isLoading} />
      <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
      {error && (
        <div className="text-center text-red-400 p-2 text-sm bg-black/50">
            {`Error: ${error}`}
        </div>
      )}
    </div>
  );
};

export default App;