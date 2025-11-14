"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MessageSquare, Image as ImageIcon, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">✨</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            AI Studio
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/chat"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isActive("/chat")
                ? "bg-blue-100 dark:bg-blue-900 text-white dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Chat
          </Link>
          <Link
            href="/image"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isActive("/image")
                ? "bg-purple-100 dark:bg-purple-900 text-white dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Imagens
          </Link>
        </nav>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-white dark:bg-gray-900 z-40 overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              href="/chat"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/chat")
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">Chat com IA</span>
            </Link>
            <Link
              href="/image"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/image")
                  ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              <span className="font-medium">Gerador de Imagens</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
