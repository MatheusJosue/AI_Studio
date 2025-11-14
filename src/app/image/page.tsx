"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Badge } from "react-bootstrap";
import { ImageGenerator, ImageGallery } from "./components";
import { GeneratedImage } from "@/types";
import { generateId } from "@/utils/helpers";
import { useImageHistory } from "@/hooks";
import { BsImageFill, BsLightningChargeFill } from "react-icons/bs";
import Swal from "sweetalert2";

export default function ImagePage() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAspectRatio, setCurrentAspectRatio] = useState("1:1");
  const { getHistory, saveImage, clearHistory } = useImageHistory();

  useEffect(() => {
    const history = getHistory();
    if (Array.isArray(history)) {
      setImages(history);
    }
  }, []);

  const handleGenerate = async (prompt: string, numImages: number = 1) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/image?n=${numImages}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          aspectRatio: currentAspectRatio,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate image");
      }

      const data = await response.json();

      if (data.success) {
        if (data.images && Array.isArray(data.images)) {
          const newImages: GeneratedImage[] = data.images.map(
            (img: string) => ({
              id: generateId(),
              prompt,
              url: img,
              timestamp: Date.now(),
            })
          );

          setImages((prev) => [...newImages, ...prev]);
          newImages.forEach(saveImage);
        } else if (data.image) {
          const newImage: GeneratedImage = {
            id: generateId(),
            prompt,
            url: data.image,
            timestamp: Date.now(),
          };

          setImages((prev) => [newImage, ...prev]);
          saveImage(newImage);
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      Swal.fire({
        icon: "error",
        title: "Erro ao Gerar Imagem",
        text: errorMessage,
        confirmButtonColor: "#667eea",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = (prompt: string) => {
    handleGenerate(prompt, 1);
  };

  const handleDeleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleClearAll = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Limpar Galeria",
      text: "Deseja realmente limpar toda a galeria?",
      showCancelButton: true,
      confirmButtonColor: "#667eea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, limpar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setImages([]);
      clearHistory();

      Swal.fire({
        icon: "success",
        title: "Galeria Limpa!",
        text: "Todas as imagens foram removidas.",
        confirmButtonColor: "#667eea",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const aspectRatioInfo = {
    "1:1": {
      name: "Quadrado",
      desc: "1:1 (Instagram)",
    },
    "3:4": {
      name: "Vertical 3:4",
      desc: "Retrato",
    },
    "4:3": {
      name: "Horizontal 4:3",
      desc: "Paisagem",
    },
    "9:16": {
      name: "Vertical 9:16",
      desc: "Stories/Reels",
    },
    "16:9": {
      name: "Horizontal 16:9",
      desc: "Widescreen",
    },
  };

  return (
    <Container fluid className="py-3 py-md-4 mt-4 mt-md-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={11} md={10} lg={10} xl={8}>
          <Card
            className="shadow-lg border-0 h-100"
            style={{
              borderRadius: "20px",
              minHeight: "calc(100vh - 160px)",
              maxHeight: "calc(100vh - 100px)",
              display: "flex",
              flexDirection: "column",
              background:
                "linear-gradient(to bottom, rgba(102, 126, 234, 0.02), rgba(255, 255, 255, 1))",
            }}
          >
            <Card.Header
              className="border-0 p-3 p-md-4"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "20px 20px 0 0",
              }}
            >
              <Row className="align-items-center">
                <Col xs={12} md={6} className="mb-2 mb-md-0">
                  <div className="d-flex align-items-center gap-2 text-white">
                    <BsImageFill size={20} className="d-md-none" />
                    <BsImageFill size={28} className="d-none d-md-block" />
                    <div>
                      <h5 className="mb-0 fw-bold d-md-none">Gerador</h5>
                      <h4 className="mb-0 fw-bold d-none d-md-block">
                        Gerador de Imagens
                      </h4>
                      <small className="opacity-75 d-none d-md-block">
                        Powered by Pollinations.ai (FLUX - 100% Free)
                      </small>
                      <small className="opacity-75 d-md-none">
                        Gerador de Imagens
                      </small>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                    <div className="d-flex align-items-center gap-1">
                      <BsLightningChargeFill
                        className="text-white d-none d-md-block"
                        size={20}
                      />
                      <BsLightningChargeFill
                        className="text-white d-md-none"
                        size={16}
                      />
                      <Form.Select
                        value={currentAspectRatio}
                        onChange={(e) => setCurrentAspectRatio(e.target.value)}
                        disabled={isLoading}
                        className="border-0 shadow-sm flex-grow-1"
                        style={{ maxWidth: "100%" }}
                      >
                        {Object.entries(aspectRatioInfo).map(([key, info]) => (
                          <option key={key} value={key}>
                            {info.name} - {info.desc}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                    {images.length > 0 && (
                      <div className="text-white mt-2 mt-md-0 small opacity-75 d-flex align-items-center">
                        <Badge bg="light" text="dark" className="me-1">
                          {images.length}
                        </Badge>
                        <span className="d-none d-md-inline">
                          imagens geradas
                        </span>
                        <span className="d-md-none">img</span>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body
              className="flex-grow-1 overflow-auto p-3 p-md-4"
              style={{ minHeight: 0 }}
            >
              <div className="h-100 d-flex flex-column gap-3 gap-md-4">
                <div>
                  <ImageGenerator
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                  />
                </div>

                <div className="flex-grow-1">
                  <ImageGallery
                    images={images}
                    isLoading={isLoading}
                    onRegenerate={handleRegenerate}
                    onDelete={handleDeleteImage}
                    onClear={handleClearAll}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
