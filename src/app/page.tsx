"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Blue-Eyes White Dragon",
    price: 25.0,
    image: "/images/blue-eyes.jpg",
    category: "Trading Card",
  },
  {
    id: 2,
    name: "Charizard GX",
    price: 45.0,
    image: "/images/charizard-gx.jpg",
    category: "Trading Card",
  },
  {
    id: 3,
    name: "Pikachu V",
    price: 15.0,
    image: "/images/pikachu-v.jpg",
    category: "Trading Card",
  },
  {
    id: 4,
    name: "Premium Sleeves Pack",
    price: 12.5,
    image: "/images/sleeves-pack.jpg",
    category: "Accessory",
  },
  {
    id: 5,
    name: "Playmat - Dragon Arena",
    price: 20.0,
    image: "/images/dragon-playmat.jpg",
    category: "Accessory",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-6 text-3xl font-bold">Card Market</h1>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
        {mockProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="flex h-full min-h-150 flex-col">
              <CardHeader>
                <Badge variant="secondary">{product.category}</Badge>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col items-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={1000}
                  height={1000}
                  className="mb-4 h-full w-full rounded-md object-cover"
                />
                <h2 className="mb-2 text-xl font-medium text-gray-900">
                  {product.name}
                </h2>
                <p className="text-lg font-semibold text-green-600">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
