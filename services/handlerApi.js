const { Car } = require("../models");
const fs = require("fs");
const { default: axios } = require("axios");

const createCar = (req, res, next) => {
  const { name, price, size } = req.body;
  Car.create({
    name: name,
    price: price,
    size: size,
    image: req.file.filename,
  }).then(() => {
    res.redirect("/");
  });
};

const listCar = (req, res) => {
  Car.findAll({
    order: [["id", "DESC"]],
  }).then((car) => {
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

const updateCar = (req, res, next) => {
  const { name, price, size } = req.body;
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
      image: req.file.filename,
    },
    query
  ).then(() => {
    res.redirect("/");
  });
};

const deleteImage = async (id) => {
  const car = await Car.findOne({
    where: {
      id: id,
    },
  });
  const image = car.image;
  fs.unlink(`./public/uploads/${image}`, (err) => {
    if (err) {
      return err;
    }
  });
};

const deleteCar = async (req, res) => {
  await deleteImage(req.params.id);
  Car.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.redirect("/");
  });
};

module.exports = {
  createCar,
  listCar,
  getCar,
  updateCar,
  deleteCar,
};
