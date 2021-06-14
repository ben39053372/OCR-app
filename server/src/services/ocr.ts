import Tesseract, { createScheduler, createWorker } from "tesseract.js";
import { imagesAnnotate } from "../apis/visionApi";
import { db } from "../utils/mongoDB";

interface OCRDataModel {
  imageUrl: string;
  visionResult: any;
  tesseractResult?: string | undefined;
  ip?: string;
}

const worker = createWorker({
  cachePath: process.platform === "win32" ? process.cwd() : "/tmp",
});

export const visionOcr = async (url: string) => {
  return await imagesAnnotate(url).then(
    (result) => result.responses[0]?.fullTextAnnotation?.text
  );
};

export const tesseractOcr = async (url: string) => {
  const lang = "eng+chi_tra";
  await worker.load();
  await worker.loadLanguage(lang);
  await worker.initialize(lang);
  const {
    data: { text },
  } = await worker.recognize(url);

  return text;
};

export const insertData = async (data: OCRDataModel) => {
  const ocrs = db.collection("ocrs");

  return await ocrs.insertOne({
    ...data,
    date: new Date(),
  });
};
