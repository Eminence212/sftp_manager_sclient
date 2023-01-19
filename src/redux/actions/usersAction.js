import { ApiBase } from "../../utils/config/ApiBase";
import ACTIONS from "./index";


export const fetchAllUsers = async (token) => {
  const res = await ApiBase.get("/user/all_infor", {
    headers: { Authorization: token },
  });
  return res;
};
export const dispatchGetAllUsers = (res) => {

  return {
    type: ACTIONS.GET_ALL_USERS,
    payload: res.data,
  };
};
