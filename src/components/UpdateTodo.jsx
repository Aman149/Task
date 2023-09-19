import React, { useState } from 'react';
import './AddTodo.css'; // Import your CSS file

function EditTodo({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert('Please enter a title.');
      return;
    }

    // Create a new todo object
    const newTodo = {
      id: Date.now(), // You can use a better ID generation method
      title,
      description,
    };

    // Add the new todo to the list
    addTodo(newTodo);

    // Clear the input fields
    setTitle('');
    setDescription('');
  };

  return (
    <div className='todo'>
      <h1 className='todo-heading'>Update Task</h1>
      <br /><br />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='todo-title'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <input
          type='text'
          name='todo-description'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <button className='add-task-button' type='submit'>
          📝 Update Tasks
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
