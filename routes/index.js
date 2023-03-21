const express = require("express");

const router = express.Router();

console.log("Routes up and working");

router.use("/", (req, res) => {
  return res.render("home");
});

module.exports = router;
