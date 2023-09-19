import { useState, useEffect } from 'react'
import deleteIcon from '../assets/delete.svg'
import './Todo.css'

function TodoCompleted() {

  const handleTodoItemClick = () => {
    // Add your logic for opening a new page here
    console.log('Opening a new page...');
  };

  return (
    <div className='todo-home'>
        <p className='nav'>
            <i className='arrow-right'></i>
        </p>
        <h1 className='todo-heading'>Completed</h1>
        <div className="todo-list">
        <div className="todo-item" onClick={handleTodoItemClick}>
          <div className="todo-content">
            <label>Todo item 1</label>
            <span className="delete-icon" onClick={(e) => e.stopPropagation()}>
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
        </div>
        <div className="todo-item" onClick={handleTodoItemClick}>
          <div className="todo-content">
            <label>Todo item second</label>
            <span className="delete-icon" onClick={(e) => e.stopPropagation()}>
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
        </div>
        <div className="todo-item" onClick={handleTodoItemClick}>
          <div className="todo-content">
            <label>This is the third item of todo list</label>
            <span className="delete-icon" onClick={(e) => e.stopPropagation()}>
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoCompleted;
