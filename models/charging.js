const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChargingSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
})

ChargingSchema.virtual("url").get(function () {
  return `/catalog/charging/`;
});

module.exports = mongoose.model("Charging", ChargingSchema);