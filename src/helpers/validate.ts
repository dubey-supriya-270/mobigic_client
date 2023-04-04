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
