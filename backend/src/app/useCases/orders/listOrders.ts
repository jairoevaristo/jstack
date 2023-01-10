import { Request, Response } from "express";
import { Order } from "../../model/Order";

export async function listOrders(req: Request, res: Response) {
  try {
    const order = await Order.find()
      .sort({ createdAt: 1 })
      .populate("products.product");
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
