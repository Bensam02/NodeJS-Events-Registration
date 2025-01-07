import multer from "multer";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/uploads/"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Create the multer upload instance
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum file size (5MB in this example)
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
    }
  },
});

// Middleware to handle optional file upload
export const uploadFile = (req, res, next) => {
  const uploadSingle = upload.single("coverImage");

  uploadSingle(req, res, (err) => {
    if (err) {
      // Handle upload errors
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: err.message });
    }

    // Proceed if no file or file uploaded successfully
    if (!req.file) {
      console.log("No file provided. Continuing...");
    } else {
      console.log("Uploaded file:", req.file);
    }
    next();
  });
};
