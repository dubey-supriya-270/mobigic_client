import React, { useContext, useState } from "react";
import { TextField } from "../common/TextField";
import { Button } from "../common/Button";
import "../styles/sign-in.css";
import { UserContext } from "../../contexts/User";
import { LoadingContext } from "../../contexts/Loading";
import { signIn } from "../../actions/user";
import { Link } from "react-router-dom";
import { History } from "history";

//Interface for props
interface Props {
  history?: History; //Optional history parameter which is passed by the Router
}
interface IUser {
  userName: string;
  password: string;
}
//SignIn component
export const SignIn: React.FC<Props> = (props) => {
  const [user, setUser] = useState<IUser>({ userName: "", password: "" });
  const [error, setError] = useState<string>("");
  //Get the state and the dispatch properties form the UserContext and rename them to userState and userDispatch resp.
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  //Get the state and the dispatch properties form the LoadingContext and rename them to loadingState and loadingDispatch resp.
  const { dispatch: loadingDispatch } = useContext(LoadingContext);

  const handleChange = (e: any) => {
    setError("");
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //handleClick method that is executed when the Sign In button is clicked
  const handleClick = () => {
    if (user.userName && user.password) {
      signIn(
        user.userName,
        user.password,
        props.history
      )(userDispatch, loadingDispatch);
    } else {
      setError("Please fill all details");
    }
  };

  return (
    <div className="signin-container">
      <div className="form">
        <h2>Sign In</h2>
        <div className="form-content">
          <TextField
            value={user.userName}
            placeholder="Enter your username"
            label="User Name"
            handleChange={handleChange}
            id="sign-in_user_name_input_field"
            type="text"
            name="userName"
          />
          <TextField
            value={user.password}
            placeholder="Enter Password"
            label="Password"
            handleChange={handleChange}
            id="sign-in_password_input_field"
            type="password"
            name="password"
          />

          <Button
            value="Sign In"
            handleClick={handleClick}
            id="sign-in_button"
          />
          <span className="dont-have-account">
            Don't have an account?
            <Link to="sign-up"> Sign up</Link>
          </span>
          {error !== "" && <p className="sign-in-error">{error}</p>}
          {userState.error !== "" && (
            <p className="sign-in-error">{userState.error}</p>
          )}
        </div>
      </div>
    </div>
  );
};
