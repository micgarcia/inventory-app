const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChargingSchema = new Schema({
  name: { type: String, required: true, maxLength: 100},
  description: { type: String, required: true},
  price: { type: Number, required: true},
  stock: { type: Number, required: true},
  compatible: { type: Array, required: true}
}, { collection: 'charging' });

ChargingSchema.virtual("url").get(function () {
  return `/catalog/charging/${this._id}`;
});

module.exports = mongoose.model("Charging", ChargingSchema);