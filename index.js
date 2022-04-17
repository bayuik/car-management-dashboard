const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res)=> {
    res.render("index");
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});