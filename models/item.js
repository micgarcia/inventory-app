const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100},
  description: { type: String, required: true},
  category: { type: Schema.Types.ObjectId, refPath: "item_type"},
  item_type: { type: String, required: true},
  price: { type: Number, required: true},
  stock: { type: Number, required: true},
  compatible: { type: Array, required: true}
});

ItemSchema.virtual("url").get(function() {
  return `catalog/${this.item_type}/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);