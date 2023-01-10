import { Request, Response } from "express";
import { hash } from "bcryptjs";

import { Admin } from "../../model/Admin";

export async function createAdmin(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const isAdminExists = await Admin.findOne({ email });

  if (isAdminExists) {
    return res.status(400).json({ error: "Email is already used" });
  }

  const passwordHash = await hash(password, 8);

  const admin = await Admin.create({
    email,
    name,
    password: passwordHash,
  });

  return res.json(admin);
}
