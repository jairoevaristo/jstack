import { Request, Response } from "express";
import { Product } from "../../model/Product";

export async function listProductByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const products = await Product.find().where('category').equals(categoryId);

    return res.json(products);
  } catch (error) {
  return res.status(500).json({ error: "Internal server error" })
  }
}