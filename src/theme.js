import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        margin: 0,
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        WebkitTextSizeAdjust: "100%",
        fontSynthesis: "none",
        textRendering: "optimizeLegibility",
      },
    },
  },
};

export default extendTheme(theme);
