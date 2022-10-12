const async = require("async");

const Accessory = require("../models/accessory");
const Cars = require("../models/cars");
const Charging = require("../models/charging")
const Energy = require("../models/energy")
const Trucks = require("../models/trucks")
const { body, validationResult } = require("express-validator")

// Displays list of all trucks
exports.truck_list = (req, res, next) => {
  async.parallel(
    {
      truck_list(callback) {
        Trucks.find({})
          .exec(callback)
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render('truck_list', {
        title: "Trucks",
        truck_list: results.truck_list
      })
    }
  )
}

// Displays details for one truck
exports.truck_detail = (req, res, next) => {
  async.parallel(
    {
      truck(callback) {
        Trucks.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if(err) {
        return next(err);
      }

      res.render("truck_detail", {
        title: results.truck.name,
        truck: results.truck
      })
    }
  )
}