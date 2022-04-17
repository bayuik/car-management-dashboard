const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/list-cars", (req, res) => {
  res.render("index", { page: "List Cars" });
});

app.get("/add-car", (req, res) => {
  res.render("carForm", { page: "Add New Car" });
});

app.get("/edit-car", (req, res) => {
  res.render("carForm", { page: "Update Car Information" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
