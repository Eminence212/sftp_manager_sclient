import React, { useEffect, useState } from "react";
import Wrapper from "../../pages/wrapper/Wrapper";
import PageHeader from "../Header/PageHeader";
import Page from "../layaout-page/Page";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { formatDate } from "../../utils/Futures";
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

const Validation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const files = useSelector((state) => state.customer_files);
  const [dataFilter, setDataFilter] = useState(initialState);

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
    const response = await fetchAllCustomerFiles(token, dataFilter);
    dispatch(dispatchGetAllCustomerFiles(response));

  };
    console.log({ files });
  return (
    <Wrapper title={"Intégration manuelle"}>
      <Page>
        <PageHeader title={""}></PageHeader>
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
                    Filter
                  </Button>
                </FormControl>
              </Grid>
            </Themes>
          </Grid>
        </Box>
      </Page>
    </Wrapper>
  );
};

export default Validation;
