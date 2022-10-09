const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EnergySchema = new Schema({
  name: { type: String, required: true, maxLength: 100},
  description: { type: String, required: true},
  price: { type: Number, required: true},
  stock: { type: Number, required: true},
})

EnergySchema.virtual("url").get(function () {
  return `/catalog/energy/${this._id}`;
});

module.exports = mongoose.model("Energy", EnergySchema);