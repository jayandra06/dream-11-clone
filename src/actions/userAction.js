import axios from "axios";

import {
  ADD_CONFETTI,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REMOVE_CONFETTI,
  URL,
} from "../constants/userConstants";

const headers = {
  Accept: "application/json",
};
export const register = (myform) => async (dispatch) => {
  try {
    console.log(myform);
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await axios.post(`${URL}/auth/register`, {
      myform,
    });
    console.log(data);
    localStorage.setItem("server_token", data.server_token);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (myform) => async (dispatch) => {
  try {
    console.log(myform, "huccha");
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`${URL}/auth/login`, {
      myform,
    });
    console.log(data, "hucchi");
    localStorage.setItem("token", data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const forgot = (email) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.get(`${URL}/auth/forgot-password/${email}`);
    localStorage.setItem("token", data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const addconfetti = () => async (dispatch) => {
  try {
    dispatch({ type: ADD_CONFETTI });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const removeconfetti = () => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CONFETTI });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const servertoken =
      localStorage.getItem("token") && localStorage.getItem("token");
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios(`${URL}/auth/loaduser`, {
      method: "get",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        servertoken,
      },
    });
    if (data.message) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.message });
    }
  } catch (error) {
    console.log(error);
  }
};
