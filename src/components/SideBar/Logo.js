import React from "react";

const Logo = ({ open, setOpen, name }) => {
  return (
    <div className="logo-details">
      {/* <i className="bx bx-book-open icon"></i> */}
      <div className="logo_name">{name}</div>
      <i className="bx bx-menu" id="btn" onClick={() => setOpen(!open)}></i>
    </div>
  );
};

export default Logo;
