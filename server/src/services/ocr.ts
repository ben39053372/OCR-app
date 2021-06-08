import Tesseract from "tesseract.js";
import { imagesAnnotate } from "../apis/visionApi";

export const visionOcr = async (url: string) => {
  return await imagesAnnotate(url).then((result) => {
    console.log(result.responses);
    return result.responses[0]?.fullTextAnnotation?.text;
  });
};

export const tesseractOcr = async (url: string) => {
  return await Tesseract.recognize(url, "eng+chi_tra", {
    logger:
      process.env.NODE_ENV === "Development"
        ? (m) => console.log(m)
        : undefined,
  });
};
