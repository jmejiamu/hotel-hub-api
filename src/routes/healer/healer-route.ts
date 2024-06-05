import { dbConnection } from "../../config/db-connection";
import express, { Request, Response } from "express";
import { HttpStatusCode, logger } from "../../utils";
import { Calendar } from "../../entities";

export const healerRoute = express.Router();

healerRoute.put("/healer-calendar", async (req: Request, res: Response) => {
  const {
    user_id,
    userType,
    eventTitle,
    eventEndDate,
    eventStartDate,
    eventDescription,
  } = req.body;

  const source = dbConnection;
  try {
    await source.manager.save(Calendar, {
      user_id,
      userType,
      event_title: eventTitle,
      event_description: eventDescription,
      event_start: eventStartDate,
      event_end: eventEndDate,
    });

    return res.status(HttpStatusCode.OK).json({
      message: "Event created successfully",
      status: HttpStatusCode.OK,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(HttpStatusCode.NOT_FOUND)
      .json({ message: "Error retrieving healer " });
  }
});

healerRoute.get(
  "/healer-schedule/:user_id",
  async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const source = dbConnection;
    try {
      const healerRepository = source.getRepository(Calendar);
      const healers = await healerRepository.find({ where: { user_id } });
      return res.status(HttpStatusCode.OK).json(healers);
    } catch (error) {
      logger.error(error);
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Error retrieving healer " });
    }
  }
);
