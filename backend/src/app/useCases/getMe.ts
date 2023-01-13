import { Request, Response } from "express";

import { User } from "../model/User";

export async function getMe(req: Request, res: Response) {
  const _id = req._id;
  const isExistsUser = await User.findById(_id);

  if (!isExistsUser) {
    return res.status(400).json({ error: "Email is already used" });
  }

  return res.json({
    email: isExistsUser.email,
    name: isExistsUser.name,
    role: isExistsUser.role,
  });
}
