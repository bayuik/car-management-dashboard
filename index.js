const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const multer = require("multer");
const { createCar, listCar, getCar, updateCar, deleteCar } = require("./services/handlerApi");
const { listCars, addCar, editCar } = require("./services/handlerViews");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Views
app.get("/", listCars);
app.get("/add-car", addCar);
app.get("/edit-car/:id", editCar);

// API
app.get("/cars", listCar);
app.get("/cars/:id", getCar);
app.post("/cars", upload.single("image"), createCar);
app.put("/cars/:id", upload.single("image"), updateCar);
app.delete("/cars/:id", deleteCar);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
