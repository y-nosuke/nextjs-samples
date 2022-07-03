import formidable, { File } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
      res.end(String(err));
      return;
    }

    // FIXME: 型をどう合わせたらいいかわからない
    (files.file as File[]).forEach((file: File) => {
      const data = fs.readFileSync(file.filepath, "utf8");
      // console.log(data);
      fs.copyFileSync(file.filepath, `data/${file.originalFilename}`);
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ fields, files }, null, 2));
    return;
  });
}
