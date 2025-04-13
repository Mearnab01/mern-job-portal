import multer from "multer";
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const singleUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("file");

export default singleUpload;
