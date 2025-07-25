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
import { mockUsers, mockItems } from "~/lib/mock-data";
import { useEffect, useState } from "react";
import Link from "next/link";

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

interface HomePageProps {
  query: string;
}

export default function HomePage({ query }: HomePageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    fetch("/api/fetchPosts")
      .then((response) => response.json())
      .then((data: ItemType[]) => setItems(data))
      .catch((error) => console.error(`Error fetching data: ${error}`))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading…</p>;

  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-6 text-3xl font-bold">Card Market</h1>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
        {items.map((item) => {
          const seller = mockUsers.find((u) => u.id === item.userId);
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={`/productPage/${item.id}`}>
                <Card className="flex h-full flex-col">
                  <CardHeader className="flex items-center space-x-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    <Badge variant="outline">{item.condition}</Badge>
                  </CardHeader>
                  <CardContent className="flex flex-grow flex-col items-center">
                    {item?.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={300}
                        height={300}
                        className="mb-4 w-full rounded-md object-cover"
                      />
                    )}
                    <h2 className="mb-2 text-xl font-medium text-gray-900">
                      {item.title}
                    </h2>
                    <p className="text-center text-sm text-gray-600">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Price: ${item.price ?? "Unknown"}
                      </span>
                      <span className="text-sm text-gray-500">
                        Seller: {item.soldBy ?? "Unknown"}
                      </span>
                    </div>
                    <Button>Add to Cart</Button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </section>
    </main>
  );
}
