const async = require("async");

const Accessory = require("../models/accessory");
const Cars = require("../models/cars");
const Charging = require("../models/charging")
const Energy = require("../models/energy")
const Trucks = require("../models/trucks")
const { body, validationResult } = require("express-validator")

// Displays list of all accessory
exports.accessory_list = (req, res, next) => {
  async.parallel(
    {
      accessory_list(callback) {
        Accessory.find({})
          .exec(callback)
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render('accessory_list', {
        title: "Accessories",
        accessory_list: results.accessory_list
      })
    }
  )
}

// Displays details for one accessory product
exports.accessory_detail = (req, res, next) => {
  async.parallel(
    {
      accessory(callback) {
        Accessory.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if(err) {
        return next(err);
      }
      console.log(results.accessory.compatible)

      res.render("accessory_detail", {
        title: results.accessory.name,
        accessory: results.accessory
      })
    }
  )
}

// Renders form for creating new accessory product
exports.accessory_create_get = (req, res, next) => {
  res.render("accessory_form", {
    title: "Add Accessory",
  })
}

// Posts new accessory product
exports.accessory_create_post = [
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

    const accessory = new Accessory({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      compatible: req.body.compatible
    });

    if (!errors.isEmpty()) {
      // There are errors, re-render form with values
      res.render("accessory_form", {
        title: "Add Accessory",
        accessory,
        errors: errors.array()
      });
      return;
    }

    accessory.save((err) => {
      if (err) {
        return next(err);
      }

      res.redirect(accessory.url);
    })
  }
];


exports.accessory_update_get = (req, res, next) => {
  async.parallel(
    {
      accessory(callback) {
        Accessory.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      };

      res.render("accessory_form", {
        title: "Update Accessory",
        accessory: results.accessory
      })
    }
  )
}

exports.accessory_update_post = [
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

    const accessory = new Accessory({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      compatible: req.body.compatible,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      // There are errors, re-render form with values
      res.render("accessory_form", {
        title: "Update Accessory",
        accessory,
        errors: errors.array()
      });
      return;
    }

    Accessory.findByIdAndUpdate(req.params.id, accessory, {}, (err, theaccessory) => {
      if (err) {
        return next(err);
      }
      res.redirect(theaccessory.url);
    } )
  }
];

exports.accessory_delete_get = (req, res, next) => {
  async.parallel(
    {
      accessory(callback) {
        Accessory.findById(req.params.id)
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render("accessory_delete", {
        title: "Delete Accessory",
        accessory: results.accessory
      })
    }
  )
}

exports.accessory_delete_post = (req, res, next) => {
  async.parallel(
    {
      accessory(callback) {
        Accessory.findById(req.params.id)
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }

      Accessory.findByIdAndRemove(req.body.accessoryid, (err) => {
        if (err) {
          return next(err)
        }

        res.redirect("/catalog/accessory");
      })
    }
  )
}