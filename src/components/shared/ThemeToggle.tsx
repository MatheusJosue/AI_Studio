"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { useThemeSafe } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const context = useThemeSafe();

  if (!context || !context.mounted) {
    return (
      <button
        disabled
        className="position-relative d-inline-flex align-items-center justify-content-center"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
          cursor: "not-allowed",
          overflow: "hidden",
        }}
        aria-label="Loading theme"
      >
        <BsSunFill size={24} color="white" />
      </button>
    );
  }

  const { theme, toggleTheme } = context;

  return (
    <motion.button
      onClick={toggleTheme}
      className="position-relative d-inline-flex align-items-center justify-content-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        border: "none",
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        boxShadow:
          theme === "dark"
            ? "0 4px 12px rgba(102, 126, 234, 0.3)"
            : "0 4px 12px rgba(240, 147, 251, 0.3)",
        cursor: "pointer",
        overflow: "hidden",
      }}
      aria-label="Toggle theme"
      title={
        theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -180, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="position-absolute"
          >
            <BsSunFill size={24} color="white" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 180, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -180, opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="position-absolute"
          >
            <BsMoonStarsFill size={24} color="white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
