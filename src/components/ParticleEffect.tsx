"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function ParticleEffect() {
  // track hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // only generate once, but we won’t render until mounted
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      })),
    [],
  );

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute h-2 w-2 animate-pulse rounded-full bg-yellow-400 opacity-20"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}
    </div>
  );
}
