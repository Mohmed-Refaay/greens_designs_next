import nextConnect from "next-connect";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      return cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("file"));

apiRoute.post(
  (
    req: NextApiRequest & { files: Express.Multer.File[] },
    res: NextApiResponse,
  ) => {
    res.status(200).json({
      url:
        req.files?.length > 0
          ? req.files.map((file) => file.filename)
          : null,
    });
  },
);

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
