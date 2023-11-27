import React from "react";
import { useSelector } from "react-redux";
import { addCommas } from "./ProductCard";
function Money() {
  const money = useSelector((state) => state.app.money);
  return (
    <div className="text-center sticky-top bg-warning text-white p-2 rounded m-2">
      <h3>Spend Bill Gates Money</h3>
      <h1>$ {addCommas(money)}</h1>
    </div>
  );
}

export default Money;
