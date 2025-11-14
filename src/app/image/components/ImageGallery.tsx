"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, RotateCcw, Trash2 } from "lucide-react";
import { GeneratedImage } from "@/types";
import Swal from "sweetalert2";

interface ImageGalleryProps {
  images: GeneratedImage[];
  isLoading: boolean;
  onRegenerate?: (prompt: string) => void;
  onDelete?: (id: string) => void;
  onClear?: () => void;
}

export function ImageGallery({
  images,
  isLoading,
  onRegenerate,
  onDelete,
  onClear,
}: ImageGalleryProps) {
  const handleDownload = (image: GeneratedImage) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `image-${image.timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageClick = (image: GeneratedImage) => {
    Swal.fire({
      imageUrl: image.url,
      imageAlt: image.prompt,
      title: "",
      html: `
        <div style="margin-top: 1rem;">
          <p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">${image.prompt}</p>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: '<i class="fa fa-download"></i> Baixar Imagem',
      confirmButtonColor: "#667eea",
      width: "auto",
      customClass: {
        image: "swal-image-viewer",
      },
      didOpen: () => {
        const imageElement = Swal.getImage();
        if (imageElement) {
          imageElement.style.maxWidth = "90vw";
          imageElement.style.maxHeight = "70vh";
          imageElement.style.width = "auto";
          imageElement.style.height = "auto";
          imageElement.style.objectFit = "contain";
          imageElement.style.borderRadius = "8px";
          imageElement.style.margin = "0 auto";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDownload(image);
        Swal.fire({
          icon: "success",
          title: "Download Iniciado!",
          text: "A imagem está sendo baixada.",
          confirmButtonColor: "#667eea",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  if (images.length === 0 && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center h-96 text-center"
      >
        <div>
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Nenhuma imagem gerada
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Use o gerador acima para criar suas primeiras imagens
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 m-5"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Galeria ({images.length})
        </h3>
        {images.length > 0 && (
          <button
            onClick={onClear}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors text-gray-600 dark:text-white hover:text-gray-900 flex items-center gap-2 text-sm"
            title="Limpar galeria"
          >
            <Trash2 className="w-4 h-4" />
            Limpar Tudo
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-square border border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
            >
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleImageClick(image)}
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                <div className="flex gap-2 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image);
                    }}
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-gray-900 transition-colors"
                    title="Baixar imagem"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRegenerate?.(image.prompt);
                    }}
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-gray-900 transition-colors"
                    title="Regenerar"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(image.id);
                    }}
                    className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                    title="Deletar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white text-xs line-clamp-2">
                  {image.prompt}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-square border border-gray-300 dark:border-gray-700 animate-pulse flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">✨</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gerando...
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
