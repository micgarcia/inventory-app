const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EnergyProductSchema = new Schema({
  name: { type: String, required: true, maxLength: 100},
  description: { type: String, required: true},
  category: { type: Schema.Types.ObjectId, ref: "Energy"},
  price: { type: Number, required: true},
  stock: { type: Number, required: true},
});

EnergyProductSchema.virtual("url").get(function() {
  return `catalog/energy/${this._id}`;
});

module.exports = mongoose.model("EnergyProduct", EnergyProductSchema);