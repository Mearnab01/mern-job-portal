import multer from "multer";
import path from "path";
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);
export const logoUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("file");

// Configure multer storage
/* const logostorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const logoUpload = multer({
  storage: logostorage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("file"); */
