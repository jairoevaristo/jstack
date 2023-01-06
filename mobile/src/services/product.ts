import { api } from "../config/api";

export function listProducts() {
  return api.get("/products");
}
