import { Request, Response } from "express";
import { io } from "../../..";
import { Order } from "../../model/Order";

export async function createOrders(req: Request, res: Response) {
  try {
    const { table, products } = req.body;
    const order = await Order.create({ table, products });
    const orderDetail = await order.populate("products.product");

    io.emit("new-order", orderDetail);

    return res.json(order);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal server error" });
  }
}
