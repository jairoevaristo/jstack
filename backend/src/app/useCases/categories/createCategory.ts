import { Request, Response } from "express";
import { Category } from "../../model/Category";

export async function createCategory(req: Request, res: Response) {
  try {
    const { name, icon } = req.body;
    const categories = await Category.create({ icon, name });

    return res.json(categories);
  } catch (error) {
    console.log({error});
    return res.status(500).json({ error: 'Internal server error' })
  }
  
}