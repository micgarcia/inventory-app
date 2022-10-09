const express = require("express");
const router = express.Router();

// Require controller modules
const accessory_controller = require("../controllers/accessoryController");
const cars_controller = require("../controllers/carsController");
const charging_controller = require("../controllers/chargingController");
const energy_controller = require("../controllers/energyController");
const energy_product_controller = require("../controllers/energyproductController");
const item_controller = require("../controllers/itemController");
const trucks_controller = require("../controllers/trucksController");
const vehicle_controller = require("../controllers/vehicleController");

//  GET Catalog Home Page
router.get("/", cars_controller.catalog);

/// CARS ROUTES ///

// GET request for list of all Car items
router.get("/cars", cars_controller.car_list);

// GET request for one Car details
router.get("/cars/:id", cars_controller.car_detail)





module.exports = router;