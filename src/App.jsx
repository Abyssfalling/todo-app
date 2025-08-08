import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import './App.css';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false, priority: 'normal' }
    ])
    setInput('')
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const setPriority = (id, priority) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, priority } : todo
    ))
  }

  return (
    <div className="main-layout">
      <div className="card stats-card">
        <h2>任务统计</h2>
        <div>总任务：{todos.length}</div>
        <div>已完成：{todos.filter(t => t.completed).length}</div>
      </div>
      <div className="card input-card">
        <form
          className="add-todo-form"
          onSubmit={e => {
            e.preventDefault()
            addTodo()
          }}
        >
          <input
            className="add-todo-input"
            type="text"
            placeholder="输入新任务..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="add-todo-btn" type="submit">添加</button>
        </form>
      </div>
      <div className="card list-card">
        <h2>任务列表</h2>
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleComplete(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={editTodo}
              onPriority={setPriority}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
