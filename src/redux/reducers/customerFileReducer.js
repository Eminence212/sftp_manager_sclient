import ACTIONS from "../actions";

const customer_files = {};
const customerFileReducer = (state = customer_files, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_CUSTOMER_FILES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default customerFileReducer;
