"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "react-bootstrap";
import { Message } from "@/types";
import { formatTime } from "@/utils/helpers";
import { BsPersonCircle, BsRobot, BsClipboard, BsCheck2 } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onScrollToBottom?: () => void;
}

function MessageContent({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="p-3 rounded-3 shadow-sm position-relative"
      style={{
        background: message.role === "user"
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "#ffffff",
        color: message.role === "user" ? "white" : "#212529",
        borderBottomLeftRadius: message.role === "assistant" ? "0" : undefined,
        borderBottomRightRadius: message.role === "user" ? "0" : undefined,
      }}
    >
      {/* Copy Button for Assistant Messages */}
      {message.role === "assistant" && (
        <button
          onClick={handleCopy}
          className="position-absolute top-0 end-0 m-2 btn btn-sm"
          style={{
            background: "rgba(102, 126, 234, 0.1)",
            border: "1px solid rgba(102, 126, 234, 0.2)",
            borderRadius: "8px",
            padding: "4px 8px",
          }}
          title="Copiar mensagem"
        >
          {copied ? (
            <BsCheck2 size={16} style={{ color: "#667eea" }} />
          ) : (
            <BsClipboard size={16} style={{ color: "#667eea" }} />
          )}
        </button>
      )}

      {/* Message text with Markdown */}
      <div
        className="mb-2"
        style={{
          wordBreak: "break-word",
          lineHeight: "1.6",
          fontSize: "0.95rem",
        }}
      >
        {message.role === "assistant" ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                return inline ? (
                  <code
                    className={className}
                    style={{
                      background: "rgba(102, 126, 234, 0.1)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "0.9em",
                      fontFamily: "monospace",
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <pre
                    style={{
                      background: "#1e293b",
                      padding: "1rem",
                      borderRadius: "8px",
                      overflow: "auto",
                      marginTop: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
              a({ node, children, ...props }: any) {
                return (
                  <a
                    {...props}
                    style={{ color: "#667eea", textDecoration: "underline" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                );
              },
              ul({ node, children, ...props }: any) {
                return (
                  <ul style={{ marginLeft: "1.5rem", marginBottom: "0.5rem" }} {...props}>
                    {children}
                  </ul>
                );
              },
              ol({ node, children, ...props }: any) {
                return (
                  <ol style={{ marginLeft: "1.5rem", marginBottom: "0.5rem" }} {...props}>
                    {children}
                  </ol>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        ) : (
          <div style={{ whiteSpace: "pre-wrap" }}>{message.content}</div>
        )}
      </div>

      {/* Timestamp */}
      <div
        className="small"
        style={{
          opacity: 0.7,
          fontSize: "0.75rem",
        }}
      >
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
}

export function ChatMessages({
  messages,
  isLoading,
  onScrollToBottom,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    onScrollToBottom?.();
  }, [messages, isLoading, onScrollToBottom]);

  return (
    <div
      className="flex-grow-1 overflow-auto p-4"
      style={{
        background: "linear-gradient(to bottom, rgba(102, 126, 234, 0.02), transparent)",
        minHeight: "400px"
      }}
    >
      <AnimatePresence mode="popLayout">
        {messages.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="d-flex align-items-center justify-content-center h-100 text-center"
          >
            <div>
              <div style={{ fontSize: "4rem" }} className="mb-3">💬</div>
              <h2 className="h3 fw-bold mb-2">Inicie uma conversa</h2>
              <p className="text-muted">
                Comece digitando uma pergunta ou comando abaixo
              </p>
            </div>
          </motion.div>
        )}

        <div className="d-flex flex-column gap-3">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`d-flex ${
                message.role === "user" ? "justify-content-end" : "justify-content-start"
              }`}
            >
              <div
                className={`d-flex gap-2 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
                style={{ maxWidth: "75%" }}
              >
                {/* Avatar */}
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: message.role === "user"
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                  }}
                >
                  {message.role === "user" ? (
                    <BsPersonCircle size={24} />
                  ) : (
                    <BsRobot size={24} />
                  )}
                </div>

                {/* Message Content */}
                <MessageContent message={message} />
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="d-flex justify-content-start"
            >
              <div className="d-flex gap-2">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                  }}
                >
                  <BsRobot size={24} />
                </div>
                <div className="bg-white p-3 rounded-3 shadow-sm" style={{ borderBottomLeftRadius: "0" }}>
                  <div className="d-flex align-items-center gap-2">
                    <Spinner animation="border" size="sm" style={{ color: "#f5576c" }} />
                    <span className="text-muted small">Pensando...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  );
}
