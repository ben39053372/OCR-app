import express from "express";
import { imagesAnnotate } from "../apis/visionApi";
import { db } from "../utils/mongoDB";
import Tesseract from "tesseract.js";

const router = express.Router();

/**
 * get('/') - Service health check
 */
router.get("/", async (req, res) => {
  const data = await db.command({ ping: 1 });
  res.json({
    msg: "OCR backend",
    db_status: data,
  });
});

/**
 * get('/ocrResults') - Retrieve all stored records in DB
 */
router.get("/ocrResults", async (req, res) => {
  const ocrs = db.collection("ocrs");
  const data = await ocrs.find({}).toArray();
  res.json({
    msg: "Retrieve all stored records in DB",
    data,
  });
});

/**
 * post('/ocr) [params: imageUrl] - Perform OCR and store result to DB
 */
router.post("/ocr", async (req, res) => {
  const query = req.query;
  const imageUrl = query.imageUrl;

  if (!imageUrl) {
    res.status(400).send("imageUrl is missing");
    return;
  }

  const url = imageUrl.toString();
  const visionResult = await imagesAnnotate(url).then((result) => {
    console.log(result.responses);
    return result.responses[0]?.fullTextAnnotation?.text;
  });

  let tesseractResult, insertResult;

  if (visionResult) {
    try {
      tesseractResult = await Tesseract.recognize(url, "eng+chi_tra", {
        logger: (m) => console.log(m),
      });
      const ocrs = db.collection("ocrs");
      insertResult = await ocrs.insertOne({
        imageUrl,
        visionResult,
        tesseractResult: tesseractResult?.data.text,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Error",
        error,
      });
      return;
    }
  } else {
    res.status(200).json({
      msg: "nothing text",
    });
  }
  try {
    res.json({
      data: imageUrl,
      visionResult,
      tesseractResult: tesseractResult?.data.text,
      insertResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error,
    });
  }
});

/**
 * post('/clearOcrResult') - Clear all records in DB
 */
router.post("/clearOcrResult", async (req, res) => {
  const ocrs = db.collection("ocrs");
  const data = ocrs.remove({});
  res.json({ msg: "Clear all records in DB", data });
});

export { router };
