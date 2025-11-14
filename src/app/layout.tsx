import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RootClientLayout } from "./RootClientLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Studio - Chat & Image Generation",
  description:
    "Fast AI chat with Groq LLaMA and free image generation with HuggingFace",
  keywords: ["AI", "Chat", "Image Generation", "Groq", "LLaMA", "HuggingFace"],
  authors: [{ name: "Matheus Josue" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          <RootClientLayout>{children}</RootClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
