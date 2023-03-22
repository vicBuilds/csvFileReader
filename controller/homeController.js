const csv = require("csv-parser");
const fs = require("fs");

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
  const results = [];

  try {
    let requiredFile = await File.findById(req.params.id);
    if (!requiredFile) {
      return res.redirect("back");
    }

    fs.createReadStream(requiredFile.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        //console.log(results);
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]

        return res.render("data", {
          data: results,
          id: req.params.id,
        });
      });
  } catch (err) {
    console.log("There is some Error ", err);
  }
};

module.exports.handleSearch = async (req, res) => {
  const results = [];
  //console.log(req.body);
  const { id, input, select } = req.body;

  let result = await File.findById(id);

  fs.createReadStream(result.path)
    .pipe(csv())
    .on("data", (data) => {
      console.log("Data is ", data);
      results.push(data);
    })
    .on("end", () => {
      //console.log(results);
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]

      return res.end("Working on this");
    });
};

module.exports.deleteItem = async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    return res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};
