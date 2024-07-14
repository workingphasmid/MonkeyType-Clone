import type { Metadata } from "next";
import { Roboto_Mono, Lexend_Deca } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
      <body className={`${robotomono.className} bg-bg-color py-8 lg:container`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
