export function Todos(props) {
  return (
    <>
      {
        // eslint-disable-next-line react/prop-types
        props.todos.map((todo) => {
          return (
            <>
              <h1>{todo.title}</h1>
              <h2>{todo.description}</h2>
              <button>
                {todo.completed ? "Completed" : "Mark as Complete"}
              </button>
            </>
          );
        })
      }
    </>
  );
}
