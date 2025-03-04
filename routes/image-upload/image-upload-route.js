import express from "express";
import {
  multipleUploadImage,
  uploadImage,
} from "../../controller/users/image-upload.js";
import upload from "../../helper/mult-cloud-config.js";

const router = express.Router();

// single image upload
router.put("/single-image/:id", upload.single("image"), uploadImage);

// multiple image upload
router.put("/multiple-image/:id", upload.array("image", 5), multipleUploadImage);

export default router;
