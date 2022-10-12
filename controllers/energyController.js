const async = require("async");

const Accessory = require("../models/accessory");
const Cars = require("../models/cars");
const Charging = require("../models/charging")
const Energy = require("../models/energy")
const Trucks = require("../models/trucks")
const { body, validationResult } = require("express-validator")

// Displays list of all energy
exports.energy_list = (req, res, next) => {
  async.parallel(
    {
      energy_list(callback) {
        Energy.find({})
          .exec(callback)
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render('energy_list', {
        title: "Energy Products",
        energy_list: results.energy_list
      })
    }
  )
}

// Displays details for one energy product
exports.energy_detail = (req, res, next) => {
  async.parallel(
    {
      energy(callback) {
        Energy.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if(err) {
        return next(err);
      }

      res.render("energy_detail", {
        title: results.energy.name,
        energy: results.energy
      })
    }
  )
}

// Renders form for creating new energy product
exports.energy_create_get = (req, res, next) => {
  res.render("energy_form", {
    title: "Add Energy Product",
  })
}

// Posts new energy product
exports.energy_create_post = [
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

    const energy = new Energy({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock
    });

    if (!errors.isEmpty()) {
      // There are errors, re-render form with values
      res.render("energy_form", {
        title: "Add Energy Product",
        energy,
        errors: errors.array()
      });
      return;
    }

    energy.save((err) => {
      if (err) {
        return next(err);
      }

      res.redirect(energy.url);
    })
  }
];


exports.energy_update_get = (req, res, next) => {
  async.parallel(
    {
      energy(callback) {
        Energy.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      };

      res.render("energy_form", {
        title: "Update Energy Product",
        energy: results.energy
      })
    }
  )
}

exports.energy_update_post = [
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

    const energy = new Energy({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      // There are errors, re-render form with values
      res.render("energy_form", {
        title: "Update Energy Product",
        energy,
        errors: errors.array()
      });
      return;
    }

    Energy.findByIdAndUpdate(req.params.id, energy, {}, (err, theenergy) => {
      if (err) {
        return next(err);
      }
      res.redirect(theenergy.url);
    } )
  }
];

exports.energy_delete_get = (req, res, next) => {
  async.parallel(
    {
      energy(callback) {
        Energy.findById(req.params.id)
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render("energy_delete", {
        title: "Delete Energy Product",
        energy: results.energy
      })
    }
  )
}

exports.energy_delete_post = (req, res, next) => {
  async.parallel(
    {
      energy(callback) {
        Energy.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }

      Energy.findByIdAndRemove(req.body.energyid, (err) => {
        if (err) {
          return next(err)
        }

        res.redirect("/catalog/energy");
      })
    }
  )
}