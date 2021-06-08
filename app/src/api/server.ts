export const sendOCR = async (imageUrl: string) => {
  const res = await fetch(
    `${process.env.SERVER_HOST}/ocr?${new URLSearchParams({
      imageUrl,
    })}`,
    {
      method: "post",
      keepalive: true,
    }
  );
  return await res.json();
};
