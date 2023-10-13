import { useEffect } from "react";
import { useState } from "react";

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetAllTodo = async (limit = 50) => {
    setIsLoading(true);

    const resp1 = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`,
      {
        method: "get",
      },
    );
    const resp2 = await resp1.json();

    setTodos(resp2);
    setIsLoading(false);

    // .then((resp1) => response.json())
    // .then((resp2) => {
    //   setIsLoading(false);
    //   setTodos(resp2);
    // });
  };

  useEffect(() => {
    handleGetAllTodo();
  }, []);

  return (
    <div>
      <select
        onChange={(e) => {
          handleGetAllTodo(e.target.value);
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>

      {isLoading && "loading...."}

      {!isLoading &&
        todos.map((todo) => {
          return (
            <div
              key={todo.id}
              style={{
                marginBottom: "1rem",
              }}
            >
              <span>{todo.title}</span>
              <button
                style={{
                  color: todo.completed ? "green" : "orange",
                  marginLeft: "1rem",
                }}
              >
                {todo.completed ? "completed" : "processing"}
              </button>
            </div>
          );
        })}
    </div>
  );
}
