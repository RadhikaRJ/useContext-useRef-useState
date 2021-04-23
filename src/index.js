import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CartContextProvider } from "./cartcontext";
import { ThemeContextProvider } from "./theme-context";
import { LocalisationProvider } from "./language-context";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeContextProvider>
      <LocalisationProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </LocalisationProvider>
    </ThemeContextProvider>
  </StrictMode>,
  rootElement
);
