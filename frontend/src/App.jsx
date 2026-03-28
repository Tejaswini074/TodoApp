import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3000/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post("http://localhost:3000/todos", { title });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const updateTodo = async () => {
    await axios.put(`http://localhost:3000/todos/${editId}`, {
      title: editTitle,
    });
    setEditId(null);
    setEditTitle("");
    fetchTodos();
  };

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background: #f4f6f8;
        }

        .todo-container {
          max-width: 500px;
          margin: 50px auto;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          text-align: center;
        }

        h2 {
          margin-bottom: 20px;
        }

        .todo-input {
          padding: 10px;
          width: 65%;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 10px;
        }

        .add-btn {
          padding: 10px 15px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .add-btn:hover {
          background: #0056b3;
        }

        .todo-list {
          list-style: none;
          padding: 0;
          margin-top: 20px;
        }

        .todo-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9f9f9;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
        }

        .todo-item span {
          flex: 1;
          text-align: left;
        }

        .todo-item button {
          margin-left: 5px;
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .todo-item button:first-of-type {
          background: #28a745;
          color: white;
        }

        .todo-item button:last-of-type {
          background: #dc3545;
          color: white;
        }

        .todo-item input {
          flex: 1;
          padding: 5px;
          margin-right: 10px;
        }
      `}</style>

      <div className="todo-container">
        <h2>TODO App</h2>

        <input
          className="todo-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button className="add-btn" onClick={addTodo}>
          Add
        </button>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {editId === todo.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button onClick={updateTodo}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{todo.title}</span>
                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;