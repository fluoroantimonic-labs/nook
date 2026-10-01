import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nook — Cozy Focus Space",
  description: "A cozy focus & study space with lo-fi music, ambient sounds, and animated landscapes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}