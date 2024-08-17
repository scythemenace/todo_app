import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo.jsx";
import { Todos } from "./components/Todos.jsx";
import "./App.css";

function App() {
  return (
    <>
      <CreateTodo></CreateTodo>
      {/*Here we have to render the todos here. Here we need a little bit of state management.
      we'll do this in a separate file*/}
      <Todos></Todos>
    </>
  );
}

export default App;
