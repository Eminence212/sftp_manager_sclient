import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#242a2b",
      },
      secondary: {
        main: "#fabb00",
      },
    },
  });
  return (
    <div className="notfound">
      <div className="title">
        <h1>
          <span>4</span> <span>0</span> <span>4</span>
        </h1>
        <h2>La page demandée n'a pas été trouvée !</h2>
      </div>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          className="button"
          onClick={goBack}
          sx={{ color: "#fff", background: "#242a2b" }}
        >
          Retour
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default NotFound;
