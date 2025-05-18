import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const webFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${webFont.className} antialiased`}>{children}</body>
    </html>
  );
}
