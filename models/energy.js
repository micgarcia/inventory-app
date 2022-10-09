const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EnergySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
})

EnergySchema.virtual("url").get(function () {
  return `/catalog/energy/`;
});

module.exports = mongoose.model("Energy", EnergySchema);