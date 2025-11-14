"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Wand2, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

interface ImageGeneratorProps {
  onGenerate: (prompt: string, numImages: number) => Promise<void>;
  isLoading?: boolean;
}

export function ImageGenerator({
  onGenerate,
  isLoading = false,
}: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [numImages, setNumImages] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Prompt Vazio",
        text: "Por favor, descreva a imagem que deseja gerar.",
        confirmButtonColor: "#667eea",
      });
      return;
    }

    if (prompt.trim().length < 5) {
      Swal.fire({
        icon: "warning",
        title: "Prompt Muito Curto",
        text: "Por favor, forneça uma descrição com pelo menos 5 caracteres.",
        confirmButtonColor: "#667eea",
      });
      return;
    }

    try {
      await onGenerate(prompt, numImages);
      setPrompt("");
      setNumImages(1);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-5 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-purple-200 dark:border-gray-600"
    >
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900 dark:text-white">
          Descreva a imagem que deseja gerar
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={handleTextareaChange}
          placeholder="Ex: Um gato cinzento, fofo, sentado em uma poltrona confortável, luz quente, fotografia profissional..."
          disabled={isLoading}
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-dark placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200 disabled:opacity-50"
          rows={3}
          maxLength={500}
        />
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>Máximo: 500 caracteres</span>
          <span>{prompt.length}/500</span>
        </div>
      </div>

      <div className="space-y-3 m-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            Quantas imagens gerar?
          </label>
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
            {numImages} de 4
          </span>
        </div>

        <div className="space-y-2 mt-3">
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden border border-gray-300 dark:border-gray-500">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(numImages / 4) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <button
            type="button"
            onClick={() => setNumImages(Math.max(1, numImages - 1))}
            disabled={isLoading || numImages === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 transition-colors font-medium"
          >
            −
          </button>

          <div className="flex-1 flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <motion.button
                key={num}
                type="button"
                onClick={() => setNumImages(num)}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  numImages === num
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                } disabled:opacity-50`}
              >
                {num}
              </motion.button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setNumImages(Math.min(4, numImages + 1))}
            disabled={isLoading || numImages === 4}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 transition-colors font-medium"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-3 p-4 mt-3 mb-3 rounded-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-600 border border-purple-200 dark:border-purple-800/50">
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <h3 className="font-bold text-sm tex-white text-white">
            Dicas para melhores resultados:
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex gap-3 items-start">
            <span className="text-lg mt-0.5">🎨</span>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                Seja descritivo
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Adicione detalhes específicos sobre cores, formas e texturas
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-lg mt-0.5">🖼️</span>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                Mencione estilo
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Fotografia, pintura, ilustração, arte digital, etc.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-lg mt-0.5">💡</span>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                Iluminação
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Luz natural, dourada, cinematográfica, luz de neon, etc.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-lg mt-0.5">⭐</span>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                Qualidade
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                4K, 8K, ultra HD, fotografia profissional, high resolution
              </p>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Gerando imagem(ns)...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            Gerar Imagem
            {numImages > 1 && ` (${numImages})`}
          </>
        )}
      </motion.button>

      <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-600">
        <p>Powered by Pollinations.ai (FLUX) • 100% Free • No login required</p>
      </div>
    </motion.form>
  );
}
