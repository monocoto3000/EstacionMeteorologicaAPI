import { CreateDataUseCase } from "../application/CreateDataUseCase";
import { deliverMessagetoQueue } from "../../shared/broker/application/deliverMessage";
import { SocketIO } from "../../shared/socket/infraestructure/SocketIO";
import { deliverDatatoClient } from "../../shared/socket/application/deliverDatatoClientUseCase";
import { CreateDataController } from "./controllers/CreateDataController";
import { Amqplib } from "../../shared/broker/infraestructure/Amqplib";

// Ports
const amqplLib = new Amqplib("amqp://localhost:/");
const socketIo = new SocketIO("http://localhost:4000");

//Deliver data
const DeliverMessagetoQueue = new deliverMessagetoQueue(amqplLib);
const sendDataService = new deliverDatatoClient(socketIo)

//Create message
const createMessageService = new CreateDataUseCase(DeliverMessagetoQueue, sendDataService);
export const createDataController = new CreateDataController(createMessageService);