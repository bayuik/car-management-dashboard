const { Car } = require("../models");
const fs = require("fs");

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

const createCar = (req, res) => {
  const { name, price, size } = req.body;
  const image = req.file.filename;
  Car.create({
    name,
    price,
    size,
    image,
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

const updateCar = async (req, res) => {
  if (req.file) await deleteImage(req.params.id);
  const { name, price, size } = req.body;
  const image = req.file ? req.file.filename : req.body.oldImage;
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
  ).then(() => {
    res.redirect("/");
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
