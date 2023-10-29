import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
  // </React.StrictMode>
);
