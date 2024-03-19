"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDataUseCase = void 0;
const entities_1 = require("../../shared/broker/domain/entities");
const Events_1 = require("../../shared/socket/domain/entities/Events");
class CreateDataUseCase {
    constructor(deliverMessagetoQueue, deliverMessagetoClient) {
        this.deliverMessagetoQueue = deliverMessagetoQueue;
        this.deliverMessagetoClient = deliverMessagetoClient;
    }
    run(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const MeteoData = Object.assign({ message: `ID de estacion: ${data === null || data === void 0 ? void 0 : data.station_id}, temperatura: ${data === null || data === void 0 ? void 0 : data.temperature}, humedad:  ${data === null || data === void 0 ? void 0 : data.humidity} y radiación:  ${data === null || data === void 0 ? void 0 : data.radiation}` }, data);
                yield this.deliverMessagetoQueue.run(MeteoData, entities_1.QueueName.approved_payments);
                yield this.deliverMessagetoClient.run(Events_1.EventsSocket.deliverData, MeteoData);
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
}
exports.CreateDataUseCase = CreateDataUseCase;
