import { Request, Response } from "express";
import { Category } from "../../model/Category";

export async function listCategory(req: Request, res: Response) {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
  return res.status(500).json({ error: "Internal server error" })
  }
}