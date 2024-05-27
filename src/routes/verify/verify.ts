import express, { Request, Response } from "express";
import { HttpStatusCode, logger } from "../../utils";
import { authMiddleware } from "../../middleware";

export const verifyRoute = express.Router();

verifyRoute.get(
  "/verify",
  authMiddleware,
  async (_: Request, res: Response) => {
    try {
      res.status(HttpStatusCode.OK).json({
        message: "User verified",
        status: HttpStatusCode.OK,
        isVerify: true,
      });
    } catch (error) {
      logger.error(error);
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Internal server error",
        status: HttpStatusCode.UNAUTHORIZED,
      });
    }
  }
);
