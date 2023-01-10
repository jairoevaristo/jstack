import { Request, Response } from "express";
import { Admin } from "../../model/Admin";

export async function listAdmin(req: Request, res: Response) {
  const admin = await Admin.find();
  return res.json(admin);
}
