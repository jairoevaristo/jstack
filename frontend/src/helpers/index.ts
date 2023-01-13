import { Admin } from "../types/Admin";

export const isLoggedAndAdmin = (user: Admin | null) => {
  return !!user && user.role === "ADMIN";
};
