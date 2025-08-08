import React, { useState } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onPriority }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText)
      setIsEditing(false)
    }
  }

  return (
    <li
      className={
        `todo-item priority-${todo.priority || 'normal'}${todo.completed ? ' completed' : ''}`
      }
    >
      <input
        className="todo-checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        aria-label="Mark as completed"
      />
      {isEditing ? (
        <input
          className="edit-input"
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleEdit}>{todo.text}</span>
      )}
      <select
        className="priority-select"
        value={todo.priority || 'normal'}
        onChange={e => onPriority(todo.id, e.target.value)}
        title="Set priority"
      >
        <option value="low">低</option>
        <option value="normal">普通</option>
        <option value="high">高</option>
      </select>
      <button
        className="delete-btn"
        onClick={onDelete}
        aria-label="Delete task"
        title="Delete"
      >
        ×
      </button>
    </li>
  )
}
