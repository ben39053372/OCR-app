import axios from "axios";

export const sendOCR = async (imageUrl: string) => {
  const res = await axios({
    method: "post",
    url: `${process.env.SERVER_HOST}/ocr?${new URLSearchParams({
      imageUrl,
    })}`,
  });
  return res.data;
};

export const healthCheck = async () => {
  console.log(process.env.SERVER_HOST);
  const res = await axios({ method: "get", url: `${process.env.SERVER_HOST}` });
  return res.data;
};

export const getAllOCR = async () => {
  const res = await axios(`${process.env.SERVER_HOST}/ocrResults`);
  return res.data;
};

export const clearAllData = async () => {
  const res = await axios.post(`${process.env.SERVER_HOST}/clearOcrResult`);
  return res.data;
};
