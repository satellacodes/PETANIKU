import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";
import MainLayout from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Petaniku",
  description: "website untuk petani indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={cn("min-h-screen bg-background", poppins.className)}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
