// components/Navbar.tsx
"use client";

import Link from "next/link";
import { ShoppingCart, CirclePlus } from "lucide-react";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useEffect } from "react";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      fetch("/api/createUser", { method: "POST" }).catch(console.error);
    }
  }, [isLoaded, user]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-gradient-to-br from-purple-900/80 to-indigo-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/websiteicon/deckswap.png"
            alt="DeckSwap logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent">
            DeckSwap
          </span>
        </Link>

        <ul className="hidden space-x-6 md:flex">
          {[
            ["Cards", "/mainpage?itemType=card"],
            ["Accessories", "/accessories"],
            ["Trade", "/trade"],
            ["Sell", "/sell"],
          ].map(([label, href]) => (
            <li key={label}>
              <Link
                href={href ?? "/mainpage"}
                className="text-gray-200 transition-colors duration-200 hover:text-yellow-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <button className="rounded-full p-2 text-gray-200 transition hover:bg-white/10 hover:text-white">
                <CirclePlus size={24} />
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/createPosting"
              className="rounded-full p-2 text-gray-200 transition hover:bg-white/10 hover:text-white"
            >
              <CirclePlus size={24} />
            </Link>
          </SignedIn>

          <Link href="/cart" className="relative p-2">
            <ShoppingCart
              size={24}
              className="text-gray-200 transition-colors hover:text-white"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>

          <SignedOut>
            <SignInButton>
              <button className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-white transition hover:opacity-90">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-white transition hover:opacity-90">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "ring ring-yellow-400",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
