const axios = require("axios");

const listCars = (req, res) => {
  axios.get("http://localhost:3000/cars")
    .then(response => {
      const cars = response.data;
      res.render("index", {
        cars,
        page: "List Cars",
      });
    })
}

const addCar = (req, res) => {
  res.render("carForm", {
    page: "Add New Car",
    method: 'POST',
    id: ''
  });
}

const editCar = (req, res) => {
  console.log(req.params.id);
  res.render("carForm", {
    page: "Update Car Information",
    method: 'PUT',
    id: req.params.id
  });
}

module.exports = {
  listCars,
  addCar,
  editCar,
};