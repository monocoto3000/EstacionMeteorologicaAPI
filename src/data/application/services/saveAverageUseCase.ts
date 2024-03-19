import { SaveDataPort } from "../Ports/saveDataPort";

export class saveAverageUseCase {
  constructor(private saveDataPort: SaveDataPort) {}
  async ejecutar(data: any): Promise<void> {
    //aqui va que se saque el promedio cada 5 minuto 
    await this.saveDataPort.saveData(data);
  }
}
