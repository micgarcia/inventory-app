const async = require("async");

const Accessory = require("../models/accessory");
const Cars = require("../models/cars");
const Charging = require("../models/charging")
const Energy = require("../models/energy")
const Trucks = require("../models/trucks")
const { body, validationResult } = require("express-validator")

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
        data: results,
      });
    }
  )
}

// Displays list of all cars
exports.car_list = (req, res, next) => {
  async.parallel(
    {
      cars_list(callback) {
        Cars.find({})
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("car_list", {
        title: "Car List",
        car_list: results.cars_list,
      })
    }
  )
}

// Displays details for one Car
exports.car_detail = (req, res, next) => {
  async.parallel(
    {
      car(callback) {
        Cars.findById(req.params.id)
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.car == null) {
        const err = new Error("Car not found");
        err.status = 404;
        return next(err);
      }
      res.render("car_detail", {
        title: results.car.name,
        car: results.car
      });
    }
  );
}


// Display car create form on GET
exports.car_create_get = (req, res, next) => {
  res.render("car_form", {
    title: "Add Car"
  })
}

// Handle car create on POST
exports.car_create_post = [

  // Validate and sanitize fields
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1})
    .escape(),
  body("trim", "Trim must not be empty.")
    .trim()
    .isLength({ min: 1})
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1})
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
  body("stock", "Stock must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),

  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    const car = new Cars({
      name: req.body.name,
      trim: req.body.trim,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      // There are errors, render form again with values

      res.render("car_form", {
        title: "Add Car",
        car,
        errors: errors.array()
      });
      return;
    }

    car.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(car.url);
    })
  }
]

exports.car_update_get = (req, res, next) => {
  async.parallel(
    {
      car(callback) {
        Cars.findById(req.params.id)
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("car_form", {
        title: results.car.name,
        car: results.car
      })
    }
  )
}

exports.car_update_post = (req, res, next) => {
  res.send("Car Update post");
}

exports.car_delete_get = (req, res, next) => {
  res.send("car delete get");
}

exports.car_delete_post = (req, res, next) => {
  res.send('car delete post');
}