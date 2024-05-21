import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hasPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const createJWT = (email: string) => {
  const secretJWT = process.env.JWT_SECRET as string;
  const token = jwt.sign(
    {
      email,
    },
    secretJWT
  );

  return token;
};
