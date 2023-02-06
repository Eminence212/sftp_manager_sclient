import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Themes from "../../utils/theme/Themes";
import Loader from "../Loader/Loader";
import { ApiBase } from "../../utils/config/ApiBase";
import { useSelector } from "react-redux";

import { formatDate, formatPaiement } from "../../utils/Futures";
import TransacTable from "./TransacTable";
const initialState = {
  msgId: "",
  initiateur: "",
  nbreTrans: 0,
  montant: 0.0,
  initDate: "",
  creanciers: [],
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const FullScreenDialog = ({
  open,
  item,
  handleClickCloseDialog,
  handleValidation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.token);
  const [details, setDetails] = useState(initialState);
  const { autovalidation } = item;

  const confirm = (customer, file_name, directory) => {
    handleClickCloseDialog();
    handleValidation(customer, file_name, directory);
  };

  const showData = async (body) => {
    try {
      setIsLoading(true);
      const response = await ApiBase.post(
        "/customer/payement_detail",
        {
          customer_name: body.customer,
          file_name: body.name,
          directory: body.directory,
        },
        {
          headers: { Authorization: token },
        }
      );
      setDetails({
        ...details,
        msgId: response.data[0]["GrpHdr"][0]["MsgId"][0],
        initiateur:
          response.data[0]["GrpHdr"][0]["InitgPty"][0]["Nm"][0].toUpperCase(),
        nbreTrans: response.data[0]["GrpHdr"][0]["NbOfTxs"][0],
        montant: response.data[0]["GrpHdr"][0]["CtrlSum"][0],
        initDate: formatDate(response.data[0]["GrpHdr"][0]["CreDtTm"][0]),
        creanciers: formatPaiement(response.data[0]["PmtInf"][0]),
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    showData(item);
  }, [item]);

  return (
    <Themes primary={"#242a2b"} secondary={"#fabb00"}>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClickCloseDialog}
          TransitionComponent={Transition}
        >
          <Loader displayed={isLoading} />
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClickCloseDialog}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {item.name}
              </Typography>
              {!autovalidation && (
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() =>
                    confirm(item.customer, item.name, item.directory)
                  }
                >
                  Valider
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ color: "#242a2b" }}>
                    En-tête de la transaction
                  </Typography>
                }
                secondary={
                  <List dense={true}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ color: "#242a2b" }}>
                            IDENTIFIANT :
                          </Typography>
                        }
                        secondary={details.msgId}
                      />
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ color: "#242a2b" }}>
                            INITIATEUR :
                          </Typography>
                        }
                        secondary={details.initiateur}
                      />
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ color: "#242a2b" }}>
                            NOBRE DES TRANSACTIONS :
                          </Typography>
                        }
                        secondary={details.nbreTrans}
                      />
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ color: "#242a2b" }}>
                            MONTANT TOTAL :
                          </Typography>
                        }
                        secondary={details.montant}
                      />
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ color: "#242a2b" }}>
                            DATE D'INITIATION :
                          </Typography>
                        }
                        secondary={details.initDate}
                      />
                    </ListItem>
                  </List>
                }
              />
            </ListItem>

            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ color: "#242a2b" }}>
                    Informations des paiements
                  </Typography>
                }
                secondary={<TransacTable data={details.creanciers} />}
              />
            </ListItem>
          </List>
        </Dialog>
      </div>
    </Themes>
  );
};

export default FullScreenDialog;
