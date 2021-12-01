import React from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../../hooks/useCart";
import { prepareUrlForProducts } from "../../Route/urlParser";
import { formatPrice } from "../../utils/price";
import CheckoutItem from "./CheckoutItem";

/*
 * The CartCheckout component will hold the current checkouted product which can be
 * done in the cart page. It also happen on clicking the buy now button of a product card.
 *
 * In the cart page, the CartCheckout component is capable if removing a checkouted item through hover then click.
 * However, since this component is also used the Checkout page, the Checkout page disable
 * that feature to setting editable={false}
 *
 * Also if the editable is false, then the component is probably used in the CheckoutPage, hence
 * the button to redirect to the component page is also hidden.
 *
 * The product item container is the CheckoutItem.
 */
function CartCheckout({ editable }) {
  const { items, subTotal, grandTotal, shippingFee, checkoutable } =
    useShoppingCart();

  return (
    <>
      <p className="text-lg text-gray-600 font-medium">Checkout Summary</p>

      {/* items */}
      <div className="mt-6 flex flex-col gap-y-3">
        {items.map(
          (e) =>
            e.checkout && (
              <CheckoutItem key={e.productId} data={e} editable={editable} />
            )
        )}
      </div>

      <div className="my-7 border-b border-3 border-gray-300"></div>
      <div className="">
        {/* sub total */}
        <div className="flex flex-row justify-between items-center font-medium text-gray-400 text-base">
          <p className="">Sub Total</p>
          <p className="">{`₱${formatPrice(subTotal)}`}</p>
        </div>

        {/* shipping fee */}
        <div className="flex flex-row justify-between items-center font-medium text-gray-400 text-base">
          <p className="">Shipping Fee (?)</p>
          <p className="">{`₱${formatPrice(shippingFee)}`}</p>
        </div>
      </div>
      <div className="my-7 border-b border-3 border-gray-300"></div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-lg font-medium text-gray-700">Grand Total</p>
          <p className="text-sm text-gray-400">(including VAT)</p>
        </div>

        <div>
          <p className="text-xl font-medium text-my-accent">
            {`₱${formatPrice(grandTotal)}`}
          </p>
        </div>
      </div>

      <div className={`${editable ? "flex" : "hidden"} mt-8`}>
        {/* Checkout Button */}
        {checkoutable ? (
          <Link
            to={`/checkout?products=${prepareUrlForProducts(items)}`}
            className="transition duration-300 w-full text-center bg-my-accent text-white font-medium text-md lg:text-lg rounded-md p-3 hover:bg-my-accent-mono active:ring-8 active:ring-my-accent-mono active:ring-opacity-20"
          >
            PROCEED TO CHECKOUT
          </Link>
        ) : (
          <p className="transition duration-300 w-full text-center bg-my-accent text-white font-medium text-md lg:text-lg rounded-md p-1 md:p-2 lg:p-3 hover:bg-my-accent-mono active:ring-8 active:ring-my-accent-mono active:ring-opacity-20">
            No Product(s) Selected
          </p>
        )}
      </div>
    </>
  );
}
export default CartCheckout;
