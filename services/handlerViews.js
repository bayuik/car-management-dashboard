const axios = require("axios");
const moment = require("moment");
require("dotenv").config(`${__dirname}/../.env`);

const listCars = (req, res) => {
  axios.get(`http://localhost:${process.env.PORT}/cars`).then((response) => {
    const cars = response.data;
    cars.forEach((car) => {
      car.updatedAt = moment(car.updatedAt).format("DD MMM YYYY, HH:mm");
    });
    res.render("index", {
      cars,
      size: 'all',
      page: "List Cars",
    });
  });
};

const addCar = (req, res) => {
  res.render("carForm", {
    page: "Add New Car",
    method: "POST",
    id: "",
    size: '',
    sizes: ["small", "medium", "large"],
    action: "addCar()",
  });
};

const editCar = (req, res) => {
  axios.get(`http://localhost:${process.env.PORT}/cars/${req.params.id}`).then((response) => {
    const car = response.data;
    res.render("carForm", {
      page: "Update Car Information",
      method: "PUT",
      id: req.params.id,
      car,
      size : '',
      sizes: ["small", "medium", "large"],
      action: `editCar(${req.params.id})`,
    });
  });
};

const listCarsFilter = (req, res) => {
  axios.get(`http://localhost:${process.env.PORT}/cars/filter/${req.params.size}`).then((response) => {
    const cars = response.data;
    const size = req.params.size;
    cars.forEach((car) => {
      car.updatedAt = moment(car.updatedAt).format("DD MMM YYYY, HH:mm");
    });
    res.render("index", {
      cars,
      size,
      page: `List Cars by Size: ${size[0].toUpperCase() + size.slice(1)}`,
    });
  });
};

module.exports = {
  listCars,
  addCar,
  editCar,
  listCarsFilter,
};
