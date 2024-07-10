import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotomono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monkeytype",
  description: "A minimalistic and customizable typing test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotomono.className}>{children}</body>
    </html>
  );
}
