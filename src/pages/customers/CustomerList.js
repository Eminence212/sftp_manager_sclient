import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/layaout-page/Page";
import Wrapper from "../wrapper/Wrapper";
import "./style.css";
import {
  dispatchGetAllCustomers,
  fetchAllCustomers,
  searchCustomers,
} from "../../redux/actions/customersAction";
import {
  fetchAllTypes,
  dispatchGetAllTypes,
} from "../../redux/actions/typeAction";
import { dispatchGetAllUsers } from "../../redux/actions/usersAction";
import Loader from "../../components/Loader/Loader";
import { message } from "../../components/Alert/Notification";
import PageHeader from "../../components/Header/PageHeader";
import GroupIcon from "@mui/icons-material/Group";
import Register from "./Form/Register";
import { isEmpty } from "../../utils/validation";
import { ApiBase } from "../../utils/config/apiBase";
import swal from "@sweetalert/with-react";
import DataTable from "./Table/DataTable";
import { read, utils } from "xlsx";
const initialState = {
  id: 0,
  name: "",
  typeId: 0,
  userId: 0,
  lot: [],
  err: "",
  success: "",
};

const CustomerList = ({ open, setOpen, match }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query } = useParams();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const customers = useSelector((state) => state.customers);
  const types = useSelector((state) => state.types);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [show, setShow] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [customer, setCustomer] = useState({
    ...initialState,
    userId: auth.user.id,
  });

  const { name, typeId, userId, err, success } = customer;

  const handleClose = () => {
    setShow(false);
    setIsSave(false);
    setCustomer({
      ...initialState,
      userId: auth.user.id,
    });
  };
  const handleShow = () => {
    setShow(true);

    setCustomer({
      ...initialState,
      userId: auth.user.id,
    });
  };



  const fetchData = async () => {
    const response = await fetchAllCustomers(token);
    dispatch(dispatchGetAllCustomers(response));
    const res = await fetchAllTypes(token);
    dispatch(dispatchGetAllTypes(res));
  };
  const searchData = async (q) => {
    const response = await searchCustomers(token, q);
    console.log({ response });
    dispatch(dispatchGetAllCustomers(response));
    return response;
  };

  useEffect(() => {
    fetchData();
    setIsLoading(false);
    setTimeout(() => {
      setIsFetching(false);
      setCustomer({
        ...initialState,
        userId: auth.user.id,
      });
    }, 1000);
  }, [token, auth.isAdmin, dispatch, callback, auth.user.id]);
  useEffect(() => {
    setIsSearched(query !== undefined);
    searchData(query);
  }, [query]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setCustomer({
      ...customer,
      [name]: name !== "typeId" ? value : parseInt(value),
      err: "",
      success: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (customer.id === 0) {
      // Add
      if (isEmpty(name))
        return setCustomer({
          ...customer,
          err: "Veuillez saisir le nom du client.",
          success: "",
        });
      if (isEmpty(typeId))
        return setCustomer({
          ...customer,
          err: "Veuillez sélectionner le type de client",
          success: "",
        });

      try {
        setIsLoading(true);
        handleClose();

        const res = await ApiBase.post(
          "/customer/add",
          {
            name,
            typeId,
            userId,
          },
          {
            headers: { Authorization: token },
          }
        );
        setTimeout(async () => {
          setIsLoading(false);
          setCallback(!callback);
          setCustomer({
            ...customer,
            err: "",
            success: res.data.msg,
          });
        }, 1000);
      } catch (error) {
        setIsLoading(false);

        error.response.data.msg &&
          setCustomer({
            ...customer,
            err: error.response.data.msg,
            success: "",
          });
      }
    } else {
      // Update
      if (isEmpty(name))
        return setCustomer({
          ...customer,
          err: "Veuillez saisir le nom du client.",
          success: "",
        });
      if (isEmpty(typeId))
        return setCustomer({
          ...customer,
          err: "Veuillez sélectionner le type de client",
          success: "",
        });
      try {
        setIsLoading(true);
        setShow(false);
        const res = await ApiBase.patch(
          `/customer/update/${customer.id}`,
          {
            name,
            typeId,
            userId,
          },
          {
            headers: { Authorization: token },
          }
        );

        setTimeout(async () => {
          setIsLoading(false);
          setCallback(!callback);
          handleClose();
          setCustomer({
            ...customer,
            err: "",
            success: res.data.msg,
          });
        }, 1000);
      } catch (error) {
        setIsLoading(false);

        error.response.data.msg &&
          setCustomer({
            ...customer,
            err: error.response.data.msg,
            success: "",
          });
      }
    }
  };
  const handleSubmitMany = async (e) => {
    e.preventDefault();
    if (customer.lot <= 0)
      return setCustomer({
        ...customer,
        err: "Veuillez sélectionner la liste des clients.",
        success: "",
      });

    try {
      setIsLoading(true);
      handleClose();

      const res = await ApiBase.post(
        "/customer/add/many",
        {
          customers: formatCustomer(customer),
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log({ res });
      setTimeout(async () => {
        setIsLoading(false);
        setCallback(!callback);
        setCustomer({
          ...customer,
          err: "",
          success: res.data.msg,
        });
      }, 1000);
    } catch (error) {
      setIsLoading(false);

      error.response.data.msg &&
        setCustomer({
          ...customer,
          err: error.response.data.msg,
          success: "",
        });
    }
  };
  const destroy = async (id) => {
    try {
      setIsLoading(true);
      const res = await ApiBase.delete(`/customer/delete/${id}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
      setTimeout(() => {
        setIsLoading(false);
        setCallback(!callback);
        setCustomer({
          ...customer,
          err: "",
          success: res.data.msg,
        });
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      error.response.data.msg &&
        setCustomer({
          ...customer,
          err: error.response.data.msg,
          success: "",
        });
    }
  };
  const handleDelete = async (data) => {
    swal("Êtes-vous sûr de vouloir supprimer :\n " + data.name + " ? ", {
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
          destroy(data.id);
          break;
        default:
          message("Suppression annulée !", "info");
          navigate("/customers");
      }
    });
  };
  const showDataToEdit = ({ id, name, typeId, userId }) => {
    setCustomer({
      ...customer,
      id: id,
      name: name,
      typeId,
      userId,
      err: "",
      success: "",
    });
    setShow(true);
  };
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);

        setCustomer({ ...customer, lot: json });
        setIsSave(json.length > 0);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const formatCustomer = (data) => {
    const { userId, lot } = data;

    return lot.map((value) => {
      const typeIdOld = types.filter(
        (type) => type.description.toLowerCase() === value.Type.toLowerCase()
      );

      return {
        name: value.Nom.toUpperCase(),
        userId,
        typeId: typeIdOld[0].id,
      };
    });
  };

  return (
    <Wrapper open={open} setOpen={setOpen} title={"Liste des clients"}>
      <Page>
        <Loader displayed={isFetching || isLoading} />
        {!isLoading && err ? message(err, "error") : ""}
        {!isLoading && success ? message(success, "success") : ""}
        <PageHeader
          title={"Liste des clients"}
          handleClose={handleClose}
          handleShow={handleShow}
        >
          <GroupIcon fontSize="large" />
        </PageHeader>
        {!isFetching ? (
          <DataTable
            data={customers}
            handleDelete={handleDelete}
            showData={showDataToEdit}
          />
        ) : (
          ""
        )}
        <Register
          customer={customer}
          types={types}
          show={show}
          auth={auth}
          isSave={isSave}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleChangeInput={handleChangeInput}
          readUploadFile={readUploadFile}
          handleSubmitMany={handleSubmitMany}
        />
      </Page>
    </Wrapper>
  );
};

export default CustomerList;
