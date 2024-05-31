import express, { Request, Response } from "express";
import { HttpStatusCode, logger } from "../../utils";
import { dbConnection } from "../../config";
import { Customer } from "../../entities";

export const customerRoute = express.Router();

customerRoute.get("/customer", async (_: Request, res: Response) => {
  const source = dbConnection;
  try {
    const customerRepository = source.getRepository(Customer);
    const customers = await customerRepository.find();
    return res.status(HttpStatusCode.OK).json(customers);
  } catch (error) {
    logger.error(error);
    return res
      .status(HttpStatusCode.NOT_FOUND)
      .json({ message: "Error retrieving customer " });
  }
});

customerRoute.get(
  "/single-customer/:user_id",
  async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const source = dbConnection;
    try {
      console.log("HERER ");

      const customerRepository = source.getRepository(Customer);
      const customer = await customerRepository.findOne({ where: { user_id } });
      return res.status(HttpStatusCode.OK).json([customer]);
    } catch (error) {
      logger.error(error);
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Error retrieving customer " });
    }
  }
);
