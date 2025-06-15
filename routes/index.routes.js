const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth');

const path = require("path");
const upload = require("../config/multer.config");
const cloudinary = require("../config/cloudinary.config");
const { Readable } = require("stream");

// In-memory file store (move to DB later if needed)
const uploadedFiles = [];
const fileModel = require("../models/files.models");

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", authMiddleware  , async(req, res) => {
  try {
    const userFiles = await fileModel.find({ user: req.user.userId })
      // console.log(userFiles);
      res.render("home", { uploadedFiles , files : userFiles });
    
  } catch (error) {
    res.status(500).json({
      message : "Server Error"
    })
  } 
});
  

router.post("/upload-file",authMiddleware ,  upload.single("file"), async (req, res) => {
    try {
      const fileBuffer = req.file.buffer;
     
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        async (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            return res.status(500).send("Upload Failed");
          }
  
          const newFile = await fileModel.create({
            secure_url: result.secure_url,
            resource_type: result.resource_type,
            public_id: result.public_id,
            originalName: req.file.originalname,
            user: req.user.userId,
          });
          
          uploadedFiles.push(result.secure_url);
          return res.redirect("/home");
        }
      );
  
      Readable.from(fileBuffer).pipe(stream);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }

  });

  router.get("/download/:public_id", authMiddleware, async (req, res) => {
    try {
      const file = await fileModel.findOne({
        public_id: req.params.public_id,
        user: req.user.userId,
      });
  
      if (!file) {
        return res.status(404).send("File not found");
      }
  
      // Set download headers
      res.setHeader("Content-Disposition", `attachment; filename="${file.original_filename}"`);
      res.setHeader("Content-Type", "application/octet-stream");
  
      // Force download from Cloudinary by redirecting with 'fl_attachment'
      const downloadUrl = file.secure_url.replace("/upload/", "/upload/fl_attachment/");
      // Note: Cloudinary's 'fl_attachment' transformation forces the file to download
  
      res.redirect(downloadUrl);
    } catch (err) {
      console.error("Download error:", err);
      res.status(500).send("Download failed");
    }
  });
  

module.exports = router