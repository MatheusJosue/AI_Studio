"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  BsChatDotsFill,
  BsImageFill,
  BsLightningChargeFill,
  BsShieldFillCheck,
  BsStars,
  BsInfinity,
} from "react-icons/bs";

export default function HomePage() {
  const features = [
    {
      icon: <BsLightningChargeFill size={40} />,
      title: "Super Rápido",
      description: "Respostas em tempo real com Groq LLaMA",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: <BsShieldFillCheck size={40} />,
      title: "100% Gratuito",
      description: "Sem limites, sem custos, totalmente livre",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: <BsStars size={40} />,
      title: "IA de Ponta",
      description: "Modelos state-of-the-art para chat e imagens",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];

  const stats = [
    { label: "Modelos de Chat", value: "2+", icon: <BsChatDotsFill size={24} /> },
    { label: "Modelos de Imagem", value: "2+", icon: <BsImageFill size={24} /> },
    { label: "100% Gratuito", value: "∞", icon: <BsInfinity size={24} /> },
    { label: "Sem Limite", value: "∞", icon: <BsStars size={24} /> },
  ];

  return (
    <div className="py-5">
      <Container>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <div
            className="d-inline-flex align-items-center justify-content-center mb-4"
            style={{
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
            }}
          >
            <span style={{ fontSize: "48px" }}>✨</span>
          </div>

          <h1
            className="display-3 fw-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI Studio
          </h1>

          <p className="lead mb-2 text-gray-600 dark:text-gray-400" style={{ fontSize: "1.5rem" }}>
            Sua plataforma completa de IA para{" "}
            <span className="fw-bold" style={{ color: "#667eea" }}>
              conversas inteligentes
            </span>{" "}
            e{" "}
            <span className="fw-bold" style={{ color: "#764ba2" }}>
              geração de imagens
            </span>
          </p>

          <p className="text-muted mb-5">Powered by Groq e HuggingFace</p>

          {/* CTA Buttons */}
          <Row className="justify-content-center g-3 mb-5">
            <Col xs={12} sm={6} md="auto">
              <Link href="/chat" className="text-decoration-none">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="w-100 d-flex align-items-center justify-content-center gap-2 border-0"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                      padding: "12px 32px",
                      borderRadius: "12px",
                    }}
                  >
                    <BsChatDotsFill size={20} />
                    <span>Começar a Conversar</span>
                  </Button>
                </motion.div>
              </Link>
            </Col>
            <Col xs={12} sm={6} md="auto">
              <Link href="/image" className="text-decoration-none">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="w-100 d-flex align-items-center justify-content-center gap-2 border-0"
                    style={{
                      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      boxShadow: "0 10px 30px rgba(240, 147, 251, 0.3)",
                      padding: "12px 32px",
                      borderRadius: "12px",
                    }}
                  >
                    <BsImageFill size={20} />
                    <span>Gerar Imagens</span>
                  </Button>
                </motion.div>
              </Link>
            </Col>
          </Row>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-5"
        >
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="h-100 border-0 shadow-sm"
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Card.Body className="text-center p-4">
                      <div
                        className="d-inline-flex align-items-center justify-content-center mb-3"
                        style={{
                          width: "80px",
                          height: "80px",
                          background: feature.gradient,
                          borderRadius: "16px",
                          color: "white",
                        }}
                      >
                        {feature.icon}
                      </div>
                      <Card.Title className="fw-bold mb-2">{feature.title}</Card.Title>
                      <Card.Text className="text-muted">{feature.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-5"
        >
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col key={index} xs={6} md={3}>
                <Card
                  className="border-0 shadow-sm text-center h-100"
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                  }}
                >
                  <Card.Body className="p-4">
                    <div className="mb-2" style={{ color: "#667eea" }}>
                      {stat.icon}
                    </div>
                    <div
                      className="display-4 fw-bold mb-2"
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-muted small">{stat.label}</div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </div>
  );
}
