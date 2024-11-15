import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Todos with Docker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
