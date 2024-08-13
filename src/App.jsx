import React, { useState, useEffect } from 'react'
import Background from './components/Background'
import Forground from './components/Forground'
import { TodoProvider } from './contexts'

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev]);
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (
      prevTodo.id === id ? todo : prevTodo
    )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (
      prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
    )))
  }

  useEffect(() => {
    try {
      const todos = JSON.parse(localStorage.getItem("todos"))
      if (todos && todos.length >  0) {
        setTodos(todos)
      }
    } catch (e) {
      console.error("Failed to parse todos from localStorage", e)
    }
  }, [])

  useEffect(() => {
    console.log("Saving todos to localStorage:", todos)
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className=' relative w-full h-screen bg-zinc-800'>
        <Background />
        <Forground />
      </div>
    </TodoProvider>
  
  )
}

export default App
