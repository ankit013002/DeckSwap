"use client";

import { Search } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export function LandingPageForeground() {
  const [query, setQuery] = useState("");

  const submitRequest = () => {
    redirect(`/mainpage?query=${query}`);
  };

  return (
    <div className="relative h-screen">
      <div className="absolute top-6 left-1/2 z-10 -translate-x-1/2">
        <div className="relative inline-block overflow-hidden rounded-full bg-white/10 px-10 py-4 shadow-xl ring-1 ring-white/20 backdrop-blur-md">
          <h1 className="relative z-10 text-8xl font-extrabold text-yellow-300 opacity-75">
            DeckSwap
          </h1>
          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="absolute top-0 -left-full h-full w-[200%] rotate-[25deg] animate-pulse bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-sm" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <label className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 shadow-xl ring-1 ring-white/20 backdrop-blur-md transition duration-300 focus-within:ring-2 focus-within:ring-white hover:bg-white/20">
          <Search className="h-5 w-5 text-white opacity-80" />
          <input
            onKeyDown={(e) => e.key === "Enter" && submitRequest()}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="search"
            placeholder="Search your favorite cards..."
            className="w-64 bg-transparent text-white placeholder-white/60 focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
}
