import sendResponse from "../../helper/response-helper.js";
import { userModel } from "../../models/auth/auth-model.js";
import { v2 as cloudinary } from "cloudinary";

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) sendResponse(res, 400, "No file uploaded", [], true);
    await cloudinary.uploader.destroy(id);
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: id,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(file.buffer);
    });

    if (!uploadResult) sendResponse(res, 400, "Image upload failed", [], true);
    const user = await userModel.findOneAndUpdate(
      { _id: id },
      {
        profileImg: uploadResult.secure_url,
      }
    );
    if (!user) sendResponse(res, 403, "Image upload failed", [], true);
    sendResponse(res, 200, "Image uploaded successfully", uploadResult, false);
  } catch (error) {
    console.error("Upload Error:", error);
    sendResponse(res, 500, "Internal server error", [], true);
  }
};

// upload multiple images
const multipleUploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    if (!files || files.length === 0)
      sendResponse(res, 400, "Files are not provided", [], true);

    const uploadPromises = files.map(async (file, i) => {
      const splitName = files[i].originalname.split(".")[0];
      await cloudinary.uploader.destroy(splitName);
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            public_id: splitName,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(file.buffer);
      });
    });
    const uploadResults = await Promise.all(uploadPromises);

    sendResponse(
      res,
      200,
      "Images uploaded successfully",
      uploadResults,
      false
    );
  } catch (error) {
    console.error("Upload Error:", error);
    sendResponse(res, 500, error || "Internal server error", [], true);
  }
};

export { uploadImage, multipleUploadImage };
