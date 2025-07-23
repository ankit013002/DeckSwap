import Image from "next/image";
import Link from "next/link";
import ItemDetailsPurchase from "~/components/ItemDetailsPurchase";
import ItemDetailsTrade from "~/components/ItemDetailsTrade";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { ItemType } from "~/server/db/schema";
import { GetProduct } from "~/server/getProduct";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const id = BigInt(slug);

  const product = await GetProduct(BigInt(id));

  if (!product) {
    return;
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="flex flex-col gap-8 rounded bg-white shadow lg:flex-row">
        {/* Left: Product Image */}
        <div className="flex items-center justify-center p-4 lg:w-1/2">
          <Image
            src={product.imageUrl ?? "/placeholder.png"}
            alt={product.title}
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

        {/* Right: Product Info */}
        <section className="flex flex-col space-y-6 p-6 lg:w-1/2">
          <h1 className="text-4xl font-semibold">{product.title}</h1>
          <p>{product.description ?? "No description provided."}</p>
          <p className="text-3xl text-green-600">${product.price}</p>

          <Tabs defaultValue="details" className="mt-4">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="trading">Trading</TabsTrigger>
              {product.mintCompany && (
                <TabsTrigger value="mint">Mint</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="details" className="pt-4">
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Category:</strong> {product.category}
                </li>
                <li>
                  <strong>Condition:</strong> {product.condition ?? "N/A"}
                </li>
                {product.usedConditionDescription && (
                  <li>
                    <strong>Used Details:</strong>{" "}
                    {product.usedConditionDescription}
                  </li>
                )}
                {product.mintCompany && (
                  <li>
                    <strong>Grading:</strong> {product.mintCompany} –{" "}
                    {product.mintGrade}
                  </li>
                )}
              </ul>
            </TabsContent>

            <TabsContent value="trading" className="pt-4">
              {product.willingToTrade === "Yes" ? (
                <p>
                  Open to trade for: <em>{product.tradingFor}</em>
                </p>
              ) : (
                <p>Not open to trades</p>
              )}
            </TabsContent>

            {product.mintCompany && (
              <TabsContent value="mint" className="pt-4">
                {product.willingToTrade === "Yes" ? (
                  <p>
                    Open to trade for: <em>{product.tradingFor}</em>
                  </p>
                ) : (
                  <p>Not open to trades</p>
                )}
              </TabsContent>
            )}
          </Tabs>

          <Tabs defaultValue="purchase" className="mt-4">
            <TabsList>
              <TabsTrigger value="purchase">Purchase</TabsTrigger>
              <TabsTrigger value="trade">Offer Trade</TabsTrigger>
            </TabsList>

            <TabsContent value="purchase" className="pt-4">
              <ItemDetailsPurchase product={product} />
            </TabsContent>

            <TabsContent value="trade" className="pt-4">
              <ItemDetailsTrade product={product} />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
