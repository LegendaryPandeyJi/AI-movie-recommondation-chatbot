
export interface Movie {
  title: string;
  year: number;
  genre: string;
  description: string;
  language: string;
  nation: string;
}

export type MessageContent = string | Movie[];

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: MessageContent;
}