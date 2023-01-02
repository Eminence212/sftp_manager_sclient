import React, { useState } from "react";
import "./login.css";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../components/Copyright/Copyright";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { dispatchLogin } from "../../redux/actions/authAction";

import Loader from "../../components/Loader/Loader";
import { message } from "../../components/Alert/Notification";
import { ApiBase } from "../../utils/config/ApiBase";

const initialState = {
  name: "",
  password: "",
  err: "",
  success: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialState);
  const { name, password, err } = user;
  const [isLoading, setIsLoading] = useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fabb00",
      },
      secondary: {
        main: "#242a2b",
      },
    },
  });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const res = await ApiBase.post("/user/login", {
        name,
        password,
      });

      setUser({
        ...user,
        err: "",
        success: res.data.msg,
      });

      localStorage.setItem("firstLogin", true);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      dispatch(dispatchLogin());
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      error.response.data.msg &&
        setUser({
          ...user,
          err: error.response.data.msg,
          success: "",
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {!isLoading && err ? message(err, "error") : ""}
      <Loader displayed={isLoading} />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ m: 2, backgroundColor: "#242a2b", width: 70, height: 70 }}
        >
          <LockOutlinedIcon sx={{ color: "#fabb00", width: 40, height: 40 }} />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: "#242a2b" }}>
          Authentification
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <ThemeProvider theme={theme}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Nom d'utilisateur"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChangeInput}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangeInput}
            />

            <FormControlLabel
              control={
                <Checkbox value="remembeRester connectér" color="primary" />
              }
              label="Rester connecté"
            />
          </ThemeProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#242a2b", color: "#fabb00" }}
            size="large"
            className="action_button"
          >
            Connexion
          </Button>
        </Box>
      </Box>
      <Copyright
        sx={{ mt: 4, mb: 4 }}
        label={"Rawbank"}
        link={"https://rawbank.com/"}
      />
    </Container>
  );
};

export default Login;
