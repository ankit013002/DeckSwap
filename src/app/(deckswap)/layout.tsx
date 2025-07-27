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
    <ClerkProvider>
      <>
        <div className="mb-10">
          <Navbar />
        </div>
        <main>{children}</main>
        <footer className="border-t border-white/10 bg-gradient-to-b from-indigo-900 to-purple-900 py-4">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 text-gray-400 md:flex-row">
            <div className="mb-4 text-center md:mb-0 md:text-left">
              <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent">
                DeckSwap
              </span>{" "}
              &copy; {new Date().getFullYear()}. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {["About", "Support", "Terms", "Privacy"].map((label) => (
                <a
                  key={label}
                  href={`/${label.toLowerCase()}`}
                  className="transition-colors duration-200 hover:text-yellow-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </>
    </ClerkProvider>
  );
}
