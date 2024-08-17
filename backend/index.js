const express = require("express");
const cors = require("cors");
const { createTodo, updateTodo } = require("./types.js");
const { Todo } = require("./db/db_schema.js");
const app = express();
const port = 3000;

app.use(express.json());
/*app.use(cors());
    Adding to the frontend comments in our App.jsx file in our frontend/ folder, what this does is that basically this backend
    is slightly unsecure, any frontend can hit this backend (we can totally hit this backend from a server, postman, etc. but when
    some frontend tries to hit it silently, it will give the cors error so we write this to avoid that) */

/*But for our usecase we need to allow only our specific frontend(5173) to hit the backend*/
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

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
