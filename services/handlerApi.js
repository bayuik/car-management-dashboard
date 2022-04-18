const { Car } = require("../models");

const createCar = (req, res) => {
  const { name, price, size, image } = req.body;
  Car.create({
    name,
    price,
    size,
    image,
  }).then((car) => {
    // res.status(201).json(car);
    res.redirect("/");
  });
};

const listCar = (req, res) => {
  Car.findAll().then((car) => {
    res.status(200).json(car);
  });
};

const getCar = (req, res) => {
  Car.findOne({
    where: {
      id: req.params.id,
    },
  }).then((car) => {
    res.status(200).json(car);
  });
};

const updateCar = (req, res) => {
  const { name, price, size, image } = req.body;
  const query = {
    where: {
      id: req.params.id,
    },
  };

  Car.update(
    {
      name,
      price,
      size,
      image,
    },
    query
  ).then((car) => {
    res.status(200).json(car);
  });
};

const deleteCar = (req, res) => {
  Car.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.status(200).json({
      message: "Car deleted",
    });
  });
};

module.exports = {
  createCar,
  listCar,
  getCar,
  updateCar,
  deleteCar,
};
