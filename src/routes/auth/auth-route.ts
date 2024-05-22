import { comparePassword, createJWT, hasPassword } from "../../utils/auth";
import { Register, Signin } from "../../entities/auth-entity";
import express, { Request, Response } from "express";
import { HttpStatusCode, logger } from "../../utils";
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
      username,
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

authRoute.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const source = dbConnection;
  try {
    const userRepository = source.getRepository(Signin);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Invalid credential" });
    }

    const token = createJWT(user.email);
    return res.status(HttpStatusCode.OK).json({
      message: "Login successful",
      token,
      user_id: user.user_id,
      username: user.username,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ error: "Error logging in" });
  }
});
