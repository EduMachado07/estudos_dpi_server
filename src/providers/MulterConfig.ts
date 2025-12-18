import multer from "multer";

// // Configuration Multer
export const upload = multer({ storage: multer.memoryStorage() });