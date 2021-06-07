import MongoDB from "mongodb";

const MongoClient = MongoDB.MongoClient;

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;

export let db: MongoDB.Db;

export function connectDB() {
  return MongoClient.connect(uri, { useUnifiedTopology: true }).then((c) => {
    db = c.db();
    console.log("DB connected");
  });
}
