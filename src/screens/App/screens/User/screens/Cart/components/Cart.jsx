import React, { useEffect, useState } from "react";
import Container from "../../../../../../../shared/Components/pages/Container";
import Title from "../../../../../../../shared/Components/pages/Title";
import axios from "../../../../../../../shared/caller";
import Loading from "../../../../../../../shared/Loading/Loading";
import CartCheckout from "./CartCheckout";
import CartItems from "./CartItems";
import { useShoppingCart } from "../../../../../../../hooks/useCart";

function Cart({ history }) {
  const { setLoading, loadCartItems, resetPricings } = useShoppingCart();

  useEffect(() => {
    async function getUserCart() {
      await axios
        .get("/api/cart/user")
        .then((res) => {
          if (res.status === 200) {
            loadCartItems(res.data.cart);
            // setLoading(false);
          }
        })
        .catch((err) => {
          if (!err.response) history.push("/login");
          else if (err.response.status === "UNAUTHORIZED")
            history.push("/unauthorized");
          else if (err.response.status === "FORBIDDEN")
            history.push("/forbidden");
        });
    }
    getUserCart();

    resetPricings();
  }, []);

  return (
    <>
      <Title title="Shopping Cart" />

      <Container>
        <div className="flex flex-row justify-between w-full gap-x-12">
          {/* cart items */}
          <div className="w-3/5 rounded-lg shadow-lg p-8">
            <CartItems />
          </div>

          {/* cart checkout */}
          <div className="sticky top-3 w-2/5 place-self-start rounded-lg shadow-lg p-8">
            <CartCheckout />
          </div>
        </div>
      </Container>
    </>
  );
}
export default Cart;
