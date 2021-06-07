import express from "express";
import { db } from "../utils/mongoDB";

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
  console.log(data);
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
  res.send("Perform OCR and store result to DB" + imageUrl);
});

/**
 * post('/clearOcrResult') - Clear all records in DB
 */
router.post("/clearOcrResult", async (req, res) => {
  const ocrs = db.collection("ocrs");
  const data = ocrs.drop();
  res.json({ msg: "Clear all records in DB", data });
});

export { router };
