import { JSONAdapter } from "./adapters/json";
import { MongoDBAdapter } from "./adapters/mongodb";
import { bcryptCompare, bcryptHash } from "./utils.server";

export const mongoDB: MongoDBAdapter = new MongoDBAdapter(
  import.meta.env.MONGODB_URL,
);

await mongoDB.connect();
