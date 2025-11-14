"use client";

import { Header, Footer } from "@/components/shared";
import { ReactNode } from "react";

export function RootClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1" style={{ paddingTop: "80px", paddingBottom: "20px" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
