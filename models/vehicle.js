const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  name: { type: String, required: true, maxLength: 100},
  description: { type: String, required: true},
  category: { type: Schema.Types.ObjectId, refPath: "car_type"},
  car_type: { type: String, enum: ['Cars, Trucks'], required: true},
  price: { type: Number, required: true},
  stock: { type: Number, required: true},
  trim: { type: String, required: true, maxLength: 50}
});

VehicleSchema.virtual("url").get(function() {
  return `catalog/${this.car_type}/${this._id}`;
});

module.exports = mongoose.model("Vehicle", VehicleSchema);