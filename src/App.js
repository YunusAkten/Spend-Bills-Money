import Cart from "./components/Cart";
import Money from "./components/Money";
import ProductsList from "./components/ProductsList";

function App() {
  return (
    <div className="App container mt-2 ">
      <Money></Money>
      <Cart></Cart>
      <ProductsList></ProductsList>
    </div>
  );
}

export default App;
