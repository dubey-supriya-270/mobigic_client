import { isJWTValid } from "../helpers/validate";
import { useHistory } from "react-router-dom";

// Decoded the JWT from the local storage and returns the decoded value or if the token is not valid or not present, it pushes the user to the / route
export default (doNotRedirect?: boolean) => {
  const history = useHistory();
  try {
    return isJWTValid();
  } catch (err) {
    // Remove the token from local storage if exists
    localStorage.removeItem("MOBIGIC-CLIENT:token");
    // Push the user to the / route in case of any errors if doNotRedirect flag is false
    if (!doNotRedirect) {
      history?.push("/sign-in");
    }
    return;
  }
};
