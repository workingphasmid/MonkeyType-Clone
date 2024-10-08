import type { Metadata } from "next";
import { Roboto_Mono, Lexend_Deca } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const robotomono = Roboto_Mono({ subsets: ["latin"] });
export const lexenddeca = Lexend_Deca({ subsets: ["latin"] });

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
      <body
        className={`${robotomono.className} flex h-screen flex-col bg-bg-color px-16 pb-6 pt-8`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
