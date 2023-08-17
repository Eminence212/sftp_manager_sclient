import "./dashboard.css";

import Wrapper from "../wrapper/Wrapper";
import Page from "../../components/layaout-page/Page";
import TimelineIcon from "@mui/icons-material/Timeline";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
import GppBadIcon from "@mui/icons-material/GppBad";

import { numStr } from "../../utils/Futures";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchGetAllCustomerMonitoring,
  dispatchGetAllCustomers,
  fetchAllCustomerMonitoring,
  fetchAllCustomers,
} from "../../redux/actions/customersAction";
import {
  dispatchGetAllUsers,
  fetchAllUsers,
} from "../../redux/actions/usersAction";
import Loader from "../../components/Loader/Loader";
import { Badge } from "@mui/material";
import Themes from "../../utils/theme/Themes";
import { formatMonitoringData } from "../../utils/Monitoring";
import DataTable from "./DataTable";

const Dashboard = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const monitoring = useSelector((state) => state.monitoring);
  const customers = useSelector((state) =>
    auth.isAdmin
      ? state.customers
      : state.customers.filter((item) => item.User.id === auth.user.id)
  );
  const users = useSelector((state) => state.users);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [monitoringDate, setMonitoringDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      dispatch(dispatchGetAllCustomers(await fetchAllCustomers(token)));
      dispatch(
        dispatchGetAllCustomerMonitoring(
          await fetchAllCustomerMonitoring(token, monitoringDate)
        )
      );
      dispatch(dispatchGetAllUsers(await fetchAllUsers(token)));
    };
    fetchData();
    setIsLoading(false);
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  }, [token, auth.isAdmin, dispatch, auth.user.id, monitoringDate]);

  const { totalReceived, totalExecuted, totalError, rows } =
    formatMonitoringData(monitoring);

  useEffect(() => {
    const interval = setInterval(() => setMonitoringDate(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Wrapper open={open} setOpen={setOpen} title={"Tableau de bord"}>
      <Page>
        <Loader displayed={isFetching || isLoading} />
        <div className="main__container">
          {/* Users */}
          <div className="main__cards">
            {auth.isAdmin && (
              <div className="card">
                <Diversity3Icon
                  fontSize="large"
                  sx={{
                    color: "black",
                    background: "#fabb00",
                    borderRadius: "5px",
                    padding: "5px",
                    marginBottom: "5px",
                  }}
                />
                <div className="card_inner">
                  <p className="cart_title">
                    {`Utilisateur${users.length > 1 ? "s" : ""}`}
                  </p>
                  <p>
                    <span className="cart_number">{numStr(users.length)}</span>
                  </p>
                </div>
              </div>
            )}
            {/* Clients */}
            <div className="cart">
              <TimelineIcon
                fontSize="large"
                sx={{
                  color: "#fabb00",
                  background: "black",
                  borderRadius: "5px",
                  padding: "5px",
                  marginBottom: "5px",
                }}
              />
              <div className="card_inners">
                <p className="cart_title">
                  {customers.length > 1 ? "Clients" : "Client"}
                </p>
                <p>
                  <span className="cart_number">
                    {numStr(customers.length)}
                  </span>
                </p>
                <p
                  style={{
                    display: "flex",
                    columnGap: "16px",
                  }}
                >
                  <Themes primary={"#242a2b"} secondary={"#fabb00"}>
                    <Badge
                      badgeContent={
                        customers.filter((item) => item.enable).length
                      }
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      color="primary"
                      showZero
                    >
                      <PersonIcon
                        sx={{
                          color: "black",
                          background: "#fabb00",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      />
                    </Badge>
                    <Badge
                      badgeContent={
                        customers.filter((item) => !item.enable).length
                      }
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      color="primary"
                      showZero
                    >
                      <PersonOffIcon
                        sx={{
                          color: "black",
                          background: "#fabb00",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      />
                    </Badge>
                    <Badge
                      badgeContent={
                        customers.filter((item) => item.autovalidation).length
                      }
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      color="primary"
                      showZero
                    >
                      <MotionPhotosAutoIcon
                        sx={{
                          color: "black",
                          background: "#fabb00",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      />
                    </Badge>
                  </Themes>
                </p>
              </div>
            </div>
            {/* Total Inbox */}

            <div className="cart">
              <ForwardToInboxIcon
                fontSize="large"
                sx={{
                  color: "#fabb00",
                  background: "black",
                  borderRadius: "5px",
                  padding: "5px",
                  marginBottom: "5px",
                }}
              />
              <div className="card_inners card_inner2">
                <p className="cart_title">Reçu</p>
                <p>
                  <span className="cart_number">{numStr(totalReceived)}</span>
                </p>
              </div>
            </div>
            {/* Total Archive */}

            <div className="cart">
              <BrowserUpdatedIcon
                fontSize="large"
                sx={{
                  color: "green",
                  background: "black",
                  borderRadius: "5px",
                  padding: "5px",
                  marginBottom: "5px",
                }}
              />
              <div className="card_inners card_inner2">
                <p className="cart_title">Exécutés</p>
                <p>
                  <span className="cart_number">{numStr(totalExecuted)}</span>
                </p>
              </div>
            </div>
            {/* Total Erreur */}
            <div className="cart">
              <GppBadIcon
                fontSize="large"
                sx={{
                  color: "red",
                  background: "black",
                  borderRadius: "5px",
                  padding: "5px",
                  marginBottom: "5px",
                }}
              />
              <div className="card_inners card_inner2">
                <p className="cart_title">Erreurs</p>
                <p>
                  <span className="cart_number">{numStr(totalError)}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="main__cards">
            <DataTable rows={rows} />
          </div>
        </div>
      </Page>
    </Wrapper>
  );
};

export default Dashboard;
