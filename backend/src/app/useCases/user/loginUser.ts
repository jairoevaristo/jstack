import { Request, Response } from "express";
import { compare } from "bcryptjs";
import jsonWebToken from "jsonwebtoken";

import { User } from "../../model/User";

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Field password and username is required" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ error: "Username or password invalid" });
  }

  const isPassword = await compare(password, user.password);

  if (!isPassword) {
    return res.status(400).json({ error: "Username or password invalid" });
  }

  const token = jsonWebToken.sign(
    { email: user.name },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "8h",
      subject: user.id,
    }
  );

  return res.json(token);
}
