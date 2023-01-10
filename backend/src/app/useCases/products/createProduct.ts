import { Request, Response } from "express";
import { Product } from "../../model/Product";

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, description, imagePath, price, ingredients, category } =
      req.body;
    const product = await Product.create({
      name,
      description,
      imagePath,
      ingredients,
      category,
      price,
    });

    return res.json(product);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal server error" });
  }
}
