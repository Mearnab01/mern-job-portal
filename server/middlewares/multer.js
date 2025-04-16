import multer from "multer";
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

/*
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const singleUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("resume");

export default singleUpload; */
