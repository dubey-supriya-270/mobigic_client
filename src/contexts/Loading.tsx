import React, { useReducer, createContext } from "react";
import {
  Loading,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/loading"; //import Loading reducer, initialState of that reducer, State type and Actions type

//export the LoadingContext by creating a context which has a state (initial state)
//and a function which dispatches one of the action types
export const LoadingContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface Props {
  children: React.ReactNode;
}
//export the LoadinContextProvider which is a component that takes the children prop
//and acts as a wrapper to provide the loading reducer the the wrapped components
export const LoadingContextProvider: React.FC<Props> = ({ children }) => {
  //get the state and the dispatch function from the useReducer hook by using the Loading reducer
  const [state, dispatch] = useReducer(Loading, initialState);
  //create an object called value which has the state and the dispatch function returned from the reducer
  const value = { state, dispatch };
  return (
    //wrap the children with the Provider component for the Loading Context and pass the value of the context
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
