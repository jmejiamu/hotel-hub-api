import { HttpStatusCode, UserType, logger } from "../../utils";
import { dbConnection } from "../../config/db-connection";
import express, { Request, Response } from "express";
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
    event_id,
  } = req.body;

  const source = dbConnection;
  try {
    const healerCalendarRepository = source.getRepository(Calendar);
    const existingEvent = await healerCalendarRepository.findOne({
      where: { event_id },
    });
    if (existingEvent?.event_id === event_id) {
      return await source.manager.update(
        Calendar,
        { event_id },
        {
          user_id,
          userType,
          event_title: eventTitle,
          event_description: eventDescription,
          event_start: eventStartDate,
          event_end: eventEndDate,
        }
      );
    }
    await source.manager.save(Calendar, {
      user_id,
      userType,
      event_title: eventTitle,
      event_description: eventDescription,
      event_start: eventStartDate,
      event_end: eventEndDate,
      event_id,
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
  "/healer-schedule/:user_id/:userType",
  async (req: Request, res: Response) => {
    const { user_id, userType } = req.params;
    const source = dbConnection;
    try {
      const healerRepository = source.getRepository(Calendar);
      const healers = await healerRepository.find({ where: { user_id } });
      if (userType !== UserType.HEALER) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
          message: "You are not a healer",
        });
      }

      return res.status(HttpStatusCode.OK).json(healers);
    } catch (error) {
      logger.error(error);
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Error retrieving healer " });
    }
  }
);
