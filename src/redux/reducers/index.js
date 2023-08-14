import { combineReducers } from "redux";

import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./usersReducer";
import customers from "./customersReducer";
import customer_files from "./customerFileReducer";
import monitoring from "./customerMonitoringReducer";

export default combineReducers({
  auth,
  token,
  users,
  customers,
  customer_files,
  monitoring,
});
