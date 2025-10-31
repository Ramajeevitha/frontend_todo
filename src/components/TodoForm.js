import React, { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        style={{ padding: '10px', width: '250px' }}
      />
      <button type="submit" style={{ marginLeft: '10px', padding: '10px' }}>
        Add
      </button>
    </form>
  );
}

export default TodoForm;
