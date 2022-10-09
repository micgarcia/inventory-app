const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccessorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100},
  description: { type: String, required: true},
  price: { type: Number, required: true},
  stock: { type: Number, required: true},
  compatible: { type: Array, required: true}
}, { collection: 'accessory'})

AccessorySchema.virtual("url").get(function () {
  return `/catalog/accessory/${this._id}`;
});

module.exports = mongoose.model("Accessory", AccessorySchema);