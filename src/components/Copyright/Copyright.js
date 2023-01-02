import React from "react";
import { Typography, Link } from "@mui/material";
const Copyright = (props) => {
  const { label, link } = props;
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={link}>
        {label}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
