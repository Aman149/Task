import { useState, useEffect } from 'react'
import './TodoCompleted.css'
import deleteIcon from '../assets/delete.svg'

function Login() {
  return (
    <div className='todo-home'>
        <p className='nav'>
            <i className='arrow-right'></i>
        </p>
        <h1 className='todo-heading'>Completed</h1>
        <div class="todo-list">
          <div class="todo-item-completed">
            <input type="radio" id="todo-1" name="todos" checked />
            <label className='todo-text' for="todo-1">Todo item 1</label>
            <span class="delete-icon">
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
          <div class="todo-item-completed">
            <input type="radio" id="todo-2" name="todos" />
            <label className='todo-text' for="todo-2">Todo item 2</label>
            <span class="delete-icon">
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
      </div>
    </div>
  )
}

export default Login;
