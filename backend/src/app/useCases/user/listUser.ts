import { Request, Response } from "express";
import { User } from "../../model/User";

export async function listUser(req: Request, res: Response) {
  const user = await User.find();
  return res.json(user);
}
