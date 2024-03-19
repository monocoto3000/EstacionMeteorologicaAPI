import { Router } from "express";
import { createDataController } from "./dependencies";

const paymentRouter = Router()

paymentRouter.post("/", createDataController.run.bind(createDataController))

export default paymentRouter;