const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://pankur216:L4oqQ2mG1SdZ5k72@cluster0.goqdl4x.mongodb.net/todo_app?retryWrites=true&w=majority&appName=Cluster0",
);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo,
};
