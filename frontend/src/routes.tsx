import { Route, Routes } from "react-router-dom";
import { PrivateRouter } from "./components/PrivateRouter";
import { Login } from "./pages/Login";
import { Orders } from "./pages/Orders";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/orders"
        element={
          <PrivateRouter>
            <Orders />
          </PrivateRouter>
        }
      />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};
