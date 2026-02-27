import { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit, isDark }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  //  Цвета в зависимости от темы
  const textColor = isDark ? '#fff' : '#333';
  const completedColor = isDark ? '#777' : '#999';
  const borderColor = isDark ? '#555' : '#eee';
  const inputBg = isDark ? '#444' : '#fff';

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px',
      borderBottom: `1px solid ${borderColor}` 
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ 
            flex: 1, 
            padding: '4px',
            background: inputBg,
            color: textColor,
            border: `1px solid ${borderColor}`
          }}
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',

            color: task.completed ? completedColor : textColor,
            cursor: 'pointer'
          }}
        >
          {task.text}
        </span>
      )}

      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;