import { Response, Request } from "express";
import { CreateDataUseCase } from "../../application/CreateDataUseCase";

export class CreateDataController {
  constructor(private readonly createDataUseCase: CreateDataUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      if (data === null) res.status(404).send("not found");
      await this.createDataUseCase.run(data);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
