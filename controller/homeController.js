const csv = require("csv-parser");
const fs = require("fs");
const File = require("../models/file");

// Action for taking the user to the Home Page

module.exports.home = async (req, res) => {
  let allFiles = await File.find({});
  return res.render("home", {
    file: allFiles,
    comment: "Upload a new, CSV File",
  });
};

// Action to Handle what happens when a User uploads a File
/* 
1. User uploads the File.
2. Checks the File Type. If it is not of CSV file, returns th user back.
3. Creates a New File reference in the Db.
4. Redirects the User Back to Home Page.
*/

module.exports.upload = async (req, res) => {
  if (!req.file || req.file.mimetype != "text/csv") {
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

// Action to Show Data, i.e., Takes the User to the Relevant Page with the File

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

        // console.log(requiredFile.originalName);

        return res.render("data", {
          data: results,
          id: req.params.id,
          name: requiredFile.originalName,
        });
      });
  } catch (err) {
    console.log("There is some Error ", err);
  }
};

// Not Required for Now as the Search has been implemented in Frontend Itself

// module.exports.handleSearch = async (req, res) => {
//   const results = [];
//   //console.log(req.body);
//   const { id, input, select } = req.body;

//   let result = await File.findById(id);

//   fs.createReadStream(result.path)
//     .pipe(csv())
//     .on("data", (data) => {
//       //console.log("Data is ", data);
//       results.push(data);
//     })
//     .on("end", () => {
//       //console.log(results);
//       // [
//       //   { NAME: 'Daffy Duck', AGE: '24' },
//       //   { NAME: 'Bugs Bunny', AGE: '22' }
//       // ]

//       return res.end("Working on this");
//     });
// };

// Action to Delete an Item form DB and rerendering the Page
/*
1. Get the Path of the File from DataBase
2. Delete the File from Local Storage.
3. Remove the File from Database.
4. Redirect the User Back.
*/

module.exports.deleteItem = async (req, res) => {
  try {
    let file = await File.findById(req.params.id);
    let path = file.path;
    console.log(path);

    await fs.unlink(path, function (err) {
      if (err) {
        console.log("err in deleting from fs", err);
      }
      console.log("File Deleted from File Local Storage");
    });

    await File.findByIdAndDelete(req.params.id);

    return res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};
