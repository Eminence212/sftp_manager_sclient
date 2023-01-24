import { ApiBase } from "../../utils/config/ApiBase";
import { formatDate } from "../../utils/Futures";
import ACTIONS from "./index";

export const fetchAllCustomers = async (token) => {
  const res = await ApiBase.get("/customer", {
    headers: { Authorization: token },
  });

  return res;
};
export const dispatchGetAllCustomers = (res) => {
  return {
    type: ACTIONS.GET_ALL_CUSTOMERS,
    payload: res.data,
  };
};
export const searchCustomers = async (token, query) => {
  const res = await ApiBase.get(`/customer/search/${query}`, {
    headers: { Authorization: token },
  });
  return query ? res : await fetchAllCustomers(token);
};
export const fetchAllCustomerFiles = async (token, query) => {
  const { customer, createdAt, directory } = query;
 
  const res = await ApiBase.post(
    `/customer/files`,
    { customer, createdAt, directory },
    {
      headers: { Authorization: token },
    }
  );
  return res;
};
export const dispatchGetAllCustomerFiles = (res) => {
  return {
    type: ACTIONS.GET_ALL_CUSTOMER_FILES,
    payload: res.data,
  };
};
