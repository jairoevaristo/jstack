import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedAndAdmin } from "../../helpers";

import { useAuthentication } from "../../hooks/useAuthentication";

type PrivateRouterProps = {
  children: ReactElement;
};

export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const { user } = useAuthentication();

  if (isLoggedAndAdmin(user)) {
    return children;
  }

  return <Navigate to="/" replace />;
};
