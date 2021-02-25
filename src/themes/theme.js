import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#e80872",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#592368",
      // dark: will be calculated from palette.secondary.main
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    h1: {
      fontFamily: "Noto Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: "800",
      fontSize: "48px",
      textAlign: "center",
    },
    h2: {
      fontFamily: "Inter, sans-serif",
      fontStyle: "normal",
      fontSize: "36px",
      lineHeight: "48px",
      textAlign: "center",
      color: "#03083F",
    },
    button: {
      fontFamily: "Quicksand, sans-serif",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "24px",
      textTransform: "none",
      textAlign: "center",
      color: "#FFFFFF",
    },
    body1: {
      fontFamily: "Quicksand, sans-serif",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "24px",
      textAlign: "center",
      color: "white",
      margin: "15px 0",
    },
    body2: {
      fontFamily: "Quicksand, sans-serif",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "18px",
      textAlign: "center",
      color: "white",
    },
  },
});

export default theme;
