import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../lib/api';
import { getApiErrorMessage } from '../lib/auth';
import './AddTodo.css';
import './Todo.css';

function UpdateTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get(`/todos/${id}`);
        if (cancelled) return;
        setTitle(data.todo.title || '');
        setDescription(data.todo.description || '');
        setCompleted(Boolean(data.todo.completed));
      } catch (err) {
        if (!cancelled) setError(getApiErrorMessage(err, 'Failed to load task'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (title.trim() === '') {
      setError('Please enter a title.');
      return;
    }
    setSaving(true);
    try {
      await api.put(`/todos/${id}`, { title, description, completed });
      navigate('/todo');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to update task'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='todo'>
      <div className='todo-topbar'>
        <h1 className='todo-heading'>Update Task</h1>
        <Link to='/todo' className='link-button'>← Back</Link>
      </div>
      <br />
      {loading ? (
        <p className='empty-state'>Loading…</p>
      ) : (
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
          <label className='completed-toggle'>
            <input
              type='checkbox'
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Mark as completed
          </label>
          {error && <div className='form-error'>{error}</div>}
          <br />
          <button className='add-task-button' type='submit' disabled={saving}>
            {saving ? 'Saving…' : '📝 Update Task'}
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateTodo;

