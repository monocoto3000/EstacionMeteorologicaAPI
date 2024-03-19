import { MongoClient, Db } from "mongodb";

export class MongoDB {
  private client!: MongoClient;
  private db!: Db;

  constructor(private readonly url: string) {}

  async connect(): Promise<void> {
    this.client = new MongoClient(this.url);
    await this.client.connect();
    this.db = this.client.db();
  }

  getDatabase(): Db {
    return this.db;
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
