import ACTIONS from "../actions";

const monitoring =[];
const customerMonitoringReducer = (state = monitoring, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_CUSTOMERS_MONITORING:
      return action.payload;
    default:
      return state;
  }
};
export default customerMonitoringReducer;
