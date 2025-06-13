"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
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
            <Link href="/cards" className="hover:text-blue-500">
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

          <Link href="profile" className="h-10 w-10 rounded-full bg-red-500">
            <Image
              className="h-full w-full rounded-full"
              src="/images/blue-eyes.jpg"
              alt="Profile Image"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
