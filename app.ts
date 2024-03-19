import express, { Request, Response } from "express";
import cors from "cors";
import paymentRouter from "./src/data/infraestructure/dataRouter";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());

app.use("/approved", paymentRouter)
app.use("*", (req : Request, res : Response) => {
  res.status(404).send("not found")
})

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});
