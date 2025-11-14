export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  title: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  base64?: string;
  timestamp: number;
}

export interface ImageGallery {
  images: GeneratedImage[];
}

export type Theme = "light" | "dark";
