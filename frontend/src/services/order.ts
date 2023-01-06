import { api } from "../config/api";
import { Order } from "../types/Order";

export function listOrders() {
  return api.get("/orders");
}

export function cancelOrder(orderId: string | undefined) {
  return api.delete(`/orders/${orderId}`);
}

export function changeOrderStatus(
  orderId: string | undefined,
  status: Order["status"]
) {
  return api.patch(`/orders/${orderId}`, { status });
}
