import React, { useReducer, createContext } from "react";
import {
  Library,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/userFiles"; //import User reducer, initialState of that reducer, State type and Actions type

//export the UserFilesContextProvider by creating a context which has a state (initial state)
//and a function which dispatches one of the action types
export const UserFilesContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface Props {
  children: React.ReactNode;
}

//export the UserContextProvider which is a component that takes the children prop
//and acts as a wrapper to provide the user reducer the the wrapped components
export const UserFilesContextProvider: React.FC<Props> = ({ children }) => {
  //get the state and the dispatch function from the useReducer hook by using the User reducer
  const [state, dispatch] = useReducer(Library, initialState);
  //create an object called value which has the state and the dispatch function returned from the reducer
  const value = { state, dispatch };
  //wrap the children with the Provider component for the Loading Context and pass the value of the context
  return (
    <UserFilesContext.Provider value={value}>
      {children}
    </UserFilesContext.Provider>
  );
};
