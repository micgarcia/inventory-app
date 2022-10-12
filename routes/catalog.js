const express = require("express");
const router = express.Router();

// Require controller modules
const accessory_controller = require("../controllers/accessoryController");
const cars_controller = require("../controllers/carsController");
const charging_controller = require("../controllers/chargingController");
const energy_controller = require("../controllers/energyController");
const trucks_controller = require("../controllers/trucksController");

//  GET Catalog Home Page
router.get("/", cars_controller.catalog);

/// CARS ROUTES ///

// GET request for creating a car
router.get("/cars/create", cars_controller.car_create_get);

// POST request for creating car
router.post("/cars/create", cars_controller.car_create_post);

// GET request for updating car
router.get("/cars/:id/update", cars_controller.car_update_get);

// POST request for updating car
router.post("/cars/:id/update", cars_controller.car_update_post);

// GET request for deleting car
router.get("/cars/:id/delete", cars_controller.car_delete_get);

// POST request for deleting car
router.post("/cars/:id/delete", cars_controller.car_delete_post);

// GET request for list of all Car items
router.get("/cars", cars_controller.car_list);

// GET request for one Car details
router.get("/cars/:id", cars_controller.car_detail);


/// TRUCKS ROUTES ///


// GET request for list of all Truck items
router.get('/trucks', trucks_controller.truck_list);

// GET request for one Truck details
router.get('/trucks/:id', trucks_controller.truck_detail);





module.exports = router;