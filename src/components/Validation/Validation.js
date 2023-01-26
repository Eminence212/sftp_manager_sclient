import React, { useEffect, useState } from "react";
import Wrapper from "../../pages/wrapper/Wrapper";
import PageHeader from "../Header/PageHeader";
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
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
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
const initialState = {
  customer: "",
  createdAt: new Date(),
  directory: "",
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
  const files = useSelector((state) => state.customer_files);
  const [dataFilter, setDataFilter] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setDataFilter({ ...dataFilter, [event.target.name]: event.target.value });
  };
  const handleChangeDate = (newValue) => {
    setDataFilter({ ...dataFilter, createdAt: newValue.$d });
  };

  const customers = useSelector((state) =>
    auth.isAdmin
      ? state.customers
      : state.customers.filter((item) => item.User.id === auth.user.id)
  );
  const fetchData = async () => {
    const response = await fetchAllCustomers(token);
    dispatch(dispatchGetAllCustomers(response));
  };
  useEffect(() => {
    fetchData();
  }, [token, auth.isAdmin, dispatch, auth.user.id]);

  const handleFilter = async () => {
    try {
      setIsLoading(true);
      const response = await fetchAllCustomerFiles(token, dataFilter);
      dispatch(dispatchGetAllCustomerFiles(response));
      setTimeout(async () => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
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
                          files["sourceFiles"] ? files.sourceFiles.length : 0
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
                      {files["sourceFiles"] ? (
                        files.sourceFiles.length > 0 ? (
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
                                    (item) => item.slug === dataFilter.directory
                                  )[0]?.label
                                }`}
                              </Alert>
                            </Collapse>
                            <DataTable data={files.sourceFiles} />
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
                          files["destinationFiles"]
                            ? files.destinationFiles.length
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
                      {files["destinationFiles"] ? (
                        files.destinationFiles.length > 0 ? (
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
                                    (item) => item.slug === dataFilter.directory
                                  )[0]?.label
                                }`}
                              </Alert>
                            </Collapse>
                            <DataTable data={files.destinationFiles} />
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
  );
};

export default Validation;
