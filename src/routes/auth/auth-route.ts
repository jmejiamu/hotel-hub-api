import { Register, Signin } from "../../entities/auth-entity";
import express, { Request, Response } from "express";
import { HttpStatusCode, logger } from "../../utils";
import { hasPassword } from "../../utils/auth";
import { dbConnection } from "../../config";

export const authRoute = express.Router();

authRoute.post("/register", async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const source = dbConnection;
  try {
    const userRepository = source.getRepository(Register);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await hasPassword(password);
    await source.manager.save(Register, {
      email,
      username,
      password: hashedPassword,
    });

    await source.manager.save(Signin, {
      email,
      password: hashedPassword,
    });

    return res
      .status(HttpStatusCode.CREATED)
      .json({ message: "User registered" });
  } catch (error) {
    logger.error(error);
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ error: "Error registering" });
  }
});
