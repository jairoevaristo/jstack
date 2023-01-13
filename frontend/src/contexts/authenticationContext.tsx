import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config/api";
import { ADMIN_TOKEN } from "../constants/keys";
import { Admin } from "../types/Admin";

type AuthenticationContextData = {
  user: Admin | null;
  handleLogin: (data: Admin) => void;
  handleLogout: () => void;
};

type AuthenticationContext = {
  children: ReactNode;
};

export const authenticationContext = createContext<AuthenticationContextData>(
  null!
);

export const AuthenticationProvider = ({ children }: AuthenticationContext) => {
  const [user, setUser] = useState<Admin | null>(null);
  const navigate = useNavigate();

  const handleLogin = useCallback((data: Admin) => {
    setUser(data);
    localStorage.setItem(ADMIN_TOKEN, JSON.stringify(data));
    api.defaults.headers["authorization"] = `Bearer ${data.token}`;

    navigate("/orders", { replace: true });
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(ADMIN_TOKEN);
    navigate("/");
  };

  const loadUserStorageData = () => {
    const storage = localStorage.getItem(ADMIN_TOKEN);

    if (storage) {
      const userLogged = JSON.parse(storage);
      setUser(userLogged);
      api.defaults.headers["authorization"] = `Bearer ${userLogged.token}`;

      navigate("/orders", { replace: true });
    }
  };

  useEffect(() => {
    loadUserStorageData();
  }, []);

  const values = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
    }),
    [user, handleLogin, handleLogout]
  );

  return (
    <authenticationContext.Provider value={values}>
      {children}
    </authenticationContext.Provider>
  );
};
