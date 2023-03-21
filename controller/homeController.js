const csv = require("csv-parser");
const fs = require("fs");
const results = [];

const File = require("../models/file");

module.exports.home = async (req, res) => {
  let allFiles = await File.find({});
  return res.render("home", {
    file: allFiles,
    comment: "Upload a new, CSV File",
  });
};

module.exports.upload = async (req, res) => {
  if (!req.file || req.file.mimetype != "text/csv") {
    // return res.render("home", {
    //   comment:
    //     "You have tried uploading a file other than a CSV. Please Upload only CSV Files",
    //   file: "",
    // });
    return res.redirect("back");
  }
  let { originalname, filename, path } = req.file;

  await File.create({
    path: path,
    originalName: originalname,
    fileName: filename,
  });

  let allFiles = await File.find({});
  return res.render("home", {
    file: allFiles,
    comment: "Upload a new, CSV File",
  });
};

module.exports.showData = async (req, res) => {
  try {
    let requiredFile = await File.findById(req.params.id);
    if (!requiredFile) {
      return res.redirect("back");
    }
    console.log(requiredFile);

    return res.redirect("back");
  } catch (err) {
    console.log("There is some Error ", err);
  }
};
