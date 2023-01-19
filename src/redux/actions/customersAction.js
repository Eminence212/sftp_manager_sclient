import { ApiBase } from "../../utils/config/ApiBase";
import ACTIONS from "./index";

export const fetchAllCustomers = async (token) => {
  const res = await ApiBase.get("/customer", {
    headers: { Authorization: token },
  });

  return res;
};
export const searchCustomers = async (token, query) => {
  const res = await ApiBase.get(`/customer/search/${query}`, {
    headers: { Authorization: token },
  });
  return query ? res : await fetchAllCustomers(token);
};
export const dispatchGetAllCustomers = (res) => {
  return {
    type: ACTIONS.GET_ALL_CUSTOMERS,
    payload: res.data,
  };
};
