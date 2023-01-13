import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GlobalStyles } from "./styles/GlobalStyles";

import { Header } from "./components/Header";
import { AppRoutes } from "./routes";
import { AuthenticationProvider } from "./contexts/authenticationContext";
import { Sidebar } from "./components/Sidebar";

export function App() {
  return (
    <AuthenticationProvider>
      <GlobalStyles />
      <AppRoutes />
      <ToastContainer position="top-right" />
    </AuthenticationProvider>
  );
}
