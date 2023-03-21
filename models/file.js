const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// const AVATAR_PATH = path.join("/uploads/csv");

const fileSchema = new mongoose.Schema(
  {
    path: {
      type: String,
    },
    originalName: {
      type: String,
    },
    fileName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "..", AVATAR_PATH));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// //   The following are static functions to the User Schema.
// fileSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
//   "avatar"
// );

// fileSchema.statics.avatarPath = AVATAR_PATH;

const files = mongoose.model("csv-file", fileSchema);
module.exports = files;
