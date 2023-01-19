import "./App.css";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import CustomerList from "./pages/customers/CustomerList";
import UserList from "./pages/user/UserList";
import { ApiBase } from "./utils/config/ApiBase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dispatchGetUser, fetchUser } from "./redux/actions/authAction";
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const { isLogged, isAdmin } = auth;
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    const ref_token = localStorage.getItem("refresh_token");
    if (firstLogin && ref_token) {
      const getToken = async () => {
        const res = await ApiBase.post("/user/refresh_token", {
          refresh_token: ref_token,
        });

        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="*" element={isLogged ? <NotFound /> : <Login />} />
        <Route
          exact
          path="/"
          element={
            isLogged ? <Dashboard open={open} setOpen={setOpen} /> : <Login />
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            isLogged ? <Dashboard open={open} setOpen={setOpen} /> : <Login />
          }
        />
        <Route
          exact
          path="/customers/:query"
          element={
            isLogged ? (
              <CustomerList open={open} setOpen={setOpen} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/customers"
          element={
            isLogged ? (
              <CustomerList open={open} setOpen={setOpen} />
            ) : (
              <Login />
            )
          }
        />

        <Route
          exact
          path="/users"
          element={
            isLogged ? (
              isAdmin ? (
                <UserList open={open} setOpen={setOpen} />
              ) : (
                <NotFound />
              )
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
