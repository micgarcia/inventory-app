const async = require("async");

const Accessory = require("../models/accessory");
const Cars = require("../models/cars");
const Charging = require("../models/charging")
const Energy = require("../models/energy")
const EnergyProduct = require("../models/energyproduct")
const Item = require("../models/item")
const Trucks = require("../models/trucks")
const Vehicle = require("../models/vehicle")

// Displays catalog home page
exports.catalog = (req, res, next) => {
  async.parallel(
    {
      cars_count(callback) {
        Cars.countDocuments({}, callback);
      },
      trucks_count(callback) {
        Trucks.countDocuments({}, callback);
      },
      energy_count(callback) {
        Energy.countDocuments({}, callback);
      },
      charging_count(callback) {
        Charging.countDocuments({}, callback);
      },
      accessory_count(callback) {
        Accessory.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("catalog", {
        title: "Inventory Catalog",
        data: results
      });
    }
  )
}

// Displays list of all cars
exports.car_list = (req, res, next) => {
  res.send("List of cars");
}

// Displays details for one Car
exports.car_detail = (req, res, next) => {
  res.send("Car details");
}
