import React, { useEffect, useState } from "react";
import PageHeader from "../../components/Header/PageHeader";
import Page from "../../components/layaout-page/Page";
import Wrapper from "../wrapper/Wrapper";
import GroupIcon from "@mui/icons-material/Group";

import Loader from "../../components/Loader/Loader";
import "./Users.css";

import { useDispatch, useSelector } from "react-redux";
import {
  dispatchGetAllUsers,
  fetchAllUsers,
} from "../../redux/actions/usersAction";
import { isEmpty, isLength, isMatch } from "../../utils/validation";
import { ApiBase } from "../../utils/config/apiBase";
import { useNavigate } from "react-router-dom";
import DataTable from "./Table/DataTable";
import Register from "./Form/Register";
import { message } from "../../components/Alert/Notification";
import swal from "@sweetalert/with-react";
//
const initialState = {
  id: 0,
  name: "",
  password: "",
  cf_password: "",
  role: 0,
  err: "",
  success: "",
};
const UserList = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [user, setUser] = useState(initialState);
  const { name, password, cf_password, role, err, success } = user;
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setUser(initialState);
  };
  const handleShow = () => {
    setShow(true);
    setUser(initialState);
  };
  // From redux
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  //
  useEffect(() => {
    async function fetchData() {
      const response = await fetchAllUsers(token);
      dispatch(dispatchGetAllUsers(response));
    }
    fetchData();

    setIsLoading(false);
    setTimeout(() => {
      setIsFetching(false);
      setUser(initialState);
    }, 1000);
  }, [token, auth.isAdmin, dispatch, callback]);
  // Méthodes
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: name !== "role" ? value : parseInt(value),
      err: "",
      success: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.id === 0) {
      // Add
      if (isEmpty(name))
        return setUser({
          ...user,
          err: "Veuillez saisir le nom d'utilisateur.",
          success: "",
        });
      if (isEmpty(password))
        return setUser({
          ...user,
          err: "Veuillez saisir le mot de passe",
          success: "",
        });
      if (isEmpty(cf_password))
        return setUser({
          ...user,
          err: "Veuillez saisir le mot de passe de confirmation.",
          success: "",
        });
      if (!isMatch(password, cf_password))
        return setUser({
          ...user,
          err: "Les mots de passe ne correspondent pas.",
          success: "",
        });
      if (isLength(password))
        return setUser({
          ...user,
          err: "Le mot de passe doit comporter au moins 6 caractères.",
          success: "",
        });
      try {
        setIsLoading(true);
        handleClose();

        const res = await ApiBase.post(
          "/user/register",
          {
            name,
            password,
            role,
          },
          {
            headers: { Authorization: token },
          }
        );
        setTimeout(async () => {
          setIsLoading(false);
          setCallback(!callback);
          setUser({
            ...user,
            err: "",
            success: res.data.msg,
          });
        }, 1000);
      } catch (error) {
        setIsLoading(false);

        error.response.data.msg &&
          setUser({
            ...user,
            err: error.response.data.msg,
            success: "",
          });
      }
    } else {
      // Update
      if (isEmpty(name))
        return setUser({
          ...user,
          err: "Veuillez saisir le nom d'utilisateur.",
          success: "",
        });
      try {
        setIsLoading(true);
        setShow(false);
        const res = await ApiBase.patch(
          `/user/update/${user.id}`,
          {
            name,
            role,
          },
          {
            headers: { Authorization: token },
          }
        );

        setTimeout(async () => {
          setIsLoading(false);
          setCallback(!callback);
          handleClose();
          setUser({
            ...user,
            err: "",
            success: res.data.msg,
          });
        }, 1000);
      } catch (error) {
        setIsLoading(false);

        error.response.data.msg &&
          setUser({
            ...user,
            err: error.response.data.msg,
            success: "",
          });
      }
    }
  };
  const destroy = async (id) => {
    try {
      const { user } = auth;
      if (user.id === id) {
        message("Impossible de vous désactiver !", "warning");
        navigate("/users");
      } else {
        setIsLoading(true);
        const res = await ApiBase.delete(`/user/delete/${id}`, {
          headers: { Authorization: token },
        });
        setCallback(!callback);
        setTimeout(() => {
          setIsLoading(false);
          setCallback(!callback);
          setUser({
            ...user,
            err: "",
            success: res.data.msg,
          });
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      error.response.data.msg &&
        setUser({
          ...user,
          err: error.response.data.msg,
          success: "",
        });
    }
  };
  const Disable = async (id) => {
    try {
      const { user } = auth;
      if (user.id === id) {
        message("Impossible de vous désactiver !", "warning");
        navigate("/users");
      } else {
        setIsLoading(true);
        const res = await ApiBase.patch(
          `/user/update_role/${id}`,
          { role: -1 },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
        setTimeout(() => {
          setIsLoading(false);
          setCallback(!callback);

          setUser({
            ...user,
            err: "",
            success: res.data.msg,
          });
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      error.response.data.msg &&
        setUser({
          ...user,
          err: error.response.data.msg,
          success: "",
        });
    }
  };
  const Enable = async (id) => {
    try {
      const { user } = auth;
      if (user.id === id) {
        message("Impossible de vous activer !", "warning");
        navigate("/users");
      } else {
        setIsLoading(true);
        const res = await ApiBase.patch(
          `/user/update_role/${id}`,
          { role: 0 },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
        setTimeout(() => {
          setIsLoading(false);
          setCallback(!callback);

          setUser({
            ...user,
            err: "",
            success: res.data.msg,
          });
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      error.response.data.msg &&
        setUser({
          ...user,
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
          navigate("/users");
      }
    });
  };
  const handleDisable = async (data) => {
    swal("Êtes-vous sûr de vouloir désctiver :\n " + data.name + " ? ", {
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
          Disable(data.id);
          break;
        default:
          message("Désactivation annulée !", "info");
          navigate("/users");
      }
    });
  };
  const handleEnable = async (data) => {
    swal(
      "Êtes-vous sûr de vouloir activer le compte de :\n " + data.name + " ? ",
      {
        buttons: {
          cancel: "Non",
          yes: {
            text: "Oui",
            value: "yes",
          },
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
      }
    ).then((value) => {
      switch (value) {
        case "yes":
          Enable(data.id);
          break;
        default:
          message("Activation annulée !", "info");
          navigate("/users");
      }
    });
  };
  const showDataToEdit = ({ id, name, role }) => {
    setUser({
      ...user,
      id: id,
      name: name,
      role: role,
      err: "",
      success: "",
    });
    setShow(true);
  };

  return (
    <Wrapper open={open} setOpen={setOpen} title={"Utilisateurs"}>
      <Page>
        <Loader displayed={isFetching || isLoading} />

        {!isLoading && err ? message(err, "error") : ""}
        {!isLoading && success ? message(success, "success") : ""}
        <PageHeader
          title={"Liste des utilisateurs"}
          handleClose={handleClose}
          handleShow={handleShow}
        >
          <GroupIcon fontSize="large" />
        </PageHeader>
        {!isFetching ? (
          <DataTable
            data={users}
            handleDelete={handleDelete}
            showData={showDataToEdit}
            handleDisable={handleDisable}
            handleEnable={handleEnable}
          />
        ) : (
          ""
        )}
        <Register
          user={user}
          show={show}
          auth={auth}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleChangeInput={handleChangeInput}
        />
      </Page>
    </Wrapper>
  );
};

export default UserList;
