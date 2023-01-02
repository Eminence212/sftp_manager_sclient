import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const Register = ({
  user,
  show,
  handleClose,
  handleSubmit,
  handleChangeInput,
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
  const { id, name, password, cf_password, role, err, success } = user;

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth="xs"
    >
      <DialogTitle>
        {id !== 0 ? "Modification" : "Nouveau utilisateur"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pour ajouter un nouveau utilisateur, veuillez saisir le nom, mot de
          passe et choisir le rôle ici.
        </DialogContentText>
        <Divider />
        <br />

        <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom d'utilisateur"
            type="text"
            name="name"
            fullWidth
            onChange={handleChangeInput}
            value={name}
          />
          {id === 0 && (
            <>
              <TextField
                margin="dense"
                id="password"
                label="Mot de passe"
                type="password"
                name="password"
                fullWidth
                onChange={handleChangeInput}
                value={password}
              />
              <TextField
                margin="dense"
                id="cf_password"
                label="Confirmer le mot de passe"
                type="password"
                name="cf_password"
                fullWidth
                onChange={handleChangeInput}
                value={cf_password}
              />
            </>
          )}

          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label">
            <FormControlLabel
              value="admin"
              control={
                <Radio
                  value={1}
                  checked={role === 1}
                  name="role"
                  onChange={handleChangeInput}
                />
              }
              label="Administrateur"
            />
            <FormControlLabel
              value="operator"
              control={
                <Radio
                  value={0}
                  checked={role === 0}
                  name="role"
                  onChange={handleChangeInput}
                />
              }
              label="Opérateur"
            />
          </RadioGroup>
        </ThemeProvider>
        <Divider />
      </DialogContent>
      <DialogActions sx={{ padding: "0 1.875rem 1.875rem 0" }}>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {id !== 0 ? "Modifier" : "Enregistrer"}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </ThemeProvider>
      </DialogActions>
    </Dialog>
  );
};

export default Register;
