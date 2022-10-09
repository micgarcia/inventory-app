const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarsSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
})

CarsSchema.virtual("url").get(function () {
  return `/catalog/cars/`;
});

module.exports = mongoose.model("Cars", CarsSchema);