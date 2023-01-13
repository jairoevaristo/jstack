import { Request, Response } from "express";
import { hash } from "bcryptjs";

import { User } from "../../model/User";

export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;
  const isUserExists = await User.findOne({ username, email });

  if (isUserExists) {
    return res.status(400).json({ error: "Email is already used" });
  }

  const passwordHash = await hash(password, 8);

  const user = await User.create({
    email,
    username,
    password: passwordHash,
  });

  return res.json(user);
}
