// Describing the FileSchema for the DB
const mongoose = require("mongoose");
const path = require("path");

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

const files = mongoose.model("csv-file", fileSchema);
module.exports = files;
