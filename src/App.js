import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);

  // ✅ Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ Add new todo
  const addTodo = async (title) => {
    try {
      const res = await axios.post(`${API}/todos`, { title });
      setTodos(prev => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Toggle complete
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.patch(`${API}/todos/${id}`, { completed });
      setTodos(prev => prev.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`);
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Edit todo title
  const editTodo = async (id, newTitle) => {
    try {
      const res = await axios.put(`${API}/todos/${id}`, { title: newTitle });
      setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app" style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>✅ Todo App (MERN)</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
