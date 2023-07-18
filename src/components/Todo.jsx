import { useState, useEffect } from 'react'
import './Todo.css'
import deleteIcon from '../assets/delete.svg'

function Login() {
  return (
    <div className='todo'>
        <h1 className='todo-heading'>Daily Tasks</h1>
        <button className='todo-completed'>✅ Completed</button>
        <br />
        <br />
        <h2 className='todo-heading'>To do Tasks</h2>

        <div class="todo-list">
          <div class="todo-item">
            <input type="radio" id="todo-1" name="todos" checked />
            <label for="todo-1">Todo item 1</label>
            <span class="delete-icon">
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
          <div class="todo-item">
            <input type="radio" id="todo-2" name="todos" />
            <label for="todo-2">Todo item 2</label>
            <span class="delete-icon">
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
          <div class="todo-item">
            <input type="radio" id="todo-2" name="todos" />
            <label for="todo-2">Todo item 2</label>
            <span class="delete-icon">
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
          <div class="todo-item">
            <input type="radio" id="todo-2" name="todos" />
            <label for="todo-2">Todo item 2</label>
            <span class="delete-icon">
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
          <div class="todo-item">
            <input type="radio" id="todo-2" name="todos" />
            <label for="todo-2">Todo item 2</label>
            <span class="delete-icon">
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
      </div>
    </div>
  )
}

export default Login;
