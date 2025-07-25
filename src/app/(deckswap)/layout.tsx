import "~/styles/globals.css";

import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist } from "next/font/google";
import Navbar from "~/components/navbar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar cartCount={3} />
      <main>{children}</main>
      <footer className="flex justify-center bg-transparent py-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DeckSwap. All rights reserved.
        </p>
      </footer>
    </>
  );
}
