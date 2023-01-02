import React, { useEffect, useState } from "react";
import "./index.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import Themes from "../../utils/theme/Themes";

const PageHeader = (props) => {
  const { title, children, handleShow } = props;

  return (
    <div id="page-header">
      <div className="breadcrumb">
        <div className="icon"> {children} </div>
        <div className="title"> {title} </div>
      </div>
      <Themes primary={"#242a2b"} secondary={"#fabb00"}>
        <div className="btns">
          <SpeedDial
            ariaLabel="Actions"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            direction="left"
            onClick={handleShow}
          />
        </div>
      </Themes>
    </div>
  );
};

export default PageHeader;
