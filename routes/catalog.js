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

// GET request for creating truck
router.get('/trucks/create', trucks_controller.truck_create_get);

// POST request for creating truck
router.post('/trucks/create', trucks_controller.truck_create_post);

// GET request for updating truck
router.get("/trucks/:id/update", trucks_controller.truck_update_get);

// POST request for updating truck
router.post("/trucks/:id/update", trucks_controller.truck_update_post);

// GET request for deleting truck
router.get('/trucks/:id/delete', trucks_controller.truck_delete_get);

// POST request for deleting truck
router.post('/trucks/:id/delete', trucks_controller.truck_delete_post);

// GET request for list of all Truck items
router.get('/trucks', trucks_controller.truck_list);

// GET request for one Truck details
router.get('/trucks/:id', trucks_controller.truck_detail);


/// ENERGY ROUTES ///

// GET request for creating energy
router.get('/energy/create', energy_controller.energy_create_get);

// POST request for creating energy
router.post('/energy/create', energy_controller.energy_create_post);

// GET request for updating energy
router.get("/energy/:id/update", energy_controller.energy_update_get);

// POST request for updating energy
router.post("/energy/:id/update", energy_controller.energy_update_post);

// GET request for deleting energy
router.get('/energy/:id/delete', energy_controller.energy_delete_get);

// POST request for deleting energy
router.post('/energy/:id/delete', energy_controller.energy_delete_post);

// GET request for list of all energy items
router.get('/energy', energy_controller.energy_list);

// GET request for one energy details
router.get('/energy/:id', energy_controller.energy_detail);


/// CHARGING ROUTES ///

// GET request for creating charging
router.get('/charging/create', charging_controller.charging_create_get);

// POST request for creating charging
router.post('/charging/create', charging_controller.charging_create_post);

// GET request for updating charging
router.get("/charging/:id/update", charging_controller.charging_update_get);

// POST request for updating charging
router.post("/charging/:id/update", charging_controller.charging_update_post);

// GET request for deleting charging
router.get('/charging/:id/delete', charging_controller.charging_delete_get);

// POST request for deleting charging
router.post('/charging/:id/delete', charging_controller.charging_delete_post);

// GET request for list of all charging items
router.get('/charging', charging_controller.charging_list);

// GET request for one charging details
router.get('/charging/:id', charging_controller.charging_detail);


/// ACCESSORY ROUTES ///

// GET request for creating accessory
router.get('/accessory/create', accessory_controller.accessory_create_get);

// POST request for creating accessory
router.post('/accessory/create', accessory_controller.accessory_create_post);

// GET request for updating accessory
router.get("/accessory/:id/update", accessory_controller.accessory_update_get);

// POST request for updating accessory
router.post("/accessory/:id/update", accessory_controller.accessory_update_post);

// GET request for deleting accessory
router.get('/accessory/:id/delete', accessory_controller.accessory_delete_get);

// POST request for deleting charging
router.post('/accessory/:id/delete', accessory_controller.accessory_delete_post);

// GET request for list of all accessory items
router.get('/accessory', accessory_controller.accessory_list);

// GET request for one accessory details
router.get('/accessory/:id', accessory_controller.accessory_detail);


module.exports = router;