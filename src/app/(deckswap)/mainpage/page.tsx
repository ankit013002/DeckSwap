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
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ItemType {
  id: string;
  userId: string;
  title: string;
  price: string;
  description: string;
  category: string;
  condition: string;
  imageUrl: string;
  soldBy: string;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const itemType = searchParams.get("itemType");

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/fetchPosts?query=${encodeURIComponent(query ?? "")}`)
        .then((response) => response.json())
        .then((data: ItemType[]) => setItems(data))
        .catch((error) => console.error(`Error fetching data: ${error}`))
        .finally(() => setIsLoading(false));
    } else {
      fetch(`/api/fetchPosts?itemType=${encodeURIComponent(itemType ?? "")}`)
        .then((response) => response.json())
        .then((data: ItemType[]) => setItems(data))
        .catch((error) => console.error(`Error fetching data: ${error}`))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) return <p>Loading…</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 text-white">
      <h1 className="mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
        Card Market
      </h1>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href={`/productPage/${item.id}`}>
              <Card className="flex h-full flex-col border border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:shadow-2xl">
                <CardHeader className="flex items-center space-x-2">
                  <Badge className="bg-yellow-500 text-black">
                    {item.category}
                  </Badge>
                  <Badge className="border-white/30 text-gray-200">
                    {item.condition}
                  </Badge>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col items-center">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="mb-4 w-full rounded-xl object-cover shadow-md"
                    />
                  )}
                  <h2 className="mb-2 text-xl font-bold text-white">
                    {item.title}
                  </h2>
                  <p className="text-center text-sm text-gray-300">
                    {item.description}
                  </p>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                  <div className="space-y-1 text-sm">
                    <div className="text-gray-300">Price: ${item.price}</div>
                    <div className="text-gray-300">Seller: {item.soldBy}</div>
                  </div>
                  <Button className="rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 text-black hover:scale-105 hover:shadow-lg">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
