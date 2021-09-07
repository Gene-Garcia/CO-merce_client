import React from "react";
import CartItem from "./CartItem";

function CartItems({ items, changeQuantity, addToCheckout }) {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-lg text-gray-600 font-medium">Cart (5) items</p>
        </div>

        <div>
          <button
            onClick={() => addToCheckout(false, undefined)}
            className="transition duration-300 text-sm text-gray-500 font-medium px-3 py-1 rounded-md border border-gray-500 hover:border-gray-400 hover:bg-gray-400 hover:text-white active:ring-4 active:ring-gray-300"
          >
            Checkout All Items
          </button>
        </div>
      </div>

      {/* items */}
      <div className="mt-14 flex flex-col gap-y-10">
        {items.map((e) => (
          <CartItem
            key={e.productId}
            data={e}
            changeQuantity={changeQuantity}
            addToCheckout={addToCheckout}
          />
        ))}
      </div>
    </>
  );
}

export default CartItems;
