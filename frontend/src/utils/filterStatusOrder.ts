import { Order } from "../types/Order";

export function filterStatusOrder(
  status: "WAITING" | "IN_PRODUCTION" | "DONE",
  orders: Order[]
) {
  return orders.filter((order) => order.status === status);
}
