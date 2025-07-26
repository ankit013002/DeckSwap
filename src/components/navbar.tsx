"use client";

import Link from "next/link";
import { ShoppingCart, CirclePlus } from "lucide-react";
import Image from "next/image";
import {
  RedirectToSignIn,
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
      fetch("/api/createUser", { method: "POST" }).catch((error) =>
        console.error(`Error: ${error}`),
      );
    }
  }, [isLoaded, user]);

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl font-bold text-gray-900"
        >
          <Image
            src="/websiteicon/deckswap.png"
            alt="Website Image"
            width={100}
            height={100}
            className="h-10 w-10"
          />
          DeckSwap
        </Link>

        <ul className="hidden space-x-6 md:flex">
          <li>
            <Link
              href="/mainpage?itemType=card"
              className="hover:text-blue-500"
            >
              Cards
            </Link>
          </li>
          <li>
            <Link href="/accessories" className="hover:text-blue-500">
              Accessories
            </Link>
          </li>
          <li>
            <Link href="/trade" className="hover:text-blue-500">
              Trade
            </Link>
          </li>
          <li>
            <Link href="/sell" className="hover:text-blue-500">
              Sell
            </Link>
          </li>
        </ul>

        <div className="flex items-center justify-around gap-5">
          <SignedOut>
            <SignInButton
              forceRedirectUrl="/createPosting"
              fallbackRedirectUrl="/createPosting"
              signUpFallbackRedirectUrl="/createPosting"
            >
              <button className="relative text-gray-900 hover:text-gray-700">
                <CirclePlus size={24} />
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/createPosting"
              className="relative text-gray-900 hover:text-gray-700"
            >
              <CirclePlus size={24} />
            </Link>
          </SignedIn>
          <Link
            href="/cart"
            className="relative text-gray-900 hover:text-gray-700"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium text-white sm:h-12 sm:px-5 sm:text-base">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
