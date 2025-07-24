"use client";

import React from "react";
import type { ItemType } from "~/server/db/schema";

interface ItemDetailsPurchaseProps {
  product: ItemType;
}

const ItemDetailsPurchase = ({ product }: ItemDetailsPurchaseProps) => {
  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = async () => {
    async function addToCart() {
      const response = await fetch("/api/addToCart", {
        method: "POST",
        body: JSON.stringify({ productId: product.id.toString() }),
      });
      console.log("Response: ", response);
    }
    await addToCart();
  };

  return (
    <div>
      <button onClick={() => handleAddToCart()} className="btn">
        Add to Cart
      </button>
    </div>
  );
};

export default ItemDetailsPurchase;
