import multer from "multer";
import path from "path";
import ApiError from "../Utils/ApiError.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve("public", "uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      const filterOriginalFilename = path.basename(
        file.originalname.replace(/\s+/g, "")
      );
      const fileName = `${Date.now()}-${filterOriginalFilename}`;
      cb(null, fileName);
    } else {
      cb(new ApiError(400, "Invalid File Type"));
    }
  },
});

const upload = multer({ storage: storage });

export default upload;
