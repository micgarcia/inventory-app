const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100},
  description: { type: String, required: true},
  category: { type: Schema.Types.ObjectId, refPath: "item_type"},
  car_type: { type: String, enum: ['Charging, Accessory'], required: true},
  price: { type: Number, required: true},
  stock: { type: Number, required: true},
  compatible: { type: Array, required: true, enum: ["Model 3", "Model Y", "Model S", "Model X"]}
});

ItemSchema.virtual("url").get(function() {
  return `catalog/${this.item_type}/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);