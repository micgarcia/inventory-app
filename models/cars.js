const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarsSchema = new Schema({
  name: { type: String, required: true, maxLength: 100},
  description: { type: String, required: true},
  price: { type: Number, required: true},
  stock: { type: Number, required: true},
  trim: { type: String, required: true, maxLength: 50},
})

CarsSchema.virtual("url").get(function () {
  return `/catalog/cars/${this._id}`;
});


module.exports = mongoose.model("Cars", CarsSchema);