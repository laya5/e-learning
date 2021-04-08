import axios from "../helpers/axios";
import React from "react";
import { Category, CreateCategory } from "./constants";
export const getCategory = () => {
  return async (dispatch) => {
    dispatch({ type: Category.CATEGORY_REQUEST });
    const gc = await axios.get("/categories/find");
    if (gc.status === 200) {
      const { List } = gc.data;
      dispatch({
        type: Category.CATEGORY_SUCCESS,
        payload: {
          category: List,
        },
      });
    } else {
      dispatch({
        type: Category.CATEGORY_FAILURE,
        payload: { error: gc.data.error },
      });
    }
  };
};
export const addCategory = (form) => {
  return async (dispatch) => {
    const ac = await axios.post("http://localhost:3000/categories/new", form);
    dispatch({
      type: Category.CATEGORY_ADD,
    });
    console.log("this is result");
    console.log(ac.data.result);
    if (ac.status == 200) {
      dispatch({
        type: Category.CATEGORY_ADDSUCCESS,
        payload: {
          category: ac.data.result,
        },
      });
    } else {
      dispatch({
        type: Category.CATEGORY_ADDFAILURE,
        payload: {
          message: ac.data.message,
        },
      });
    }
  };
};
