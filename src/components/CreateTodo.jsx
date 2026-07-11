import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { getApiErrorMessage } from '../lib/auth';
import './AddTodo.css';
import './Todo.css';

function CreateTodo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (title.trim() === '') {
      setError('Please enter a title.');
      return;
    }
    setSaving(true);
    try {
      await api.post('/todos', { title, description });
      navigate('/todo');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to create task'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='todo'>
      <div className='todo-topbar'>
        <h1 className='todo-heading'>Add new Task</h1>
        <Link to='/todo' className='link-button'>← Back</Link>
      </div>
      <br />
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
        {error && <div className='form-error'>{error}</div>}
        <br />
        <button className='add-task-button' type='submit' disabled={saving}>
          {saving ? 'Saving…' : '📝 Create Task'}
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;

