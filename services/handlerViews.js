const axios = require("axios");

const listCars = (req, res) => {
  axios.get("http://localhost:3000/cars").then((response) => {
    const cars = response.data;
    res.render("index", {
      cars,
      page: "List Cars",
    });
  });
};

const addCar = (req, res) => {
  res.render("carForm", {
    page: "Add New Car",
    method: "POST",
    id: "",
    sizes: ["small", "medium", "large"],
  });
};

const editCar = (req, res) => {
  axios.get(`http://localhost:3000/cars/${req.params.id}`).then((response) => {
    const car = response.data;
    res.render("carForm", {
      page: "Update Car Information",
      method: "PUT",
      id: req.params.id,
      car,
      sizes: ["small", "medium", "large"],
    });
  });
};

module.exports = {
  listCars,
  addCar,
  editCar,
};
