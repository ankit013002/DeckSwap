import React from "react";
import type { ItemType } from "~/server/db/schema";

interface ItemDetailsPurchaseProps {
  product: ItemType;
}

const ItemDetailsPurchase = ({ product }: ItemDetailsPurchaseProps) => {
  return (
    <div>
      <button className="btn">Add to Cart</button>
    </div>
  );
};

export default ItemDetailsPurchase;
