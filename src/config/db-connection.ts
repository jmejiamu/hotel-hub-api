import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Register, Signin } from "../entities";
dotenv.config();

const port = Number(process.env.DB_PORT);

export const dbConnection = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  username: process.env.USERNAME,
  port: port,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [Register, Signin],
  synchronize: true,
});
