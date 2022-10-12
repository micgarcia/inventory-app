const async = require("async");

const Accessory = require("../models/accessory");
const Cars = require("../models/cars");
const Charging = require("../models/charging")
const Energy = require("../models/energy")
const Trucks = require("../models/trucks")
const { body, validationResult } = require("express-validator")

// Displays list of all charging
exports.charging_list = (req, res, next) => {
  async.parallel(
    {
      charging_list(callback) {
        Charging.find({})
          .exec(callback)
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render('charging_list', {
        title: "Charging Products",
        charging_list: results.charging_list
      })
    }
  )
}

// Displays details for one charging product
exports.charging_detail = (req, res, next) => {
  async.parallel(
    {
      charging(callback) {
        Charging.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if(err) {
        return next(err);
      }

      res.render("charging_detail", {
        title: results.charging.name,
        charging: results.charging
      })
    }
  )
}

// Renders form for creating new charging product
exports.charging_create_get = (req, res, next) => {
  res.render("charging_form", {
    title: "Add Charging Product",
  })
}

// Posts new charging product
exports.charging_create_post = [
  // Validate and sanitize fields
  body("name", "Name must not be empty.")
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

    const charging = new Charging({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      compatible: req.body.compatible
    });

    if (!errors.isEmpty()) {
      // There are errors, re-render form with values
      res.render("charging_form", {
        title: "Add Charging Product",
        charging,
        errors: errors.array()
      });
      return;
    }

    charging.save((err) => {
      if (err) {
        return next(err);
      }

      res.redirect(charging.url);
    })
  }
];


exports.charging_update_get = (req, res, next) => {
  async.parallel(
    {
      charging(callback) {
        Charging.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      };

      res.render("charging_form", {
        title: "Update Charging Product",
        charging: results.charging
      })
    }
  )
}

exports.charging_update_post = [
  // Validate and sanitize fields
  body("name", "Name must not be empty.")
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
  body("compatible", "Compatible must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const charging = new Charging({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      compatible: req.body.compatible,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      // There are errors, re-render form with values
      res.render("charging_form", {
        title: "Update Charging Product",
        charging,
        errors: errors.array()
      });
      return;
    }

    Charging.findByIdAndUpdate(req.params.id, charging, {}, (err, thecharging) => {
      if (err) {
        return next(err);
      }
      res.redirect(thecharging.url);
    } )
  }
];

exports.charging_delete_get = (req, res, next) => {
  async.parallel(
    {
      charging(callback) {
        Charging.findById(req.params.id)
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render("charging_delete", {
        title: "Delete Charging Product",
        charging: results.charging
      })
    }
  )
}

exports.charging_delete_post = (req, res, next) => {
  async.parallel(
    {
      charging(callback) {
        Charging.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }

      Charging.findByIdAndRemove(req.body.chargingid, (err) => {
        if (err) {
          return next(err)
        }

        res.redirect("/catalog/charging");
      })
    }
  )
}