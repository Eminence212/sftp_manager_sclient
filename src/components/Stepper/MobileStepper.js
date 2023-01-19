import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { isEmpty, isNumeric, validateIPaddress } from "../../utils/validation";
const steps = ["Client", "Compte SFTP source", "Compte SFTP destination"];
const MobileStepper = ({
  setIsSave,
  handleChangeInput,
  customer,
  setCustomer,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const {
    name,
    host,
    port,
    username,
    password,
    inbound,
    outbound,
    erreur,
    archive,
    inbound_amp,
    outbound_amp,
    erreur_amp,
    archive_amp,
    response_slug,
  } = customer;
  const checkFirstStapeFields = (fields, step) => {
    const {
      id,
      name,
      host,
      port,
      username,
      password,
      inbound,
      outbound,
      erreur,
      archive,
      inbound_amp,
      outbound_amp,
      erreur_amp,
      archive_amp,
    } = fields;
    switch (step) {
      case 0:
        if (isEmpty(name)) {
          setCustomer({
            ...customer,
            err: "Veuillez saisir le nom du client.",
            success: "",
          });
          return false;
        }
        if (isEmpty(host)) {
          setCustomer({
            ...customer,
            err: "Veuillez saisir l'adresse IP du serveur SFTP du client",
            success: "",
          });
          return false;
        }
        if (!validateIPaddress(host)) {
          setCustomer({
            ...customer,
            err: "L'adresse IP du serveur est invalide",
            success: "",
          });

          return false;
        }
        if (isEmpty(port)) {
          setCustomer({
            ...customer,
            err: "Veuillez saisir le numéro de port",
            success: "",
          });
          return false;
        }
        if (!isNumeric(port)) {
          setCustomer({
            ...customer,
            err: "Le numéro de port doit être un nombre entier",
            success: "",
          });
          return false;
        }
        if (isEmpty(username)) {
          setCustomer({
            ...customer,
            err: "Veuillez saisir le nom d'utilisateur.",
            success: "",
          });
          return false;
        }
        if (isEmpty(password) && id === 0) {
          setCustomer({
            ...customer,
            err: "Veuillez saisir le mot de passe",
            success: "",
          });
          return false;
        }
        break;
      case 1:
        //Répertoire source
        if (isEmpty(inbound)) {
          setCustomer({
            ...customer,
            err: "Veuillez renseigner le répertoire entrant source",
            success: "",
          });
          return false;
        }
        if (isEmpty(outbound)) {
          setCustomer({
            ...customer,
            err: "Veuillez renseigner le répertoire sortant source",
            success: "",
          });
          return false;
        }
        if (isEmpty(erreur)) {
          setCustomer({
            ...customer,
            err: "Veuillez renseigner le répertoire d'erreur source",
            success: "",
          });
          return false;
        }
        if (isEmpty(archive)) {
          setCustomer({
            ...customer,
            err: "Veuillez renseigner le répertoire d'archive source",
            success: "",
          });
          return false;
        }
        break;
      case 2:
        //Répertoire de destination
        if (isEmpty(inbound_amp)) {
          setCustomer({
            ...customer,
            err: "Veuillez renseigner le répertoire de destination entrant",
            success: "",
          });
          return false;
        }
        if (isEmpty(outbound_amp)) {
          setCustomer({
            ...customer,
            err: "Veuillez renseigner le répertoire de destination sortant",
            success: "",
          });
          return false;
        }
        if (isEmpty(erreur_amp)) {
          setCustomer({
            ...customer,
            err: "Veuillez renseigner le répertoire de destination d'erreur",
            success: "",
          });
          return false;
        }
        if (isEmpty(archive_amp)) {
          setCustomer({
            ...customer,
            err: "Veuillez renseigner le répertoire de destination d'archive",
            success: "",
          });
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    setIsSave(activeStep === steps.length - 1);
    setActiveStep((prevActiveStep) => {
      const isValid = checkFirstStapeFields(customer, prevActiveStep);

      return isValid ? prevActiveStep + 1 : prevActiveStep;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsSave(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Toutes les étapes sont terminées - vous avez terminé
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Réinitialiser</Button>
          </Box>
        </>
      ) : (
        <>
          <div style={{ padding: "2rem" }}>
            {activeStep === 0 && (
              <>
                <TextField
                  label="Nom du client"
                  name="name"
                  size="small"
                  placeholder="Saisir le nom du client"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={name}
                  required
                />
                <TextField
                  label="Serveur"
                  name="host"
                  size="small"
                  placeholder="Saisir l'adresse IP du serveur"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={host}
                  required
                />
                <TextField
                  label="Port"
                  name="port"
                  size="small"
                  placeholder="Saisir le numéro du port"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={port}
                  required
                />
                <TextField
                  label="Nom d'utilisateur"
                  name="username"
                  size="small"
                  placeholder="Saisir le nom d'utilisateur"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={username}
                  required
                />
                <TextField
                  label="Mot de passe"
                  name="password"
                  size="small"
                  placeholder="Saisir le mot de passe"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <TextField
                  label="Répertoire d'entré source"
                  name="inbound"
                  size="small"
                  placeholder="/home/rowbank/Inbound"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={inbound}
                  required
                />
                <TextField
                  label="Répertoire de sortie source"
                  name="outbound"
                  size="small"
                  placeholder="/home/rowbank/Outbound"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={outbound}
                  required
                />
                <TextField
                  label="Répertoire d'erreur source"
                  name="erreur"
                  size="small"
                  placeholder="/home/rowbank/error"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={erreur}
                  required
                />
                <TextField
                  label="Répertoire d'archive source"
                  name="archive"
                  size="small"
                  placeholder="/home/rowbank/archive"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={archive}
                  required
                />
                <TextField
                  label="Prefixe des fichiers de réponse "
                  name="response_slug"
                  size="small"
                  placeholder="TCD_"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={response_slug}
                />
              </>
            )}
            {activeStep === 2 && (
              <>
                <TextField
                  label="Répertoire de destination d'entré "
                  name="inbound_amp"
                  size="small"
                  placeholder="/xch/siop/channel/rowbank/Inbound"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={inbound_amp}
                  required
                />
                <TextField
                  label="Répertoire de destination de sortie"
                  name="outbound_amp"
                  size="small"
                  placeholder="/xch/siop/channel/rowbank/Outbound"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={outbound_amp}
                  required
                />
                <TextField
                  label="Répertoire de destination d'erreur"
                  name="erreur_amp"
                  size="small"
                  placeholder="/xch/siop/channel/rowbank/error"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={erreur_amp}
                  required
                />
                <TextField
                  label="Répertoire de destination d'archive"
                  name="archive_amp"
                  size="small"
                  placeholder="/xch/siop/channel/rowbank/archive"
                  sx={{ mb: 2, width: "100%" }}
                  onChange={handleChangeInput}
                  value={archive_amp}
                  required
                />
              </>
            )}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Précédant
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MobileStepper;
