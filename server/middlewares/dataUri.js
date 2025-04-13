import DataUri from "datauri";

export const getDataUri = (file) => {
  const dataUri = new DataUri();
  const extName = path.extname(file.originalname).toString();
  return dataUri.format(extName, file.buffer);
};
