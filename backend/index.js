const express = require("express");
const { createTodo, updateTodo } = require("./types.js");
const { Todo } = require("./db/db_schema.js");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      message: "Wrong input types",
    });
    return;
  }

  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.status(200).json({
    message: `Created a todo item`,
  });
});

app.get("/todos", async (req, res) => {
  const allTodos = await Todo.find({});
  res.status(200).json(allTodos);
});

app.put("/completed", async (req, res) => {
  const updatedPayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatedPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      message: "Wrong id",
    });
    return;
  }

  const updateId = updatedPayload.id;
  await Todo.updateOne(
    {
      _id: updateId,
    },
    {
      completed: true,
    },
  );

  res.json({
    message: "Completed todo",
  });
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
