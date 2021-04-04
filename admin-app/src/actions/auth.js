import axios from "../helpers/axios";
import { user1 } from "./constants";
export const login = (users) => {
  return async (dispatch) => {
    dispatch({ type: user1.LOGIN_REQUEST });
    const response = await axios.post("/admin/signin", { ...users });
    if (response.status == 200) {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: user1.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    }
    if (response.status == 400) {
      dispatch({
        type: user1.LOGIN_FAILURE,
        payload: { error: response.data },
      });
    }
  };
};
export const IslogggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: user1.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: user1.LOGIN_FAILURE,
        payload: {
          error: "failed to login try again entering password and email",
        },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: user1.LOGOUT_REQUEST,
    });
    const res = await axios.post("/admin/signout");
    if (res.status == 200) {
      window.localStorage.clear();
      dispatch({
        type: user1.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: user1.LOGOUT_FAILURE,
        payload: { error: res.data.err },
      });
    }
  };
};
