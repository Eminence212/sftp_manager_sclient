import ACTIONS from "../actions";

const customers = [];
const customersReducer = (state = customers, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_CUSTOMERS:
      return action.payload;
    default:
      return state;
  }
};
export default customersReducer;
