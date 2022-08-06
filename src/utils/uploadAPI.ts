import axios from "axios";

export const uploadFile = async (
  files: File[],
): Promise<string[] | false> => {
  const urls = [];
  const formData = new FormData();

  for (let file of files) {
    formData.append("file", file);
    formData.append("api_key", "982782983714229");
    formData.append("upload_preset", "axkz0kse");

    try {
      const data = await axios.post(
        "https://api.cloudinary.com/v1_1/refaay/image/upload",
        formData,
      );

      urls.push(data.data.secure_url);
    } catch (error) {
      if (error) {
        return false;
      }
    }
  }

  return urls;
};
