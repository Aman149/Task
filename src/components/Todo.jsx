import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import deleteIcon from '../assets/delete.svg';
import api from '../lib/api';
import { clearSession, getUsername, getApiErrorMessage } from '../lib/auth';
import './Todo.css';

function Todo() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const username = getUsername();

  const loadTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/todos');
      setTodos(data.todos || []);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load tasks'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleToggle = async (todo) => {
    try {
      const { data } = await api.put(`/todos/${todo._id}`, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t._id === todo._id ? data.todo : t)));
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to update task'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to delete task'));
    }
  };

  const handleLogout = () => {
    clearSession();
    navigate('/login', { replace: true });
  };

  const active = todos.filter((t) => !t.completed);
  const completedCount = todos.length - active.length;

  return (
    <div className='todo'>
      <div className='todo-topbar'>
        <h1 className='todo-heading'>Daily Tasks</h1>
        <div className='todo-user'>
          {username && <span className='todo-username'>{username}</span>}
          <button className='link-button' onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <Link to='/todo-completed' className='todo-completed-link'>
        <button className='todo-completed' type='button'>
          ✅ Completed ({completedCount})
        </button>
      </Link>

      <h2 className='todo-list-heading'>To do Tasks</h2>

      {error && <div className='form-error'>{error}</div>}

      <div className='todo-list'>
        {loading ? (
          <p className='empty-state'>Loading…</p>
        ) : active.length === 0 ? (
          <p className='empty-state'>No tasks yet. Tap “+” to add one.</p>
        ) : (
          active.map((todo) => (
            <div key={todo._id} className='todo-item' onClick={() => handleToggle(todo)}>
              <div className='todo-content'>
                <label>{todo.title}</label>
                <span className='todo-actions' onClick={(e) => e.stopPropagation()}>
                  <Link to={`/edit-todo/${todo._id}`} className='edit-link'>Edit</Link>
                  <span
                    className='delete-icon'
                    role='button'
                    aria-label='Delete task'
                    onClick={() => handleDelete(todo._id)}
                  >
                    <img src={deleteIcon} alt='Delete' />
                  </span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        className='add-todo-button'
        type='button'
        aria-label='Add task'
        onClick={() => navigate('/add-todo')}
      >
        +
      </button>
    </div>
  );
}

export default Todo;

