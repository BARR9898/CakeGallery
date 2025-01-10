// src/app/layout.jsx
"use client";  // Marcar este archivo como un componente de cliente

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Usar `next/navigation` en lugar de `next/router`
import localFont from "next/font/local";
import Navbar from "./(shared)/Navbar";
import "./globals.css";

// Fuentes locales
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Layout({ children }) {
  const router = useRouter();  // Ahora usamos `useRouter` de `next/navigation`

  useEffect(() => {
    router.push("/auth/login");  // Redirige al cargar el Layout
  }, [router]);  // Dependencias vacías para ejecutarse solo una vez

  return (
    <html lang="en">
      <body>
        <main className="w-full min-h-screen bg-slate-50">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
