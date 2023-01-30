import React, { useEffect, useState } from "react";
import Wrapper from "../../pages/wrapper/Wrapper";
import Page from "../layaout-page/Page";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Chip,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import swal from "@sweetalert/with-react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  dispatchGetAllCustomerFiles,
  dispatchGetAllCustomers,
  fetchAllCustomerFiles,
  fetchAllCustomers,
} from "../../redux/actions/customersAction";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Themes from "../../utils/theme/Themes";
import ScienceIcon from "@mui/icons-material/Science";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { dateFormat } from "../../utils/Futures";
import Loader from "../Loader/Loader";
import DataTable from "./Table/DataTable";
import { ApiBase } from "../../utils/config/ApiBase";
import { message } from "../Alert/Notification";
import FullScreenDialog from "./FullScreenDialog";
const initialState = {
  customer: "",
  createdAt: new Date(),
  directory: "",
};
const initialData = {
  destinationFiles: [],
  sourceFiles: [],
};
const path = [
  {
    id: 1,
    label: "Inbound",
    slug: "in",
  },
  {
    id: 2,
    label: "Outbound",
    slug: "out",
  },
  {
    id: 3,
    label: "Archive",
    slug: "arch",
  },
  {
    id: 4,
    label: "Erreur",
    slug: "err",
  },
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "justify",
  color: theme.palette.text.secondary,
}));

const EmptySource = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Validation = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const [recordFiles, setRecordFiles] = useState(initialData);
  const [dataFilter, setDataFilter] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});

  const handleChange = (event) => {
    setRecordFiles(initialData);
    setDataFilter({ ...dataFilter, [event.target.name]: event.target.value });
  };
  const handleChangeDate = (newValue) => {
    setRecordFiles(initialData);
    setDataFilter({ ...dataFilter, createdAt: newValue.$d });
  };
  const handleClickOpenDialog = (item) => {
    const body = { ...dataFilter, ...item };
    setItem({ ...item, ...body });
    setShow(true);
  };
  const handleClickCloseDialog = () => {
    setShow(false);
  };
  const customers = useSelector((state) =>
    auth.isAdmin
      ? state.customers.filter((item) => item.enable)
      : state.customers.filter(
          (item) => item.User.id === auth.user.id && item.enable
        )
  );

  const fetchData = async () => {
    const response = await fetchAllCustomers(token);
    dispatch(dispatchGetAllCustomers(response));
  };
  const fetchFiles = async () => {
    const response = await fetchAllCustomerFiles(token, dataFilter);
    console.log({ response });
    setRecordFiles({ ...recordFiles, ...response.data });
  };
  useEffect(() => {
    fetchData();
  }, [token, auth.isAdmin, dispatch, auth.user.id]);

  const handleFilter = async () => {
    try {
      setIsLoading(true);
      fetchFiles();

      setTimeout(async () => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const confirmValidation = async (customer_name, file_name, directory) => {
    setIsLoading(true);

    const { status } = await ApiBase.post(
      "/customer/self_validation",
      {
        customer_name,
        file_name,
        directory,
      },
      {
        headers: { Authorization: token },
      }
    );
    if (status === 200) {
      fetchFiles();
    }
    setTimeout(async () => {
      setIsLoading(false);
    }, 1000);
  };
  const handleValidation = async (customer, file_name, directory) => {
    const msg = `Êtes-vous sûr de vouloir ${
      directory === "in"
        ? "valider l'intégration "
        : "confirmer le téléchargement"
    } du fichier  :${file_name} ?`;
    try {
      swal(msg, {
        buttons: {
          cancel: "Non",
          yes: {
            text: "Oui",
            value: "yes",
          },
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then((value) => {
        switch (value) {
          case "yes":
            confirmValidation(customer, file_name, directory);
            break;
          default:
            message(
              `${
                directory === "in" ? "Validation" : "Téléchargement"
              } annulée !`,
              "info"
            );
        }
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} title={"Visualisation"}>
        <Page>
          <Loader displayed={isLoading} />

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Themes primary={"#242a2b"} secondary={"#fabb00"}>
                <Grid item xs={2} sm={4} md={12}>
                  <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                    <InputLabel id="customer_id">Clients</InputLabel>
                    <Select
                      labelId="customer_id"
                      id="customer_id"
                      value={dataFilter.customer}
                      label="Clients"
                      onChange={handleChange}
                      name="customer"
                    >
                      {customers.map((customer) => (
                        <MenuItem key={customer.name} value={customer.name}>
                          {customer.name.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Choisir un client</FormHelperText>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 240 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        views={["day"]}
                        label="Date"
                        inputFormat="DD/MM/YYYY"
                        value={dataFilter.createdAt}
                        onChange={handleChangeDate}
                        name="createdAt"
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            {...params}
                            helperText={params?.inputProps?.placeholder}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                    <InputLabel id="path_id">Répertoire</InputLabel>
                    <Select
                      labelId="path_id"
                      id="path_id"
                      value={dataFilter.directory}
                      label="Répertoire"
                      onChange={handleChange}
                      name="directory"
                    >
                      {path.map((item) => (
                        <MenuItem key={item.id} value={item.slug}>
                          {item.label.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Choisir un répertoire</FormHelperText>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Button
                      onClick={handleFilter}
                      variant="contained"
                      endIcon={<ScienceIcon />}
                    >
                      Filtrer
                    </Button>
                  </FormControl>
                </Grid>
              </Themes>
            </Grid>
            <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 12 }}>
              <Themes primary={"#242a2b"} secondary={"#fabb00"}>
                <Grid item xs={6}>
                  <Item>
                    <Grid container spacing={2} columns={12}>
                      <Grid item xs={12}>
                        <Badge
                          badgeContent={
                            recordFiles["sourceFiles"]
                              ? recordFiles.sourceFiles.length
                              : 0
                          }
                          color="secondary"
                          showZero
                        >
                          <Chip
                            avatar={<Avatar>S</Avatar>}
                            color="primary"
                            label="Répertoire source"
                          />
                        </Badge>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                        {recordFiles["sourceFiles"] ? (
                          recordFiles.sourceFiles.length > 0 ? (
                            <>
                              <Collapse in={true}>
                                <Alert
                                  icon={<TextSnippetIcon fontSize="small" />}
                                  sx={{ mb: 2 }}
                                >
                                  {`Liste des fichiers vanant de ${dataFilter.customer.toUpperCase()}, le ${dateFormat(
                                    dataFilter.createdAt
                                  )} dans le répertoire ${
                                    path.filter(
                                      (item) =>
                                        item.slug === dataFilter.directory
                                    )[0]?.label
                                  }`}
                                </Alert>
                              </Collapse>
                              <DataTable
                                data={recordFiles.sourceFiles}
                                tab_name={"source"}
                                directory={dataFilter.directory}
                                customer={
                                  customers.filter(
                                    (item) => item.name === dataFilter.customer
                                  )[0]
                                }
                                isAdmin={auth.isAdmin}
                                handleClickOpenDialog={handleClickOpenDialog}
                              />
                            </>
                          ) : (
                            !isLoading && (
                              <EmptySource elevation={0}>
                                Aucune donnée disponible
                              </EmptySource>
                            )
                          )
                        ) : (
                          !isLoading && (
                            <EmptySource elevation={0}>
                              Aucune donnée disponible
                            </EmptySource>
                          )
                        )}
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <Grid container spacing={2} columns={12}>
                      <Grid item xs={12}>
                        <Badge
                          badgeContent={
                            recordFiles["destinationFiles"]
                              ? recordFiles.destinationFiles.length
                              : 0
                          }
                          color="primary"
                          showZero
                        >
                          <Chip
                            avatar={<Avatar>D</Avatar>}
                            color="secondary"
                            label="Répertoire de destination"
                          />
                        </Badge>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                        {recordFiles["destinationFiles"] ? (
                          recordFiles.destinationFiles.length > 0 ? (
                            <>
                              <Collapse in={true}>
                                <Alert
                                  icon={<TextSnippetIcon fontSize="small" />}
                                  sx={{ mb: 2 }}
                                >
                                  {`Liste des fichiers reçu de ${dataFilter.customer.toUpperCase()}, le ${dateFormat(
                                    dataFilter.createdAt
                                  )} dans le répertoire ${
                                    path.filter(
                                      (item) =>
                                        item.slug === dataFilter.directory
                                    )[0]?.label
                                  }`}
                                </Alert>
                              </Collapse>
                              <DataTable
                                data={recordFiles.destinationFiles}
                                handleClick={handleValidation}
                                tab_name={"destination"}
                                directory={dataFilter.directory}
                                customer={
                                  customers.filter(
                                    (item) => item.name === dataFilter.customer
                                  )[0]
                                }
                                isAdmin={auth.isAdmin}
                              />
                            </>
                          ) : (
                            !isLoading && (
                              <EmptySource elevation={0}>
                                Aucune donnée disponible
                              </EmptySource>
                            )
                          )
                        ) : (
                          !isLoading && (
                            <EmptySource elevation={0}>
                              Aucune donnée disponible
                            </EmptySource>
                          )
                        )}
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </Themes>
            </Grid>
          </Box>
        </Page>
      </Wrapper>
      <FullScreenDialog
        open={show}
        item={item}
        handleClickCloseDialog={handleClickCloseDialog}
        handleValidation={handleValidation}
      />
    </>
  );
};

export default Validation;
