import "dotenv/config";

export default {
  name: "CoolApp",
  version: "1.0.0",
  extra: {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    SERVER_HOST: process.env.SERVER_HOST,
  },
};
