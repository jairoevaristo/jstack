import { Request, Response } from "express";
import { User } from "../../model/User";

export async function listAdmin(req: Request, res: Response) {
  const admin = await User.find();
  return res.json(admin);
}
