import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  ThemeProvider,
} from "@mui/material";

import React, { forwardRef } from "react";
import MobileStepper from "../../../components/Stepper/MobileStepper";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Register = ({
  customer,
  show,
  isSave,
  handleClose,
  handleSubmit,
  handleChangeInput,
  setIsSave,
  setCustomer,
}) => {
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

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={show}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle>
          {customer.id !== 0 ? "Modification" : "Nouveau client"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour ajouter un client, veuillez suivre les étapes et remplir les
            champs.
          </DialogContentText>
          <MobileStepper
            setIsSave={setIsSave}
            handleChangeInput={handleChangeInput}
            customer={customer}
            setCustomer={setCustomer}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "0 1.875rem 1.875rem 0" }}>
          {isSave && (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Sauvegarder
            </Button>
          )}
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Register;
