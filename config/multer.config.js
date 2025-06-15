const multer = require("multer");

// Use memory storage to access file buffer (needed for Cloudinary stream upload)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
