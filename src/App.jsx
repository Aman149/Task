import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/Login.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import Signup from './components/Signup.jsx'
import Todo from './components/Todo.jsx'
import TodoCompleted from './components/TodoCompleted.jsx'




function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
