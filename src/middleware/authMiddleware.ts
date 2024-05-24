import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "../utils";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).email = (decoded as any).email;

    next();
  } catch (error) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }
};
