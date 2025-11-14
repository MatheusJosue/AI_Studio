"use client";

import { useState, useRef, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { BsSend, BsTrash3Fill, BsDownload } from "react-icons/bs";
import { Message } from "@/types";
import { generateId } from "@/utils/helpers";

interface ChatInputProps {
  onSendMessage: (message: Message) => void;
  isLoading: boolean;
  onClear?: () => void;
  onExport?: (messages: Message[]) => void;
  messages?: Message[];
}

export function ChatInput({
  onSendMessage,
  isLoading,
  onClear,
  onExport,
  messages = [],
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const message: Message = {
        id: generateId(),
        role: "user",
        content: input.trim(),
        timestamp: Date.now(),
      };
      onSendMessage(message);
      setInput("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        150
      )}px`;
    }
  };

  const handleExport = () => {
    if (messages.length === 0) return;

    const text = messages
      .map((msg) => `[${msg.role.toUpperCase()}]\n${msg.content}\n\n`)
      .join("");

    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    onExport?.(messages);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="d-flex gap-2 mb-3">
          <Button
            variant="outline-danger"
            onClick={onClear}
            disabled={isLoading || messages.length === 0}
            className="d-flex align-items-center gap-2"
            size="sm"
            title="Limpar conversa"
          >
            <BsTrash3Fill size={18} />
            <span className="d-none d-sm-inline">Limpar</span>
          </Button>
          <Button
            variant="outline-primary"
            onClick={handleExport}
            disabled={isLoading || messages.length === 0}
            className="d-flex align-items-center gap-2"
            size="sm"
            title="Exportar conversa"
          >
            <BsDownload size={18} />
            <span className="d-none d-sm-inline">Exportar</span>
          </Button>
        </div>

        <InputGroup>
          <Form.Control
            as="textarea"
            ref={inputRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Escreva sua mensagem... (Shift + Enter para nova linha)"
            disabled={isLoading}
            rows={1}
            style={{
              resize: "none",
              maxHeight: "150px",
              minHeight: "50px",
              fontSize: "1rem",
              borderRadius: "12px 0 0 12px",
            }}
            className="border-2"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "0 12px 12px 0",
              minWidth: "60px",
            }}
            className="d-flex align-items-center justify-content-center"
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <BsSend size={20} />
            )}
          </Button>
        </InputGroup>

        <Form.Text className="text-muted d-block mt-2">
          Use <kbd>Shift + Enter</kbd> para quebra de linha
        </Form.Text>
      </Form>
    </div>
  );
}
