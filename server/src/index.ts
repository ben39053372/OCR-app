import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { router } from "./routes";
import * as MongoDB from "./utils/mongoDB";
import morgan from "morgan";

async function start() {
  await MongoDB.connectDB();
  const app = express();

  app.use(morgan("dev"));

  app.use(router);

  app.listen(process.env.PORT, () => {
    console.log("The application is listesning on port 3000!");
  });
}

start();
