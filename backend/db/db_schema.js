const mongoose = require("mongoose");
const mongoDBUri = require("./mongoDBUri.js");

console.log(mongoDBUri);

mongoose.connect(mongoDBUri);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo,
};
