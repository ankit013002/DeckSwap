import Image from "next/image";
import React from "react";
import CartItemButtons from "~/components/CartItemButtons";
import { GetCartItems } from "~/server/getCartItems";

const page = async () => {
  const cart = await GetCartItems();
  const quantity = 0;

  if (!cart) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 text-white">
        Cart Does Not Exist
      </div>
    );
  }

  if (cart?.length == 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 text-white">
        No Items in your cart
      </div>
    );
  }

  const cartTotal = cart.reduce((sum, { cart_items_table, items_table }) => {
    if (items_table?.price) {
      return sum + parseFloat(items_table.price) * cart_items_table.quantity;
    } else {
      return sum;
    }
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 text-white">
      <div className="mb-6 text-center text-5xl font-bold">Your Cart</div>

      <div className="mb-8 flex items-center justify-end space-x-4">
        <span className="text-2xl font-semibold">
          Total: ${cartTotal.toFixed(2)}
        </span>
        <button className="btn btn-primary">Checkout</button>
      </div>

      <div className="grid gap-6">
        {cart.map(({ cart_items_table, items_table }, index) => {
          if (!items_table) return null;
          const { title, category, condition, description, price, imageUrl } =
            items_table;

          return (
            <div
              key={index}
              className="card bg-base-200 flex flex-col items-center p-4 shadow-lg sm:flex-row"
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={title}
                  width={128}
                  height={128}
                  className="rounded-lg object-cover shadow-md"
                />
              )}

              <div className="mt-4 flex-1 sm:mt-0 sm:ml-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm text-gray-300">
                  {category} • {condition}
                </p>
                {description && (
                  <p className="mt-2 text-gray-200">
                    {description.length > 100
                      ? description.slice(0, 100) + "…"
                      : description}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center space-x-6">
                  <span className="font-semibold">Unit price: ${price}</span>
                  <span>Qty: {quantity}</span>
                  <span className="font-semibold">
                    Line total: ${(parseInt(price) * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <CartItemButtons cartItemId={cart_items_table.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
