import { user1 } from "../actions/constants";

const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  loading: true,
  authenticate: false,
  authenticating: false,
  error: null,
  message: "",
};
export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case user1.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case user1.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case user1.LOGIN_FAILURE:
      state = {
        ...state,
        authenticate: false,
        authenticating: false,
      };
      break;
    case user1.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case user1.LOGOUT_SUCCESS:
      state = {
        ...initState,
        loading: false,
      };
      break;
    case user1.LOGOUT_FAILURE:
      state = {
        ...state,
        loading: false,
        payload: action.payload.error,
      };
      break;
  }
  console.log(state);
  return state;
};
