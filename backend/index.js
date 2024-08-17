const express = require("express");
const { createTodo, updateTodo } = require("./types.js");
const { Todo } = require("./db/db_schema.js");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/todo", async (req, res) => {
  const payload = req.body;
  const parsedPayload = createTodo.safeParse(payload);
  if (!parsedPayload.success) {
    res.status(411).json({
      message: "Wrong input types",
    });
    return;
  }

  const todo_item = new Todo({
    title: parsedPayload.title,
    description: parsedPayload.description,
  });

  await todo_item.save();

  res.status(200).json({
    message: `Created a todo item ${todo_item}`,
  });
});

app.get("/todos", (req, res) => {});

app.put("/completed", async (req, res) => {
  const updatedPayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatedPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      message: "Wrong id's",
    });
    return;
  }
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
