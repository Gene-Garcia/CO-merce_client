import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useAlert from "../../../../../../../hooks/useAlert";
import { useShoppingCart } from "../../../../../../../hooks/useCart";
import Button from "../../../../../../../shared/Components/button/Button";
import { formatPrice } from "../../../../../../../shared/utils/price";
import axios from "../../.././../../../../shared/caller";

function CartItem({ data }) {
  const history = useHistory();

  const { setMessage, setSeverity } = useAlert();
  const { cartId, productId, item, retailPrice, quantity, image } = data;
  const { modifyQuantity, addToCheckout, removeCartItem } = useShoppingCart();

  // loading state for the remove from cart button
  const [loading, setLoading] = useState(false);

  /* API function to delete this cart */
  // implement loading button
  async function removeFromCart(cId) {
    setLoading(true);
    await axios
      .delete(`/api/cart/remove/${cId}`)
      .then((res) => {
        if (res.status === 200) {
          setSeverity("success");
          setMessage(res.data.message);
          removeCartItem(res.data.removedCart);
        }
      })
      .catch((err) => {
        setSeverity("error");
        if (!err.response) setMessage("Something went wrong. Try again later.");
        else if (err.response.status === 403) history.push("/forbidden");
        else if (err.response.status === 401) history.push("/unauthorized");
        else setMessage(err.response.data.error);
      });
    setLoading(false);
  }

  return (
    <div className="flex flex-col sm:flex-row justify-start gap-3 lg:gap-6">
      {/* image */}
      <div className="flex-grow-0 rounded-lg shadow-sm bg-gray-100">
        <img
          className="object-contain w-40 h-40 sm:w-56 sm:h-56 p-2 mx-auto"
          alt="cart-item"
          src={image}
        />
      </div>

      {/* info */}
      <div className="flex-grow w-4/5 flex flex-col gap-4 justify-between">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-0.5">
          <p className="font-medium text-gray-700 text-xl">{item}</p>

          <p className="text-gray-500 font-medium text-lg">
            {`₱${formatPrice(retailPrice)}`}
          </p>
        </div>

        <div>
          <p className="mb-0.5 text-sm text-gray-400">Quantity</p>
          <div className="flex flex-row items-center justify-center rounded-md border w-28 h-8 ">
            <button
              onClick={() => modifyQuantity(false, productId)}
              className="transition w-full h-full flex justify-center items-center group hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 group-hover:text-my-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>

            <div className="w-full h-full flex justify-center items-center text-lg font-bold text-gray-500">
              {quantity}
            </div>

            <button
              onClick={() => modifyQuantity(true, productId)}
              className="w-full h-full flex justify-center items-center group hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 group-hover:text-my-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-x-3 gap-y-1 ">
          <button
            onClick={() => addToCheckout(true, productId)}
            className="border border-my-accent font-medium text-my-accent text-md rounded-md px-4 py-1 transition duration-200 ease-linear hover:text-white hover:bg-my-accent"
          >
            Add to Checkout
          </button>

          <Button
            isLoading={loading}
            onClick={() => removeFromCart(cartId)}
            svgClass="text-gray-500"
            buttonClass="group border border-transparent rounded-md px-2 py-1 font-medium text-gray-500 transition duration-150 ease-linear hover:text-my-accent"
          >
            <div className="flex flex-row gap-x-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 group-hover:text-my-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Remove From Cart</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
