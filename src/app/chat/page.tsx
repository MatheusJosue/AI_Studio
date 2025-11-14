"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Badge } from "react-bootstrap";
import { ChatMessages, ChatInput } from "./components";
import { Message } from "@/types";
import { generateId } from "@/utils/helpers";
import { useChatHistory } from "@/hooks";
import { BsCpu, BsLightningChargeFill } from "react-icons/bs";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState("llama-3.3-70b-versatile");
  const { getHistory, saveMessage, clearHistory } = useChatHistory();

  useEffect(() => {
    const history = getHistory();
    if (Array.isArray(history)) {
      setMessages(history);
    }
  }, []);

  const handleSendMessage = async (userMessage: Message) => {
    setMessages((prev) => [...prev, userMessage]);
    saveMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          model: currentModel,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from chat API");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data:")) {
              const data = line.slice(5).trim();
              if (data === "[DONE]") {
                continue;
              } else if (data) {
                try {
                  const json = JSON.parse(data);
                  if (json.error) {
                    console.error("Error from API:", json.error);
                  } else if (json.content) {
                    fullResponse += json.content;
                    setMessages((prev) => {
                      const updated = [...prev];
                      const lastMsg = updated[updated.length - 1];
                      if (
                        lastMsg?.role === "assistant" &&
                        lastMsg?.id === assistantMessage.id
                      ) {
                        lastMsg.content = fullResponse;
                      }
                      return updated;
                    });
                  }
                } catch (e) {}
              }
            }
          }
        }
      }

      if (fullResponse) {
        assistantMessage.content = fullResponse;
        saveMessage(assistantMessage);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const errorMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: `Error: ${errorMessage}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    if (confirm("Deseja limpar o histórico de conversa?")) {
      setMessages([]);
      clearHistory();
    }
  };

  const modelInfo = {
    "llama-3.3-70b-versatile": { name: "LLaMA 3.3 70B", desc: "Mais Potente" },
    "llama-3.1-8b-instant": { name: "LLaMA 3.1 8B", desc: "Rápido" },
    "mixtral-8x7b-32768": { name: "Mixtral 8x7B", desc: "Versátil" },
  };

  return (
    <Container fluid className="py-4 mt-5">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={8}>
          <Card
            className="shadow-lg border-0"
            style={{
              borderRadius: "20px",
              height: "calc(100vh - 180px)",
              display: "flex",
              flexDirection: "column",
              background:
                "linear-gradient(to bottom, rgba(102, 126, 234, 0.02), rgba(255, 255, 255, 1))",
            }}
          >
            {/* Header com seletor de modelo */}
            <Card.Header
              className="border-0 p-4"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "20px 20px 0 0",
              }}
            >
              <Row className="align-items-center">
                <Col xs={12} md={6} className="mb-3 mb-md-0">
                  <div className="d-flex align-items-center gap-2 text-white">
                    <BsCpu size={28} />
                    <div>
                      <h4 className="mb-0 fw-bold">Chat com IA</h4>
                      <small className="opacity-75">Powered by Groq</small>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="d-flex align-items-center gap-2">
                    <BsLightningChargeFill className="text-white" size={20} />
                    <Form.Select
                      value={currentModel}
                      onChange={(e) => setCurrentModel(e.target.value)}
                      disabled={isLoading || messages.length > 0}
                      className="border-0 shadow-sm"
                    >
                      {Object.entries(modelInfo).map(([key, info]) => (
                        <option
                          key={key}
                          value={key}
                          style={{ color: "#212529" }}
                        >
                          {info.name} - {info.desc}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  {messages.length > 0 && (
                    <div className="text-white mt-2 small opacity-75">
                      <Badge bg="light" text="dark" className="me-1">
                        {messages.length}
                      </Badge>
                      mensagens
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Header>

            {/* Messages */}
            <Card.Body
              className="flex-grow-1 overflow-auto p-0"
              style={{ minHeight: 0 }}
            >
              <ChatMessages messages={messages} isLoading={isLoading} />
            </Card.Body>

            {/* Input */}
            <Card.Footer
              className="border-0 p-4 bg-white"
              style={{ borderRadius: "0 0 20px 20px" }}
            >
              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                onClear={handleClear}
                messages={messages}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
