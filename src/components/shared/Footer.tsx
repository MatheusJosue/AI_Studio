"use client";

import { Container, Row, Col } from "react-bootstrap";
import { BsGithub, BsLightningChargeFill } from "react-icons/bs";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-auto py-4 border-top"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-muted small">
              © {currentYear} AI Studio. Built with{" "}
              <span style={{ color: "#667eea" }}>✨</span>
            </p>
          </Col>
          <Col xs={12} md={6}>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 align-items-center">
              <a
                href="https://groq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none d-flex align-items-center gap-1"
                style={{ color: "#667eea", fontSize: "0.875rem" }}
              >
                <BsLightningChargeFill size={16} />
                <span>Groq API</span>
              </a>
              <span className="text-muted">•</span>
              <a
                href="https://huggingface.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: "#667eea", fontSize: "0.875rem" }}
              >
                HuggingFace
              </a>
              <span className="text-muted">•</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none d-flex align-items-center gap-1"
                style={{ color: "#667eea", fontSize: "0.875rem" }}
              >
                <BsGithub size={16} />
                <span>GitHub</span>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
