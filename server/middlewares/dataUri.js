import DatauriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DatauriParser();
  const extName = path.extname(file.originalname).toString(); // e.g. .pdf
  return parser.format(extName, file.buffer); // converts buffer to base64
};

export default getDataUri;
