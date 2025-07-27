"use client";

import React from "react";

interface CartItemButtonsProps {
  cartItemId: bigint;
}

const CartItemButtons = ({ cartItemId }: CartItemButtonsProps) => {
  const RemoveFromCart = async () => {
    const response = await fetch("/api/removeFromCart", {
      method: "POST",
      body: JSON.stringify({ cartItemId: cartItemId.toString() }),
    });
  };

  return (
    <div className="mt-4 flex flex-col space-y-2 sm:mt-0 sm:ml-6">
      <button onClick={() => RemoveFromCart()} className="btn btn-sm btn-error">
        Remove
      </button>
      <button className="btn btn-sm">Edit Quantity</button>
    </div>
  );
};

export default CartItemButtons;
