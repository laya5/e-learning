import { userSignUp } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
};
export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case userSignUp.SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userSignUp.SIGNUP_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userSignUp.SIGNUP_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.error,
      };
      break;
  }
  console.log(state);
  return state;
};
