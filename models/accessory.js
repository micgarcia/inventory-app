const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccessorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
})

AccessorySchema.virtual("url").get(function () {
  return `/catalog/accessory/`;
});

module.exports = mongoose.model("Accessory", AccessorySchema);