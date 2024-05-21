import { Register, Signin } from "../../entities/auth-entity";
import express, { Request, Response } from "express";
import { HttpStatusCode, logger } from "../../utils";
import { hasPassword } from "../../utils/auth";
import { dbConnection } from "../../config";
import { v4 as uuidv4 } from "uuid";

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

    const user_id = uuidv4();
    const hashedPassword = await hasPassword(password);
    await source.manager.save(Register, {
      email,
      username,
      password: hashedPassword,
      user_id,
    });

    await source.manager.save(Signin, {
      email,
      password: hashedPassword,
      user_id,
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
