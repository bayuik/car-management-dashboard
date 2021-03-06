const { Car } = require("../models");
const fs = require("fs");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
  const image = req.file ? req.file.filename : "";
  Car.create({
    name,
    price,
    size,
    image,
  })
    .then(() => {
      res.status(200).json({
        message: "Car created",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating car",
      });
    });
};

const carsBySize = (req, res) => {
  const { size } = req.params;
  Car.findAll({
    where: {
      size: size,
    },
  })
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting cars by size",
      });
    });
};

const CarsByKeyword = (req, res) => {
  const { keyword } = req.params;
  Car.findAll({
    where: {
      name: {
        [Op.iLike]: `%${keyword}%`,
      },
    },
  })
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting cars by keyword",
      });
    });
};

const listCar = (req, res) => {
  Car.findAll({
    order: [["id", "DESC"]],
  })
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting cars",
      });
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
  )
    .then(() => {
      res.status(200).json({
        message: "Car updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating car",
      });
    });
};

const deleteCar = async (req, res) => {
  await deleteImage(req.params.id);
  Car.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({
        message: "Car deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting car",
      });
    });
};

module.exports = {
  createCar,
  carsBySize,
  CarsByKeyword,
  listCar,
  getCar,
  updateCar,
  deleteCar,
};
