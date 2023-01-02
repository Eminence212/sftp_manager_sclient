import "./dashboard.css";

import Wrapper from "../wrapper/Wrapper";
import Page from "../../components/layaout-page/Page";
import logo from "../../assets/img/customers.png";
import TimelineIcon from "@mui/icons-material/Timeline";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { numStr } from "../../utils/Futures";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchGetAllCustomers,
  fetchAllCustomers,
} from "../../redux/actions/customersAction";
import {
  dispatchGetAllUsers,
  fetchAllUsers,
} from "../../redux/actions/usersAction";
import Loader from "../../components/Loader/Loader";
const Dashboard = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const customers = useSelector((state) => state.customers);
  const users = useSelector((state) => state.users);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    dispatch(dispatchGetAllCustomers(await fetchAllCustomers(token)));
    dispatch(dispatchGetAllUsers(await fetchAllUsers(token)));
  };
  useEffect(() => {
    fetchData();
    setIsLoading(false);
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  }, [token, auth.isAdmin, dispatch, auth.user.id]);
  return (
    <Wrapper open={open} setOpen={setOpen} title={"Tableau de bord"}>
      <Page>
        <Loader displayed={isFetching || isLoading} />
        <div className="main__container">
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
                    {`Utilisateur${users.length > 1 && "s"}`}
                  </p>
                  <p>
                    <span className="cart_number">{numStr(users.length)}</span>
                  </p>
                </div>
              </div>
            )}

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
                  {customers.length > 1
                    ? "Clients blackistés"
                    : "Client blackisté"}
                </p>
                <p>
                  <span className="cart_number">
                    {numStr(customers.length)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </Wrapper>
  );
};

export default Dashboard;
