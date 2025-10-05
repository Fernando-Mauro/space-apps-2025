import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FloatingDemoButton } from "./landing/FloatinDemo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space Apps 2025",
  description: "Made for space apps 2025",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FloatingDemoButton/>
      </body>
    </html>
  );
}
