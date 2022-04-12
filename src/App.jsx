import "./App.css";
import Tasks from "./components/tasks";
import Task from "./components/task";
import TaskManager from "./components/TaskManager";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.description || !todo.title) {
      return todo;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(todo, ...todos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  const editTask = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.description = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditing(null);
    setEditingText("");
  };

  return (
    <div className="App container mt-5">
      <h1 className="display-2">What to do today 🤨?</h1>

      <TaskManager onSubmit={addTodo} />

      <section className="container-fluid bg-dark">
        <div className="bg-primary text-white">
          <h2>Tasks</h2>
        </div>
       <div className="row">
       {todos ? (
          todos.map((item, i) => (
            <div className="card bg-primary text-white mt-3" key={i}>
              <h2 className="card-title pd">{item.title}</h2>

              {editing === item.id ? (
                <input
                  type="text"
                  className="input-group mb-3 form-control"
                  onChange={(e) => setEditingText(e.target.value)}
                  value={editingText}
                />
              ) : (
                <p className="card-text">{item.description}</p>
              )}

              <p className="card-text bg-secondary pd mb-3">
                Status: {item.status}
              </p>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(item.id)}
                >
                  Delete
                </button>

                {editing === item.id ? (
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => editTask(item.id)}
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => setEditing(item.id)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <Tasks />
        )}
        </div>
      </section>
    </div>
  );
}
