import { Request, Response } from "express";
import { Product } from "../../model/Product";

export async function listProduct(req: Request, res: Response) {
  try {
    const product = await Product.find();
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
