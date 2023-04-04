import { startLoading, stopLoading } from "./loading";
import { Actions as LoadingActions } from "../reducers/loading";
import axios from "axios";
import {
  UPLOAD_FILES,
  UPLOAD_FILES_ERROR,
  GET_ALL_LIBRARY_FILES,
  GET_ALL_LIBRARY_FILES_ERROR,
  CLEAR_LIBRARY_ERROR,
  DELETE_GALLERY_IMAGE,
  DELETE_GALLERY_IMAGE_ERROR,
  VERIFY_UNIQUE_CODE,
  VERIFY_UNIQUE_CODE_ERROR,
} from "./Types";
import { Actions } from "../reducers/userFiles";
import { API_URL } from "./serverConnection";

//Action Creator for uploading files
export const uploadFile =
  (fileDetails: any) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);
      let formData: any = new FormData();

      formData.append("file", fileDetails);

      //fetch the results from the sign in API
      const result = await axios.post(`${API_URL}/user-file/`, formData);
      //Stop loading
      stopLoading(loadingDispatch);

      //Dispatch the result token with SIGN_IN type action
      dispatch({
        type: UPLOAD_FILES,
        payload: result.data,
      });
      // fetching all file
      getAllFiles()(dispatch, loadingDispatch);
    } catch (err: any) {
      //In case of error, stop loading
      stopLoading(loadingDispatch);
      //dispatch the error data
      dispatch({
        type: UPLOAD_FILES_ERROR,
        payload: err.response
          ? err.response.data.message
          : "Failed to connect to the server",
      });
    }
  };

//Action Creator dethcing ALl Files from DB
export const getAllFiles =
  () =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);
      //fetch the results from the sign in API
      const result = await axios.get(`${API_URL}/user-file/`);
      //Stop loading
      stopLoading(loadingDispatch);
      //Dispatch the result token with GET_ALL_LIBRARY_FILES type action
      dispatch({
        type: GET_ALL_LIBRARY_FILES,
        payload: result.data.data,
      });
      //Clear all errors in the reducer
      clearErrors(dispatch);
    } catch (err: any) {
      //In case of error, stop loading
      stopLoading(loadingDispatch);
      //dispatch the error data
      dispatch({
        type: GET_ALL_LIBRARY_FILES_ERROR,
        payload: err.response
          ? err.response.data?.message
          : "Failed to connect to the server",
      });
    }
  };

//Action Creator for Deleting Files
export const deleteFile =
  (id: string) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);
      //fetch the results from the delete image API
      const result = await axios.delete(`${API_URL}/user-file/${id}`);
      //Stop loading
      stopLoading(loadingDispatch);
      //Dispatch the result token with DELETE_GALLERY_IMAGE type action
      dispatch({
        type: DELETE_GALLERY_IMAGE,
        payload: result.data.message,
      });
      // fetching all file
      getAllFiles()(dispatch, loadingDispatch);
    } catch (err: any) {
      //In case of error, stop loading
      stopLoading(loadingDispatch);
      //dispatch the error data
      dispatch({
        type: DELETE_GALLERY_IMAGE_ERROR,
        payload: err.response
          ? err.response.data.message
          : "Failed to connect to the server",
      });
    }
  };

//Action Creator for uploading files
export const verifyUniqueCode =
  (id: string, uniqueCode: string) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);

      //fetch the results from the sign in API
      const result = await axios.post(
        `${API_URL}/user-file/verify-unique-code`,
        {
          id,
          uniqueCode,
        }
      );
      //Stop loading
      stopLoading(loadingDispatch);

      //Dispatch the result token with SIGN_IN type action
      dispatch({
        type: VERIFY_UNIQUE_CODE,
        payload: result.data.fileUrl,
      });

      return result.data.fileUrl;
    } catch (err: any) {
      //In case of error, stop loading
      stopLoading(loadingDispatch);
      //dispatch the error data
      dispatch({
        type: VERIFY_UNIQUE_CODE_ERROR,
        payload: err.response
          ? err.response.data.message
          : "Failed to connect to the server",
      });
      return false;
    }
  };

//Action creator for clearing the user reducer from errors
export const clearErrors = (dispatch: React.Dispatch<Actions>) => {
  //Dispatch CLEAR_ERRORS type
  dispatch({
    type: CLEAR_LIBRARY_ERROR,
  });
};
