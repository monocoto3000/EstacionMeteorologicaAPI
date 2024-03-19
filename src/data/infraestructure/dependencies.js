"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataController = void 0;
const CreateDataUseCase_1 = require("../application/CreateDataUseCase");
const deliverMessage_1 = require("../../shared/broker/application/deliverMessage");
const SocketIO_1 = require("../../shared/socket/infraestructure/SocketIO");
const deliverDatatoClientUseCase_1 = require("../../shared/socket/application/deliverDatatoClientUseCase");
const CreateDataController_1 = require("./controllers/CreateDataController");
const Amqplib_1 = require("../../shared/broker/infraestructure/Amqplib");
// Ports
const amqplLib = new Amqplib_1.Amqplib("amqp://localhost:/");
const socketIo = new SocketIO_1.SocketIO("http://localhost:4000");
//Deliver data
const DeliverMessagetoQueue = new deliverMessage_1.deliverMessagetoQueue(amqplLib);
const sendDataService = new deliverDatatoClientUseCase_1.deliverDatatoClient(socketIo);
//Create message
const createMessageService = new CreateDataUseCase_1.CreateDataUseCase(DeliverMessagetoQueue, sendDataService);
exports.createDataController = new CreateDataController_1.CreateDataController(createMessageService);
