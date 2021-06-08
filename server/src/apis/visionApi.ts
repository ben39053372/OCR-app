import axios from "axios";

export const imagesAnnotate = async (imageUri: string) => {
  const { data } = await axios.post(
    `https://vision.googleapis.com/v1/images:annotate?${new URLSearchParams({
      key: process.env.GOOGLE_API_KEY || "",
    })}`,
    {
      requests: [
        {
          features: [
            {
              maxResults: 50,
              type: "DOCUMENT_TEXT_DETECTION",
            },
          ],
          image: {
            source: {
              imageUri,
            },
          },
        },
      ],
    }
  );
  return data;
};
