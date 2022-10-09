const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrucksSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
})

TrucksSchema.virtual("url").get(function () {
  return `/catalog/trucks/`;
});

module.exports = mongoose.model("Trucks", TrucksSchema);