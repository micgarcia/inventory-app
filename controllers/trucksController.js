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

// Renders form for creating new truck
exports.truck_create_get = (req, res, next) => {
  res.render("truck_form", {
    title: "Add Truck",
  })
}

// Posts new truck
exports.truck_create_post = [
  // Validate and sanitize fields
  body("name", "Name must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
  body("trim", "Trim must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({min:1})
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
    const errors = validationResult(req);

    const truck = new Trucks({
      name: req.body.name,
      trim: req.body.trim,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock
    });

    if (!errors.isEmpty()) {
      // There are errors, re-render form with values
      res.render("truck_form", {
        title: "Add Truck",
        truck,
        errors: errors.array()
      });
      return;
    }

    truck.save((err) => {
      if (err) {
        return next(err);
      }

      res.redirect(truck.url);
    })
  }
];


exports.truck_update_get = (req, res, next) => {
  async.parallel(
    {
      truck(callback) {
        Trucks.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      };

      res.render("truck_form", {
        title: "Update Truck",
        truck: results.truck
      })
    }
  )
}

exports.truck_update_post = [
  // Validate and sanitize fields
  body("name", "Name must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
  body("trim", "Trim must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({min:1})
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
    const errors = validationResult(req);

    const truck = new Trucks({
      name: req.body.name,
      trim: req.body.trim,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      // There are errors, re-render form with values
      res.render("truck_form", {
        title: "Add Truck",
        truck,
        errors: errors.array()
      });
      return;
    }

    Trucks.findByIdAndUpdate(req.params.id, truck, {}, (err, thetruck) => {
      if (err) {
        return next(err);
      }
      res.redirect(thetruck.url);
    } )
  }
];

exports.truck_delete_get = (req, res, next) => {
  async.parallel(
    {
      truck(callback) {
        Trucks.findById(req.params.id)
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render("truck_delete", {
        title: "Delete Truck",
        truck: results.truck
      })
    }
  )
}

exports.truck_delete_post = (req, res, next) => {
  async.parallel(
    {
      truck(callback) {
        Trucks.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }

      Trucks.findByIdAndRemove(req.body.truckid, (err) => {
        if (err) {
          return next(err)
        }

        res.redirect("/catalog/trucks");
      })
    }
  )
}