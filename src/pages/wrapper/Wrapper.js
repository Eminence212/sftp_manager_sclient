import { Avatar, IconButton, Tooltip } from "@mui/material";
import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import UserProfil from "../../components/user-profil/UserProfil";
import { ApiBase } from "../../utils/config/ApiBase";
import profil from "../../assets/img/profile.png";
import "./sytle.css";
import { useSelector } from "react-redux";
const Header = ({ title, handleDrawerOpen }) => {
  return (
    <div className="text">
      <div>{title}</div>
      <Tooltip title="Paramètres du profile">
        <IconButton sx={{ p: 0, marginRight: 2 }} onClick={handleDrawerOpen}>
          <Avatar alt="Profil" src={profil} />
        </IconButton>
      </Tooltip>
    </div>
  );
};
const Wrapper = ({ children, title, open, setOpen }) => {
  const auth = useSelector((state) => state.auth);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await ApiBase.get("/user/logout");
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("refresh_token");
      window.location.href = "/";
    } catch (error) {
      window.location.href = "/";
    }
  };

  const [openDrower, setOpenDrower] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrower(true);
  };

  const handleDrawerClose = () => {
    setOpenDrower(false);
  };

  return (
    <>
      <SideBar
        handleLogout={handleLogout}
        open={open}
        setOpen={setOpen}
        auth={auth}
      />
      <div className="page_wrapper">
        <Header title={title} handleDrawerOpen={handleDrawerOpen} />
        <hr />
        {children}
      </div>
      <UserProfil
        open={openDrower}
        handleDrawerClose={handleDrawerClose}
        auth={auth}
      />
    </>
  );
};

export default Wrapper;
