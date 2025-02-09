import { JSONAdapter } from "./adapters/json";
import { MongoDBAdapter } from "./adapters/mongodb";

export const mongoDB: JSONAdapter = new JSONAdapter();

mongoDB.addItem({
  id: "asd",
  content: `
# asd

[[asd: aasdsd]]`,
});

// export const mongoDB: MongoDBAdapter = new MongoDBAdapter(
//   import.meta.env.MONGODB_URL,
// );

// await mongoDB.connect();
