import React, { useState } from "react";
import { Divider, Drawer, IconButton, styled, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CloseIcon from "@mui/icons-material/Close";
import "./user-profil.css";
import profile from "../../assets/img/profile.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { isLength, isMatch } from "../../utils/validation";
import { ApiBase } from "../../utils/config/ApiBase";
import Loader from "../Loader/Loader";
import { message } from "../Alert/Notification";
import { useNavigate } from "react-router-dom";
const drawerWidth = 400;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),

  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));
const initialState = {
  id: 0,
  name: "",
  password: "",
  cf_password: "",
  role: 0,
  err: "",
  success: "",
};

const UserProfil = ({ open, handleDrawerClose, auth }) => {
  const theme = useTheme();

  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(initialState);
  const { id, name, password, cf_password, err, success } = user;
  const [isLoading, setIsLoading] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);

  //
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const handleClose = () => {
    setUser(initialState);
    handleDrawerClose();
  };
  useEffect(() => {
    setUser({
      ...user,
      id: auth.user.id,
      name: auth.user.name,
      avatar: auth.user.avatar,
      role: auth.user.role,
      password: "",
      cf_password: "",
      err: "",
      success: "",
    });
  }, [auth]);
  const handleShowpwd1 = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };
  const handleShowpwd2 = (e) => {
    e.preventDefault();
    setPasswordConfirmShown(!passwordConfirmShown);
  };

  const handeleUpdate = async (e) => {
    e.preventDefault();

    if (isLength(password))
      return setUser({
        ...user,
        err: "Le mot de passe doit comporter au moins 6 caractères.",
        success: "",
      });
    if (!isMatch(password, cf_password))
      return setUser({
        ...user,
        err: "Les mots de passe ne correspondent pas.",
        success: "",
      });
    try {
      setIsLoading(true);

      await ApiBase.post(
        "/user/reset",
        {
          password,
          id,
        },
        {
          headers: { Authorization: token },
        }
      );

      setTimeout(async () => {
        setIsLoading(false);
        setUser({
          ...user,
          password: "",
          cf_password: "",
          err: "",
          success: "Mot de passe modifié avec succès.",
        });
      }, 1000);
    } catch (error) {
      setUser({ ...user, err: error.response.data.msg, success: "" });
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
      className="offcanvas"
    >
      <Loader displayed={isLoading} />
      {!isLoading && err ? message(err, "error") : ""}
      {!isLoading && success ? message(success, "success") : ""}
      <DrawerHeader className="offcanvas-header">
        <h5 className="offcanvas-title" id="user-profile-label">
          <IconButton className="span">
            <ManageAccountsIcon className="icon" fontSize="large" />
          </IconButton>
          Paramètres du profil
        </h5>
        <IconButton className="btn-close text-reset" onClick={handleClose}>
          {theme.direction === "rtl" ? <ChevronLeftIcon /> : <CloseIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <div className="offcanvas-body">
        <div className="container">
          <div className="card_head">
            <h5 className="font-weight-normal">Détails personnels</h5>
            <span className="notify-text">
              N'hésitez pas à modifier l'information de base telle que votre mot
              de passe.
            </span>
            <div className="mt-3">
              <div className="d-flex  p-2 outline">
                <img
                  src={profile}
                  className="rounded"
                  width={50}
                  alt="Profil"
                />
                <div>
                  <h6>{user.name}</h6>
                  <p>{user.role === 1 ? "Administrateur" : "Opérateur"} </p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <form onSubmit={handeleUpdate}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="inputbox mt-3">
                      <i className="fa fa-user"></i>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                        readonly={true}
                        value={name}
                      />
                      <span>User name</span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="inputbox mt-3">
                      <i
                        className={
                          passwordShown ? "fas fa-eye" : "fas fa-eye-slash"
                        }
                        onClick={handleShowpwd1}
                      />
                      <input
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        className="form-control"
                        required="required"
                        value={password}
                        onChange={handleChangeInput}
                      />
                      <span>Nouveau mot de passe</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="inputbox mt-3">
                      <i
                        className={
                          passwordConfirmShown
                            ? "fas fa-eye"
                            : "fas fa-eye-slash"
                        }
                        onClick={handleShowpwd2}
                      />
                      <input
                        type={passwordConfirmShown ? "text" : "password"}
                        name="cf_password"
                        className="form-control"
                        required="required"
                        value={cf_password}
                        onChange={handleChangeInput}
                      />
                      <span>Confirmation mot de passe</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mt-3 text-center">
                      <button
                        className="btn btn-primary profile-button"
                        type="submit"
                      >
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default UserProfil;
