import { dbConnection } from "../../config/db-connection";
import express, { Request, Response } from "express";
import { HttpStatusCode, logger } from "../../utils";
import { CustomerCalendar } from "../../entities";

export const frontendDesk = express.Router();

frontendDesk.put("/customer-calendar", async (req: Request, res: Response) => {
  const {
    user_id,
    userType,
    eventTitle,
    eventEndDate,
    eventStartDate,
    eventDescription,
    event_id,
    customer_id,
  } = req.body;
  const source = dbConnection;
  try {
    const customerCalendar = source.getRepository(CustomerCalendar);
    const existingCustomer = await customerCalendar.findOne({
      where: { event_id },
    });
    if (existingCustomer?.event_id === event_id) {
      return await source.manager.update(
        CustomerCalendar,
        { event_id },
        {
          userType,
          event_title: eventTitle,
          event_description: eventDescription,
          event_start: eventStartDate,
          event_end: eventEndDate,
        }
      );
    }

    await source.manager.save(CustomerCalendar, {
      user_id,
      userType,
      event_title: eventTitle,
      event_description: eventDescription,
      event_start: eventStartDate,
      event_end: eventEndDate,
      event_id,
      customer_id,
    });
    return res.status(HttpStatusCode.CREATED).json({
      message: "Event created successfully",
      status: HttpStatusCode,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(HttpStatusCode.NOT_FOUND)
      .json({ message: "Error retrieving customer calendar" });
  }
});

frontendDesk.get(
  "/customer-event/:user_id",
  async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const source = dbConnection;
    try {
      const customerRepository = await source.getRepository(CustomerCalendar);
      const customerEvent = await customerRepository.find({
        where: { user_id },
      });

      return res.status(HttpStatusCode.OK).json({
        message: "Customer event retrieved successfully",
        status: HttpStatusCode.OK,
        data: customerEvent,
      });
    } catch (error) {
      logger.error(error);
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Error retrieving customer" });
    }
  }
);
