import axios from "axios";
import { _GraphQLList } from "graphql/type/definition";

export const uploadFile = (
  file: File,
): Promise<{ url: string[] }> => {
  const formData = new FormData();

  formData.append("file", file);

  return new Promise<{ url: string[] }>((reso, rej) => {
    axios
      .post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total),
          );
        },
      })
      .then((res) => {
        reso(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        rej("image upload error!");
      });
  });
};
