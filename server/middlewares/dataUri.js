import DatauriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file || !file.buffer || !file.originalname) {
    throw new Error("Invalid file object");
  }
  const parser = new DatauriParser();
  const extName = path.extname(file.originalname).toString(); // e.g. .pdf
  return parser.format(extName, file.buffer); // converts buffer to base64
};

export default getDataUri;
