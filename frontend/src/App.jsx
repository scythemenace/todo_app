import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo.jsx";
import { Todos } from "./components/Todos.jsx";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  //From this point our job is to hit the backend and fetch the data and use that
  fetch("http://localhost:3000/todos").then(async (unparsedData) => {
    const data = await unparsedData.json();
    setTodos(data);
  });
  /*Technically apart from CORS the above way is a bad way to do it, in the case our backend got overwhelemed, we
   can notice in our networks tab that a new request gets called out every time our component gets reloaded 
   and it kind of sends a very high number of requests whenever each time */
  /*
    Doing the above fetch syntax without having proper permissions from the backend will give us 
    CORS error which basically means that a different frontend url cannot be allowed
    to hit a backend url unless the backend allows it to do so
    We can solve this by installing cors `npm install cors` in our backend/ folder
    *Check the backend/index.js for more details*
    });
  */
  return (
    <>
      <CreateTodo></CreateTodo>
      {/*Here we have to render the todos here. Here we need a little bit of state management.
      we'll do this in a separate file*/}
      {console.log(todos)}
      <Todos todos={todos}></Todos>
    </>
  );
}

export default App;
