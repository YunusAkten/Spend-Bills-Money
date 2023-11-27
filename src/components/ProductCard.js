import { useState } from "react";
import { addToCart, buyOne, sellOne } from "../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
function ProductCard({ product }) {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const money = useSelector((state) => state.app.money);
  let canSell = count > 0 ? null : "disabled";

  function buyProduct() {
    const newCount = count + 1;
    setCount(newCount);
    dispatch(buyOne({ product }));
  }
  function handleChange(e) {
    // if input is not a number
    if (!/^\d+$/.test(e.target.value)) {
      setCount(0);
      dispatch(addToCart({ product, count: 0 }));
      return;
    }
    // when you type 1 it becomes 01 so this is to fix that
    else if (e.target.value > 1 && e.target.value[0] === "0") {
      setCount(e.target.value.slice(1));
      dispatch(addToCart({ product, count: e.target.value.slice(1) }));
      return;
    }
    if (money < product.productPrice * parseInt(e.target.value)) {
      alert("You don't have enough money");
      return;
    }
    const newCount = parseInt(e.target.value);
    setCount(newCount);
    dispatch(addToCart({ product, count: newCount }));
  }
  function sellProduct() {
    const newCount = count - 1;
    setCount(newCount);
    dispatch(sellOne({ product, count: newCount }));
  }
  return (
    <div className="card productCard">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.productName}
      />
      <div className="py-4">
        <p className="card-text">{product.productName}</p>
        <p className="card-text">${addCommas(product.productPrice)}</p>
        <button
          onClick={sellProduct}
          className={` ${canSell} btn btn-sm btn-danger `}
        >
          Sell
        </button>

        <input
          inputMode="numeric "
          type="number"
          className="w-50 mx-2 my-2"
          value={count}
          min={0}
          onChange={handleChange}
        />
        <button onClick={buyProduct} className="btn btn-sm btn-primary">
          Buy
        </button>
      </div>
    </div>
  );
}

export function addCommas(nStr) {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}
export default ProductCard;
