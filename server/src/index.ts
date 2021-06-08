import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import express from "express";
import { router } from "./routes";
import * as MongoDB from "./utils/mongoDB";
import morgan from "morgan";

async function start() {
  await MongoDB.connectDB();

  const app = express();

  app.use(cors());

  app.use(morgan("dev"));

  app.use(router);

  app.listen(process.env.PORT, () => {
    console.log(`The application is listesning on port ${process.env.PORT}!`);
  });
}

start();
