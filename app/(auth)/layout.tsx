import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import LeftSidebar from "@/components/shared/LeftSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test App",
  description: "Test App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-light-1 flex`}>
        <main className=' flex justify-center items-center w-full h-screen'>
          {children}
        </main>
      </body>
    </html>
  );
}
