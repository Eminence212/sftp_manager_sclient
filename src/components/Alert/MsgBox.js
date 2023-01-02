import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={3} ref={ref} variant="outlined" {...props} />;
});
const MsgBox = ({ start, severity, msg }) => {
  const [open, setOpen] = useState(start);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default MsgBox;
