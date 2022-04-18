const express = require("express");
const app = express();
const { createCar, listCar, getCar, updateCar, deleteCar } = require("./services/handlerApi");
const { listCars, addCar, editCar } = require("./services/handlerViews");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Views
app.get("/", listCars);
app.get("/add-car", addCar);
app.get("/edit-car/:id", editCar);

// API
app.get("/cars", listCar);
app.get("/cars/:id", getCar);
app.post("/cars", createCar);
app.put("/cars/:id", updateCar);
app.delete("/cars/:id", deleteCar);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
