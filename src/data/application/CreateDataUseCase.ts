import { deliverMessagetoQueue } from "../../shared/broker/application/deliverMessage";
import { QueueName } from "../../shared/broker/domain/entities";
import { deliverDatatoClient } from "../../shared/socket/application/deliverDatatoClientUseCase";
import { EventsSocket } from "../../shared/socket/domain/entities/Events";

export class CreateDataUseCase {
  constructor(
    private readonly deliverMessagetoQueue: deliverMessagetoQueue,
    private readonly deliverMessagetoClient: deliverDatatoClient
  ) {}
  async run(data: any): Promise<void> {
    try {
      const MeteoData = {
        message: `ID de estacion: ${data?.station_id}, temperatura: ${data?.temperature}, humedad:  ${data?.humidity} y radiación:  ${data?.radiation}`,
        ...data,
      };
      await this.deliverMessagetoQueue.run(MeteoData, QueueName.approved_payments);
      await this.deliverMessagetoClient.run(EventsSocket.deliverData, MeteoData);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
