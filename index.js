const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");

app.use(express.urlencoded());
app.use(express.static("./assets"));

app.set("view engine", "ejs");
// Now that you know that we are using .ejs file you go and look inside views folder for it.
app.set("views", "./views");

app.use("/", require("./routes/index.js"));

app.listen(port, () => {
  console.log(`Server is up and running at port , ${port}`);
});
