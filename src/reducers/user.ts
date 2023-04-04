import {
  SIGN_IN,
  ADD_USER,
  SIGN_IN_ERROR,
  ADD_USER_ERROR,
} from "../actions/Types";

//Actions type to accept either SIGN_IN, ADD_USER, SIGN_IN_ERROR or ADD_USER_ERROR types with a payload
//or CLEAR_ERRORS or LOGOUT types without a payload
export type Actions =
  | {
      type: typeof SIGN_IN;
      payload: string;
    }
  | {
      type: typeof ADD_USER;
      payload: string;
    }
  | {
      type: typeof SIGN_IN_ERROR;
      payload: string;
    }
  | {
      type: typeof ADD_USER_ERROR;
      payload: string;
    };
//UserInterface to define the State type for the state of the reducer
interface UserInterface {
  token: string | null;
  error: string | null;
  addUserSuccess: string | null;
}

//State type for defining the state of the reducer
export type State = UserInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  token: null,
  error: null,
  addUserSuccess: null,
};

//User reducer which takes a state and an action param
export const User = (state: State = initialState, action: Actions) => {
  //switch between action.type
  switch (action.type) {
    //if action is of type SIGN_IN or ADD_USER return the state by setting token to the payload
    case SIGN_IN:
      return {
        ...state,
        token: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        addUserSuccess: action.payload,
      };

    //if action is of type SIGN_IN_ERROR or ADD_USER_ERROR return the state by setting error to the payload
    case SIGN_IN_ERROR:
    case ADD_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
