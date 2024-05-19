import express from "express";
import cors from "cors";
import morgan from "morgan";
import { HttpStatusCode, logger } from "./utils";
import dotenv from "dotenv";
import { dbConnection } from "./config";
dotenv.config();
const router = express.Router();
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

router.get("/test", (_, res) => {
  res.json({ code: "text" }).status(HttpStatusCode.OK);
});

app.use("/api", router);

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
