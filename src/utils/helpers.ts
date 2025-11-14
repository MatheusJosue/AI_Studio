import { Message } from "@/types";

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("pt-BR");
}

export function extractCodeBlocks(text: string): Array<{ lang: string; code: string }> {
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  const blocks = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    blocks.push({
      lang: match[1] || "text",
      code: match[2].trim(),
    });
  }

  return blocks;
}

export function truncateText(text: string, maxLength: number = 100): string {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export function getChatTitle(messages: Message[]): string {
  if (messages.length === 0) return "Nova conversa";
  const firstMessage = messages[0].content;
  return truncateText(firstMessage, 50);
}
