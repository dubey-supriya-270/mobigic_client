import React from "react";
import { SignIn } from "./components/sign/Sign";
import { UserContextProvider } from "./contexts/User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoadingContextProvider } from "./contexts/Loading";
import { UserFilesContextProvider } from "./contexts/UserFiles";
import axios from "axios";
import { FileComponent } from "./components/userFile";
import { SignUp } from "./components/signUp/SignUp";

const App: React.FC = () => {
  //Check for existence of a token.
  const token: string | null = localStorage.getItem("MOBIGIC-CLIENT:token");
  //If token is present, add it to headers of all requests
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return (
    //Provide the loading and user context to all routes.
    <LoadingContextProvider>
      <UserContextProvider>
        <UserFilesContextProvider>
          {/* Setup the routes */}
          <Router>
            <Switch>
              {/* Login Screen */}
              <Route exact path="/sign-in" component={SignIn} />

              {/* Sign Up Screen */}
              <Route exact path="/sign-up" component={SignUp} />

              {/* File Screen */}
              <Route exact path="/" component={FileComponent} />
            </Switch>
          </Router>
        </UserFilesContextProvider>
      </UserContextProvider>
    </LoadingContextProvider>
  );
};

export default App;
