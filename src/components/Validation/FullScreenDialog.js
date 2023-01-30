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

  const confirm = (customer, file_name, directory) => {
    handleClickCloseDialog();
    handleValidation(customer, file_name, directory);
  };
  const showData = async (data) => {
    try {
      setIsLoading(true);
      const rep = await ApiBase.post(
        "/customer/self_validation",
        {
          customer_name: data.customer,
          file_name: data.name,
          directory: data.directory,
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log({ rep });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // showData(item);
  }, []);

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
              <Button
                autoFocus
                color="inherit"
                onClick={() =>
                  confirm(item.customer, item.name, item.directory)
                }
              >
                Valider
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Default notification ringtone"
                secondary="Tethys"
              />
            </ListItem>
          </List>
        </Dialog>
      </div>
    </Themes>
  );
};

export default FullScreenDialog;
