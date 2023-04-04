import jwtDecode from "jwt-decode";

export const isJWTValid = () => {
  // Get the token from local storage and check if it exists
  const token = localStorage.getItem("MOBIGIC-CLIENT:token");

  if (!token) {
    throw new Error("No JWT available in the local storage");
  }
  // Decode the token
  const decodedToken: any = jwtDecode(token);

  if (decodedToken.userId) {
    // Check if the token is still valid
    if (Date.now() >= decodedToken.exp * 1000) {
      throw new Error("Token has expired");
    }
    // If decoded token has the id, return it
    return decodedToken;
  } else {
    // Throw an error if the decoded token is invalid
    throw new Error("Unable to decode JWT");
  }
};

export const validatePassword = (password: string) => {
  // Password length should be at least 8 characters
  if (password.length < 8) {
    return false;
  }

  // Password should contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Password should contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Password should contain at least one digit
  if (!/\d/.test(password)) {
    return false;
  }

  // Password should contain at least one special character
  const specialCharacters = "!@#$%^&*()_+-=[]{}|;':\"<>,.?/~`";
  if (!specialCharacters.split("").some((char) => password.includes(char))) {
    return false;
  }

  // If all conditions pass, password is valid
  return true;
};
