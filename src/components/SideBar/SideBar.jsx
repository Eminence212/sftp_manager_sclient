import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Logo from "./Logo";
import NavList from "./nav/NavList";
const SideBar = ({ handleLogout, open, setOpen,auth }) => {
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    const { value } = e.target;
    navigate(`/customers/${value}`);
  };
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <Logo open={open} setOpen={setOpen} name={"BlackList"} />
      <NavList
        open={open}
        setOpen={setOpen}
        auth={auth}
        handleLogout={handleLogout}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default SideBar;
