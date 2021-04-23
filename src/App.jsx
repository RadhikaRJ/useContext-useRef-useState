import { useCart } from "./cartcontext";
import "./styles.css";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "./theme-context";
import { useLocalisation } from "./language-context";

const products = [
  {
    id: 1,
    name: "Kala Chashma",
    price: 1000
  },
  {
    id: 2,
    name: "Afghan Jalebi",
    price: 10
  },
  {
    id: 3,
    name: "Jaapani Joota",
    price: 100
  },
  {
    id: 4,
    name: "laal chadi",
    price: 150
  },
  {
    id: 5,
    name: "moongdal halwa",
    price: 200
  }
];

export function ProductListing() {
  const { setItemsInCart } = useCart();
  const { currentTheme } = useTheme();
  return (
    <div>
      <h1>Products</h1>
      {products.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              border: "1px solid black",
              margin: "1rem",
              padding: "1rem",
              ...currentTheme
            }}
          >
            <h2>{item.name}</h2>
            <p>Rs. {item.price}</p>
            <button
              style={{ ...currentTheme }}
              onClick={() => setItemsInCart((items) => [...items, item])}
            >
              Add To Cart{" "}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function CartHeader() {
  const { itemsInCart } = useCart();

  return <p> Items in cart: {itemsInCart.length} </p>;
}

export function Cart() {
  const { itemsInCart } = useCart();
  const { currentTheme } = useTheme();
  console.log({ itemsInCart });
  return (
    <div>
      <h1>Cart</h1>
      {itemsInCart.map(({ id, name, price }) => {
        return (
          <div
            key={id}
            style={{
              border: "1px solid black",
              margin: "1rem",
              padding: "1rem",
              ...currentTheme
            }}
          >
            <h2>{name}</h2>
            <p>Rs. {price}</p>
          </div>
        );
      })}
    </div>
  );
}

export function Checkout() {
  const inputRef = useRef(null);
  const { currentTheme } = useTheme();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleCardSubmit() {
    const value = inputRef.current.value;
    console.log("value: ", value);
  }
  return (
    <div
      style={{ border: "1px solid black", padding: "1rem", ...currentTheme }}
    >
      <label>
        Enter payment details for checkout:
        <input ref={inputRef} type="text" />{" "}
        <button style={{ ...currentTheme }} onClick={handleCardSubmit}>
          DONE
        </button>
      </label>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState("products");
  const { changeTheme } = useTheme();
  const { currentLanguage, setLanguage } = useLocalisation();
  // console.log({ currentTheme });
  // console.log({ currentLanguage });
  const [themeName, setThemename] = useState("light");

  function handleToggle() {
    if (themeName === "light") {
      changeTheme("dark");
      setThemename("dark");
    } else {
      changeTheme("light");
      setThemename("light");
    }
  }
  return (
    <div className="App">
      <h1 className="app-header">{currentLanguage.appTitle}</h1>
      <button style={{ float: "right" }} onClick={handleToggle}>
        ToggleMode
      </button>
      <button
        style={{ float: "left" }}
        onClick={() =>
          currentLanguage.lang === "english"
            ? setLanguage("hindi")
            : setLanguage("english")
        }
      >
        Switch Language
      </button>
      <br></br>
      <div className="app-body">
        <button onClick={() => setRoute("products")}>Products</button>
        <button onClick={() => setRoute("cart")}>Cart</button>
        <button onClick={() => setRoute("checkout")}>Checkout</button>
        <CartHeader />
        {route === "cart" && <Cart />}
        {route === "products" && <ProductListing />}
        {route === "checkout" && <Checkout />}
      </div>
    </div>
  );
}
