import "dotenv/config";

export default {
  name: "OCR Prudential",
  version: "1.0.0",
  extra: {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    SERVER_HOST: process.env.SERVER_HOST,
  },
  "ios": {
    "bundleIdentifier": "com.ben39053372.ocr-prudential"
  },
  "android": {
    "package": "com.ben39053372.ocrprudential"
  }
};
