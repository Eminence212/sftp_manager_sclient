import ACTIONS from "../actions";

const initialState = {
  user: [],
  isLogged: false,
  isAdmin: false,
  isLoading : false
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { ...state, isLogged: true ,isLoading:true};
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
        isLoading: false,
        isLogged: true,
      };
    default:
      return state;
  }
};
export default authReducer