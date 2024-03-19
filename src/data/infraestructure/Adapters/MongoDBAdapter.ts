import { MongoClient, Db } from "mongodb";
import { SaveDataPort } from "../../application/Ports/saveDataPort";

export class saveDataMongoDB implements SaveDataPort {
  private client: MongoClient;
  private db: Db;
  private collectionName: string;

  constructor(url: string, dbName: string, collectionName: string) {
    this.client = new MongoClient(url);
    this.db = this.client.db(dbName);
    this.collectionName = collectionName;
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async close(): Promise<void> {
    await this.client.close();
  }

  async saveData(data: any): Promise<void> {
    const collection = this.db.collection(this.collectionName);
    await collection.insertOne(data);
  }
}
