import axios from "../helpers/axios";
import { userSignUp } from "./constants";

export const SignUp = (users) => {
  return async (dispatch) => {
    dispatch({ type: userSignUp.SIGNUP_REQUEST });
    const response = await axios.post("/admin/signUp", { ...users });
    if (response.status === 201) {
      const { message } = response.data;
      dispatch({
        type: userSignUp.SIGNUP_SUCCESS,
        payload: { message },
      });
    }
    if (response.status == 400) {
      dispatch({
        type: userSignUp.SIGNUP_FAILURE,
        payload: { error: response.data.error },
      });
    }
  };
};
