"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Sparkles,
  TrendingUp,
  Shield,
  Users,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { LandingPageCardBackground } from "./landingPageCardBackground";
import { LandingPageForeground } from "./landingPageForeground";
import Link from "next/link";
import dynamic from "next/dynamic";

const ParticleEffect = dynamic(() => import("./ParticleEffect"), {
  ssr: false,
});

export default function DeckSwapLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Discover Rare Cards",
      description:
        "Find the most coveted cards from every set, with real-time pricing and market insights.",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Market Analytics",
      description:
        "Track price trends, monitor your collection's value, and make informed trading decisions.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Trading",
      description:
        "Trade with confidence using our verified seller program and buyer protection guarantee.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description:
        "Connect with collectors worldwide, share your collection, and join exclusive trading groups.",
    },
  ];

  const stats = [
    { number: "2.5M+", label: "Cards Listed" },
    { number: "500K+", label: "Active Traders" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "$10M+", label: "Cards Traded" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <section className="relative h-screen w-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-0">
            <div className="h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <LandingPageCardBackground />
            </div>
          </div>
        </div>
        <div className="absolute h-screen w-screen">
          <LandingPageForeground />
        </div>

        <ParticleEffect />

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform">
          <div className="animate-bounce">
            <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
              <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/50" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <div className="flex flex-col gap-y-10">
              <div>
                <h2 className="mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-6xl font-bold text-transparent">
                  Why Choose DeckSwap?
                </h2>

                <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
                  The ultimate destination for collectors and traders.
                  Experience the future of card trading with cutting-edge
                  technology and unmatched security.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-white/30 hover:shadow-2xl"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="mb-4 transform text-yellow-400 transition-transform duration-300 group-hover:scale-110">
                        {feature.icon}
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-yellow-300">
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center">
                <div className="mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-5xl font-bold text-transparent transition-transform duration-300 group-hover:scale-110 lg:text-6xl">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative">
            <h2 className="mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-6xl font-bold text-transparent">
              Ready to Level Up Your Collection?
            </h2>
            <p className="mb-12 text-2xl leading-relaxed text-gray-300">
              Join thousands of collectors who trust DeckSwap for their trading
              needs.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link
                href="/mainpage"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-12 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Trading Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>

              <button className="group rounded-full border-2 border-white/30 px-12 py-4 text-lg font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10">
                <span className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  View Premium Features
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl" />
          <div
            className="absolute top-1/3 right-1/4 h-80 w-80 animate-pulse rounded-full bg-yellow-500/10 blur-3xl"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </section>

      <footer className="relative border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-8 flex items-center gap-2 md:mb-0">
              <Zap className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold">DeckSwap</span>
            </div>

            <div className="flex flex-wrap gap-8 text-gray-400">
              <a href="#" className="transition-colors hover:text-white">
                About
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Support
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Privacy
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8 text-center text-gray-500">
            <p>
              &copy; 2025 DeckSwap. All rights reserved. Built for collectors,
              by collectors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
