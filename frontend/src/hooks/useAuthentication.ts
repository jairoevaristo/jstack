import { useContext } from "react";

import { authenticationContext } from "../contexts/authenticationContext";

export const useAuthentication = () => {
  if (!authenticationContext) {
    throw new Error("Not foud context");
  }

  return useContext(authenticationContext);
};
