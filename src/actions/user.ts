import { startLoading, stopLoading } from "./loading";
import { Actions as LoadingActions } from "../reducers/loading";
import axios from "axios";
import { SIGN_IN, ADD_USER, SIGN_IN_ERROR, ADD_USER_ERROR } from "./Types";
import { Actions } from "../reducers/user";
import { API_URL } from "./serverConnection";
import { History } from "history";

//Action Creator for Sign In
export const signIn =
  (userName: string, password: string, history: History | undefined) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);
      //fetch the results from the sign in API
      const result = await axios.post(`${API_URL}/user/login`, {
        userName,
        password,
      });

      //Get the token from the result
      const token = result.data.token;
      //Store the token in the localstorage
      localStorage.setItem("MOBIGIC-CLIENT:token", token);
      //Stop loading
      stopLoading(loadingDispatch);
      //Dispatch the result token with SIGN_IN type action
      dispatch({
        type: SIGN_IN,
        payload: token,
      });

      //Add Authorization header to all future axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //Redirect user to home screen
      history?.push("/");
    } catch (err: any) {
      //In case of error, stop loading
      stopLoading(loadingDispatch);
      //dispatch the error data
      dispatch({
        type: SIGN_IN_ERROR,
        payload: err.response
          ? err?.response?.data?.message
          : "Failed to connect to the server",
      });
    }
  };

//Action Creator for SAdd User
export const addUser =
  (userName: string, password: string, history: History | undefined) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);
      //fetch the results from the sign in API
      const result = await axios.post(`${API_URL}/user/register`, {
        userName,
        password,
      });
      //Store the token in the localstorage
      localStorage.setItem("MOBIGIC-CLIENT:token", result.data.token);
      //Stop loading
      stopLoading(loadingDispatch);
      //Dispatch the result token with SIGN_IN type action
      dispatch({
        type: ADD_USER,
        payload: result.data.message,
      });

      //Add Authorization header to all future axios requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      history?.push("/");
    } catch (err: any) {
      //In case of error, stop loading
      stopLoading(loadingDispatch);
      //dispatch the error data
      dispatch({
        type: ADD_USER_ERROR,
        payload: err.response
          ? err.response?.data?.message
          : "Failed to connect to the server",
      });
    }
  };
