import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing && newTitle.trim() !== todo.title) {
      onEdit(todo._id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li
      style={{
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ padding: '5px', width: '200px' }}
        />
      ) : (
        <span
          onClick={() => onToggle(todo._id, !todo.completed)}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            cursor: 'pointer',
            width: '200px',
          }}
        >
          {todo.title}
        </span>
      )}

      <button onClick={handleEdit} style={{ padding: '5px 10px' }}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button
        onClick={() => onDelete(todo._id)}
        style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: 'white' }}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
