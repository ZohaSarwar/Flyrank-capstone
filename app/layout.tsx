import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlyRank Capstone",
  description: "Frontend AI Engineering capstone project",
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
