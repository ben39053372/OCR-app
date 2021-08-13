import axios from "axios";
import { Platform } from "react-native";

export const uploadImage = async (uri: string): Promise<any> => {
  const data = new FormData();
  // @ts-ignore
  console.log(uri);
  if (Platform.OS !== "web") {
    data.append("file", { uri, type: "image/jpeg", name: "image.jpg" });
  } else {
    data.append("file", uri);
  }
  data.append("upload_preset", "upload_preset");
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
    data
  );
  return res.data;
};
