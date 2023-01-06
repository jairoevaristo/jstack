import { api } from "../config/api";
import { ConfirmOrder } from "../types/ConfirmOrder";

export const confirmOrder = ({ products, table }: ConfirmOrder) => {
  return api.post("/orders", { products, table });
};
