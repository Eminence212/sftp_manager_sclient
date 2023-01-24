import React from "react";
import menus from "./menu";
import profile from "../../../assets/img/profile.png";
import { Link } from "react-router-dom";
import DoneAllIcon from "@mui/icons-material/DoneAll";
const Item = ({ id, icon, label, path }) => {
  return (
    <li>
      <Link to={path}>
        <i className={`bx ${icon}`}></i>
        <span className="links_name">{label}</span>
      </Link>
      <span className="tooltip">{label}</span>
    </li>
  );
};
const Profile = ({ isAdmin, user, handleLogout }) => {
  return (
    <li className="profile">
      <div className="profile-details">
        <img src={profile} alt="profileImg" />
        <div className="name_job">
          <div className="name">{user.name ? user.name.toUpperCase() : ""}</div>
          <div className="job">{isAdmin ? "Administrateur" : "Opérateur"}</div>
        </div>
      </div>
      <i className="bx bx-log-out" id="log_out" onClick={handleLogout}></i>
    </li>
  );
};
const NavList = ({
  open,
  setOpen,
  active,
  setActive,
  auth,
  handleLogout,
  handleSearch,
}) => {
  return (
    <ul className="nav-list">
      <li>
        <i className="bx bx-search" onClick={() => setOpen(!open)}></i>
        <input type="text" placeholder="Recherche..." onChange={handleSearch} />
        <span className="tooltip">Recherche</span>
      </li>
      {menus.map((menu) => (
        <Item key={menu.id} {...menu} active={active} auth={auth} />
      ))}
    
      <li>
        <Link to={"/validation"}>
          <i className={`bx bx-list-check`}></i>
          <span className="links_name">Intégration</span>
        </Link>
        <span className="tooltip">Intégration</span>
      </li>
      {auth.isAdmin && (
        <li>
          <Link to={"/users"}>
            <i className={`bx bxs-user-account`}></i>
            <span className="links_name">Utilisateurs</span>
          </Link>
          <span className="tooltip">Utilisateurs</span>
        </li>
      )}

      <Profile {...auth} handleLogout={handleLogout} />
    </ul>
  );
};

export default NavList;
