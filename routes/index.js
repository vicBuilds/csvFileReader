const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "./uploads/csv"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

//const upload = multer({ dest: "uploads/csv" });

const homeController = require("../controller/homeController");

console.log("Routes up and working");

router.get("/", homeController.home);

router.post("/upload", upload.single("upload"), homeController.upload);

router.get("/file/:id", homeController.showData);

router.get("/delete/:id", homeController.deleteItem);

router.post("/submit-search", homeController.handleSearch);

module.exports = router;
