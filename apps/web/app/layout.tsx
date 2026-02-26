import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masar Platform",
  description: "Training centers platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}
