import React from "react";
import { useSelector } from "react-redux";
function Cart() {
  const cart = useSelector((state) => state.app.cart);
  const total =
    cart &&
    cart.reduce((total, product) => {
      return total + product.product.productPrice * product.count;
    }, 0);
  return (
    <div className="container w-50   border border-black">
      <h1 className="">Your Receipt</h1>
      <div className="row  justify-content-center">
        {cart &&
          cart.map((product) => (
            <div key={product.product.id}>
              <h3>
                {product.product.productName} x {product.count} $
                {product.product.productPrice * product.count}
              </h3>{" "}
            </div>
          ))}
        <hr></hr>
        {cart.length === 0 && <h2>Cart is empty</h2>}
        {cart.length > 0 && <h2>Total: ${total}</h2>}
      </div>
    </div>
  );
}

export default Cart;
