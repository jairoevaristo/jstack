import { Request, Response } from "express";
import { hash } from "bcryptjs";

import { User } from "../../model/User";

export async function createAdmin(req: Request, res: Response) {
  const { name, email, role, password } = req.body;
  const isAdminExists = await User.findOne({ email });

  if (isAdminExists) {
    return res.status(400).json({ error: "Email is already used" });
  }

  const passwordHash = await hash(password, 8);

  const admin = await User.create({
    email,
    name,
    role,
    password: passwordHash,
  });

  return res.json(admin);
}
