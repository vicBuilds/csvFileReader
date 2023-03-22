// Config for Mongoose Connection.
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://victormitra1:ThisisaNewPassword-123654789@cluster0.rdwrzjw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DataBase Connected!"))
  .catch((err) => {
    console.log("Error in connection", err);
  });
