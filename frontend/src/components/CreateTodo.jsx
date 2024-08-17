import { useState } from "react";
export function CreateTodo() {
  /*The methods below are not optimal because there are rerenders everytime setTitle or setDescription is called 
   but the general rule of thumb in react is to minimize the number of rerenders. For simplicity in our case we'll be using them*/
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <input
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="title"
        onChange={(e) => {
          //When anything changes inside the input field this happens
          const value = e.target.value;
          setTitle(value);
        }}
      ></input>
      <br />
      <input
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="description"
        onChange={(e) => {
          const value = e.target.value;
          setDescription(value);
        }}
      ></input>
      <br />

      <button
        style={{
          padding: 10,
          margin: 10,
        }}
        onClick={() => /*Now we have to send the body as string for obvious reasons. The data we are creating the inputs in
         is in an 'object' like strucutre. For eg. if we send the data like this:-
         {
          title: title,
          description: description
         }
         The problem we'll face is that the above syntax is for an object and our backend doesn't take object
         as the body it takes a JSON. JSON.stringify(data) converts the data to a JSON object and that's what our backend
         accepts
         */ {
          /*Now we have to send the body as string for obvious reasons. The data we are creating the inputs in
         is in an 'object' like strucutre. For eg. if we send the data like this:-
         {
          title: title,
          description: description
         }
         The problem we'll face is that the above syntax is for an object and our backend doesn't take object
         as the body it takes a JSON. JSON.stringify(data) converts the data to a JSON object and that's what our backend
         accepts
         */
          fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            const json = await res.json(res);
          });
        }}
      >
        Add a todo
      </button>
    </>
  );
}
