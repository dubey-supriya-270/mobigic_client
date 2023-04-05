import {
  UPLOAD_FILES,
  UPLOAD_FILES_ERROR,
  GET_ALL_FILES,
  GET_ALL_FILES_ERROR,
  CLEAR_ERROR,
  DELETE_FILE,
  DELETE_FILE_ERROR,
  VERIFY_UNIQUE_CODE,
  VERIFY_UNIQUE_CODE_ERROR,
} from "../actions/Types";

//exporting types for actions of user Services
export type Actions =
  | {
      type: typeof UPLOAD_FILES;
      payload: any;
    }
  | {
      type: typeof UPLOAD_FILES_ERROR;
      payload: string;
    }
  | {
      type: typeof GET_ALL_FILES;
      payload: any;
    }
  | {
      type: typeof GET_ALL_FILES_ERROR;
      payload: string;
    }
  | {
      type: typeof CLEAR_ERROR;
    }
  | {
      type: typeof DELETE_FILE;
      payload: any;
    }
  | {
      type: typeof DELETE_FILE_ERROR;
      payload: string;
    }
  | {
      type: typeof VERIFY_UNIQUE_CODE;
      payload: string;
    }
  | {
      type: typeof VERIFY_UNIQUE_CODE_ERROR;
      payload: string;
    };

//BillerInterface to define the State type for the state of the reducer
interface IUserService {
  uploadFileError: string | null;
  uploadFileSuccess: any | null;
  allFiles: any;
  allFilesError: string | null;
  deleteFileError: string | null;
  deleteFileSuccess: string | null;
  uniqueCodeError: string | null;
  uniqueCodeSuccess: string | null;
}

//State type for defining the state of the reducer
export type State = IUserService;

//Initial state of the reducer of type State
export const initialState: State = {
  uploadFileError: null,
  uploadFileSuccess: null,
  allFiles: [],
  allFilesError: null,
  deleteFileError: null,
  deleteFileSuccess: null,
  uniqueCodeError: null,
  uniqueCodeSuccess: null,
};

//BillerSearch reducer which takes a state and an action param
export const Library = (
  state: State = initialState,
  action: Actions
): State => {
  //switch between action.type
  switch (action.type) {
    case UPLOAD_FILES:
      return {
        ...state,
        uploadFileSuccess: action.payload,
      };
    case UPLOAD_FILES_ERROR:
      return {
        ...state,
        uploadFileError: action.payload
          ? action.payload
          : "Unable to upload image.Please try again later.",
      };
    case GET_ALL_FILES:
      return {
        ...state,
        allFiles: action.payload,
      };
    case GET_ALL_FILES_ERROR:
      return {
        ...state,
        allFilesError: action.payload
          ? action.payload
          : "Unable to fetch images at this moment.",
      };
    case DELETE_FILE:
      return {
        ...state,
        deleteFileSuccess: action.payload,
      };
    case DELETE_FILE_ERROR:
      return {
        ...state,
        deleteFileError: action.payload
          ? action.payload
          : "Unable to delete image. Please try again later.",
      };
    case VERIFY_UNIQUE_CODE:
      return {
        ...state,
        uniqueCodeSuccess: action.payload,
      };
    case VERIFY_UNIQUE_CODE_ERROR:
      return {
        ...state,
        uniqueCodeError: action.payload
          ? action.payload
          : "Unable to verify unique code. Please try again later.",
      };
    case CLEAR_ERROR:
      return {
        ...state,
        allFilesError: null,
        uploadFileSuccess: null,
        uploadFileError: null,
        deleteFileError: null,
        deleteFileSuccess: null,
      };

    //return state as it is if action is not one of the listed types
    default:
      return state;
  }
};
