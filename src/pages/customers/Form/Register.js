import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  ThemeProvider,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  IconButton,
} from "@mui/material";

import React, { forwardRef, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SelectBtn from "../../../components/Select/SelectBtn";

import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Register = ({
  customer,
  types,
  show,
  isSave,
  handleClose,
  handleSubmit,
  handleChangeInput,
}) => {
  const [expanded, setExpanded] = useState(false);

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
  const { id, name, typeId } = customer;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth="xs"
    >
      <DialogTitle>{id !== 0 ? "Modification" : "Nouveau client"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pour ajouter un ou plusiers, veuillez choisir une option.
        </DialogContentText>

        {/* Bigin */}

        {/* <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ width: "20%", flexShrink: 0 }}>
              <PersonAddIcon />
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {id !== 0 ? " Modifier un client" : " Ajouter un client"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ThemeProvider theme={theme}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nom, post nom et prénom"
                type="text"
                name="name"
                fullWidth
                onChange={handleChangeInput}
                value={name}
                required
              />
              <SelectBtn
                records={types}
                action={handleChangeInput}
                item={typeId}
              />
            </ThemeProvider>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ width: "20%", flexShrink: 0 }}>
              <DriveFolderUploadIcon />
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Imporation d'un fichier de données
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Pour ajouter les clients en lot, veillez selectionner le fichier
              en cliquant sur ce bouton.
            </Typography>
            <ThemeProvider theme={theme}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                justifyContent="center"
                marginTop={1}
              >
                <Button
                  variant="outlined"
                  component="label"
                  color="secondary"
                  startIcon={<UploadFileIcon />}
                >
                  Télécharger
                  <input
                    hidden
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    // onChange={readUploadFile}
                  />
                </Button>
              </Stack>
            </ThemeProvider>
          </AccordionDetails>
        </Accordion> */}

        {/* End */}
      </DialogContent>
      <DialogActions sx={{ padding: "0 1.875rem 1.875rem 0" }}>
        <ThemeProvider theme={theme}>
          {expanded === "panel1" ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {id !== 0 ? "Modifier" : "Enregistrer"}
            </Button>
          ) : (
            expanded === "panel2" &&
            isSave && (
              <Button
                variant="contained"
                color="primary"
                // onClick={handleSubmitMany}
              >
                Sauvegarder
              </Button>
            )
          )}
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </ThemeProvider>
      </DialogActions>
    </Dialog>
  );
};

export default Register;
