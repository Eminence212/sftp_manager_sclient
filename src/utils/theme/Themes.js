import { createTheme, ThemeProvider } from "@mui/material/styles";

import React from "react";

const Themes = ({ primary, secondary, children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Themes;
