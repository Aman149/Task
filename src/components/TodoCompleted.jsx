import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import deleteIcon from '../assets/delete.svg';
import api from '../lib/api';
import { getApiErrorMessage } from '../lib/auth';
import './Todo.css';

function TodoCompleted() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/todos');
      setTodos((data.todos || []).filter((t) => t.completed));
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load completed tasks'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUncomplete = async (todo) => {
    try {
      await api.put(`/todos/${todo._id}`, { completed: false });
      setTodos((prev) => prev.filter((t) => t._id !== todo._id));
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

  return (
    <div className='todo'>
      <div className='todo-topbar'>
        <h1 className='todo-heading'>Completed</h1>
        <Link to='/todo' className='link-button'>← Back</Link>
      </div>

      {error && <div className='form-error'>{error}</div>}

      <div className='todo-list'>
        {loading ? (
          <p className='empty-state'>Loading…</p>
        ) : todos.length === 0 ? (
          <p className='empty-state'>Nothing completed yet.</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className='todo-item todo-item-done'
              role='button'
              tabIndex={0}
              onClick={() => navigate(`/edit-todo/${todo._id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(`/edit-todo/${todo._id}`);
              }}
            >
              <div className='todo-content'>
                <input
                  type='checkbox'
                  className='todo-check'
                  checked
                  aria-label={`Mark "${todo.title}" as not completed`}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => handleUncomplete(todo)}
                />
                <label onClick={(e) => e.preventDefault()}>{todo.title}</label>
                <span
                  className='delete-icon'
                  role='button'
                  aria-label='Delete task'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(todo._id);
                  }}
                >
                  <img src={deleteIcon} alt='' />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoCompleted;

