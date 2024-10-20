import { type Adapter, type Item, itemSchema } from "./adapter";
import { Collection, MongoClient } from "mongodb";

export class MongoDBAdapter implements Adapter {
  private client: MongoClient;
  private itemCollection?: Collection<Item>;
  private dataCollection?: Collection;

  public constructor(url: string) {
    this.client = new MongoClient(url);
  }

  public async connect(): Promise<void> {
    await this.client.connect();
    console.log("Connected to MongoDB");
    this.itemCollection = this.client.db("db").collection("items");
    this.dataCollection = this.client.db("db").collection("data");
  }

  public async getItem(id: string): Promise<Item | null> {
    const a = itemSchema.safeParse(await this.itemCollection?.findOne({ id }));
    return a.success ? a.data : null;
  }

  public async addItem(item: Item): Promise<void> {
    this.itemCollection?.insertOne(item);
  }

  public async setItem<T extends keyof Item>(
    id: string,
    key: T,
    value: Item[T],
  ): Promise<void>;
  public async setItem(id: string, value: Item): Promise<void>;
  public async setItem<T extends keyof Item>(
    id: string,
    key: T | Item,
    value?: Item[T],
  ): Promise<void> {
    if (typeof key === "string" && value) {
      await this.itemCollection?.updateOne({ id }, { $set: { [key]: value } });
    } else if (typeof key === "object") {
      await this.itemCollection?.updateOne({ id }, { $set: key });
    }
  }

  public async removeItem(id: string): Promise<void> {
    this.itemCollection?.deleteOne({ id });
  }

  public async listItemId(): Promise<string[]> {
    return (
      this.itemCollection
        ?.find()
        .map((v) => v.id)
        .toArray() ?? []
    );
  }

  public async doesItemExist(id: string): Promise<boolean> {
    return ((await this.itemCollection?.countDocuments({ id })) ?? 0) > 0;
  }

  public async setHashedPassword(password: string | null): Promise<void> {
    if (password === null) {
      await this.setData("password", null);
    } else {
      await this.setData("password", password);
      console.log(await this.getData("password"));
    }
  }

  public async getHashedPassword(): Promise<string | null> {
    const password = await this.getData("password");
    if (typeof password !== "string") return null;
    return password;
  }

  private async setData(key: string, data: unknown) {
    const document = await this.dataCollection?.findOne();
    if (!document) {
      await this.dataCollection?.insertOne({
        [key]: data,
      });
      return;
    }
    await this.dataCollection?.updateOne(document, { $set: { [key]: data } });
  }

  private async getData(key: string): Promise<unknown> {
    const document = await this.dataCollection?.findOne();
    return document?.[key];
  }
}
