import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

const fetchTodos = async () => {
  try {
    const res = await axios.get(`${API}/todos`);
    console.log("API DATA:", res.data);

    setTodos(Array.isArray(res.data) ? res.data : []);
  } catch (error) {
    console.error("Fetch error:", error);
    setTodos([]);
  }
};

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post(`${API}/todos`, { title });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const updateTodo = async () => {
    await axios.put(`${API}/todos/${editId}`, {
      title: editTitle,
    });
    setEditId(null);
    setEditTitle("");
    fetchTodos();
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea, #764ba2);
          min-height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .todo-container {
          max-width: 500px;
          width: 100%;
          padding: 25px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          border-radius: 15px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
          text-align: center;
          color: #fff;
        }

        h2 {
          margin-bottom: 20px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .todo-input {
          padding: 12px;
          width: 65%;
          border: none;
          border-radius: 8px;
          outline: none;
          margin-right: 10px;
          font-size: 14px;
        }

        .add-btn {
          padding: 12px 16px;
          background: linear-gradient(to right, #00c6ff, #0072ff);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          font-weight: 500;
        }

        .add-btn:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }

        .todo-list {
          list-style: none;
          padding: 0;
          margin-top: 25px;
        }

        .todo-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.2);
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 10px;
          backdrop-filter: blur(6px);
          transition: 0.3s;
        }

        .todo-item:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.3);
        }

        .todo-item span {
          flex: 1;
          text-align: left;
          font-size: 15px;
        }

        .todo-item button {
          margin-left: 6px;
          padding: 6px 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          transition: 0.3s;
        }

        .todo-item button:nth-child(2) {
          background: #facc15;
          color: #000;
        }

        .todo-item button:nth-child(3) {
          background: #ef4444;
          color: #fff;
        }

        .todo-item button:first-of-type {
          background: #22c55e;
          color: white;
        }

        .todo-item button:last-of-type {
          background: #6b7280;
          color: white;
        }

        .todo-item input {
          flex: 1;
          padding: 6px;
          margin-right: 10px;
          border-radius: 6px;
          border: none;
          outline: none;
        }

        @media (max-width: 600px) {
          .todo-container {
            margin: 10px;
          }

          .todo-input {
            width: 60%;
          }
        }
      `}</style>

      <div className="todo-container">
        <h2>TODO App</h2>

        <div style={{ marginBottom: "15px" }}>
          <input
            className="todo-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task"
          />
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        </div>

        <ul className="todo-list">
         {Array.isArray(todos) && todos.map((todo) =>(
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