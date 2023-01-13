import { Request, Response } from "express";
import { compare } from "bcryptjs";
import jsonWebToken from "jsonwebtoken";

import { User } from "../../model/User";

export async function loginAdmin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Field password and email is required" });
  }

  const admin = await User.findOne({ email });

  if (!admin) {
    return res.status(400).json({ error: "E-mail or password invalid" });
  }

  const isPassword = await compare(password, admin.password);

  if (!isPassword) {
    return res.status(400).json({ error: "E-mail or password invalid" });
  }

  const token = jsonWebToken.sign(
    { email: admin.email },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "8h",
      subject: admin.id,
    }
  );

  return res.json({
    token,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });
}
