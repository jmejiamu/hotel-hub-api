import { dbConnection } from "./config";
import { authRoute } from "./routes";
import { logger } from "./utils";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api-v1", authRoute);

dbConnection
  .initialize()
  .then(() => {
    logger.info("Database connected");
  })
  .catch((error) => {
    logger.error(`Error connecting to database: ${error}`);
  });

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
