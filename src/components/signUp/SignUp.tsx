import React, { useContext, useState } from "react";
import { TextField } from "../common/TextField";
import { Button } from "../common/Button";

import "../styles/sign-up.css";
import { UserContext } from "../../contexts/User";
import { LoadingContext } from "../../contexts/Loading";
import { addUser } from "../../actions/user";
import { Link } from "react-router-dom";
import { History } from "history";
import { validatePassword } from "../../helpers/validate";

//Interface for props
interface Props {
  history?: History; //Optional history parameter which is passed by the Router
}
interface IUser {
  userName: string;
  password: string;
  confirmPassword: string;
  passwordError: string;
}
//SignIn component
export const SignUp: React.FC<Props> = (props) => {
  const [user, setUser] = useState<IUser>({
    userName: "",
    password: "",
    confirmPassword: "",
    passwordError: "",
  });

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
      passwordError: "",
    });
  };

  //handleClick method that is executed when the Sign In button is clicked
  const handleClick = () => {
    const isValidPassword = validatePassword(user.password);
    if (
      user.userName &&
      user.password &&
      user.password === user.confirmPassword &&
      isValidPassword
    ) {
      addUser(
        user.userName,
        user.password,
        props?.history
      )(userDispatch, loadingDispatch);
    } else if (!isValidPassword) {
      setUser({
        ...user,
        passwordError:
          "Password contain alphanumeric characters and special characters and length at least 8 characters ",
      });
    } else {
      setError("Please fill all details");
    }
  };

  return (
    <div className="signup-container">
      <div className="form">
        <h2>Sign Up</h2>
        <div className="form-content">
          <TextField
            value={user.userName}
            placeholder="Enter your username"
            label="User Name"
            handleChange={handleChange}
            id="sign-up_user_name_input_field"
            type="text"
            name="userName"
          />
          <TextField
            value={user.password}
            placeholder="Enter Password"
            label="Password"
            handleChange={handleChange}
            id="sign-up_password_input_field"
            type="password"
            name="password"
          />
          <TextField
            value={user.confirmPassword}
            placeholder="Enter Confirm Password"
            label="Confirm Password"
            handleChange={handleChange}
            id="sign-up_confirm_password_input_field"
            type="password"
            name="confirmPassword"
          />

          <Button
            value="Sign Up"
            handleClick={handleClick}
            id="sign-in_button"
          />
          <span className="already-have-account">
            Already have an account?
            <Link to="sign-in"> Sign In</Link>
          </span>
          {error !== "" && <p className="sign-up-error">{error}</p>}
          {userState.error !== "" && (
            <p className="sign-up-error">{userState.error}</p>
          )}
          {user.passwordError !== "" && (
            <p className="sign-in-error">{user.passwordError}</p>
          )}
        </div>
      </div>
    </div>
  );
};
