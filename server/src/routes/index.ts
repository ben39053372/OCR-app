import express from "express";
import { db } from "../utils/mongoDB";
import { errorHandler } from "../utils/errorHandler";
import { insertData, tesseractOcr, visionOcr } from "../services/ocr";

const router = express.Router();

/**
 * get('/') - Service health check
 */
router.get("/", async (req, res) => {
  const data = await db.command({ ping: 1 });
  res.json({
    msg: "OCR backend",
    db_status: data,
    date: new Date(),
  });
});

/**
 * get('/ocrResults') - Retrieve all stored records in DB
 */
router.get("/ocrResults", async (req, res, next) => {
  const ocrs = db.collection("ocrs");
  try {
    const data = await ocrs.find({ ip: req.ip }).sort({ date: -1 }).toArray();
    res.json({
      msg: "Retrieve all stored records in DB",
      data,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * post('/ocr) [params: imageUrl] - Perform OCR and store result to DB
 */
router.post("/ocr", async (req, res, next) => {
  console.log("hi");

  try {
    let tesseractResult;
    const query = req.query;
    const imageUrl = query.imageUrl;
    console.log(imageUrl);

    if (!imageUrl) {
      res.status(400).send("imageUrl is missing");
      return;
    }

    const url = imageUrl.toString();
    const visionResult = await visionOcr(url);

    // if (visionResult) tesseractResult = await tesseractOcr(url);

    const insertResult = await insertData({
      imageUrl: url,
      visionResult,
      tesseractResult,
      ip: req.ip,
    });

    res.status(201).json({
      insertResult,
      visionResult,
      tesseractResult,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * post('/clearOcrResult') - Clear all records in DB
 */
router.post("/clearOcrResult", async (req, res) => {
  const ocrs = db.collection("ocrs");
  const data = ocrs.remove({ ip: req.ip });
  res.json({ msg: "Clear all records in DB", data });
});

router.use(errorHandler);

export { router };
