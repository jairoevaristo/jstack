import { NextFunction, Request, Response } from "express";
import jsonWebToken from "jsonwebtoken";

type IPayloadToken = {
  sub: string;
};

export function ensureAutheticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.status(400).json({ error: "Header authorization not found" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { sub } = jsonWebToken.verify(
      token,
      process.env.SECRET_KEY as string
    ) as IPayloadToken;

    req._id = sub;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Token expired" });
    }

    return res.status(400).json({ error: "invalid token" });
  }
  return next();
}
