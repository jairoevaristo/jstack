import { NextFunction, Request, Response } from "express";
import { Type } from "../../constants/type";

import { User } from "../model/User";

export function ensureAuthorization(type: string[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const id = req._id;

    if (type.includes("USER") && type.includes("ADMIN")) {
      const user = await User.findById(id);

      if (user?.role === Type.ADMIN || user?.role === Type.USER) {
        return next();
      }

      return res.status(401).json({ error: "Unauthorized" });
    }

    if (type.includes("USER")) {
      const user = await User.findById(id);

      if (user) {
        return next();
      }

      return res.status(401).json({ error: "Unauthorized" });
    }

    if (type.includes("ADMIN")) {
      const admin = await User.findById(id);

      if (admin) {
        return next();
      }

      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}
