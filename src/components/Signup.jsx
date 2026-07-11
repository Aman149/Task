import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { setSession, getApiErrorMessage } from '../lib/auth';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/users/signup', { username, password });
      setSession({ token: data.token, username: data.username });
      navigate('/todo', { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Sign up failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <h2 className='heading'>Task</h2>
      <h4 className='title'>Sign Up</h4>
      <form className='form' onSubmit={handleSubmit}>
        <span className='message'>Create an account</span>
        <input
          className='input'
          type='text'
          placeholder='Username'
          value={username}
          autoComplete='username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className='input'
          type='password'
          placeholder='Password (min 6 characters)'
          value={password}
          autoComplete='new-password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <span className='form-error'>{error}</span>}
        <button className='button' type='submit' disabled={loading}>
          {loading ? 'Creating…' : 'Sign Up'}
        </button>
        <span className='redir-user'>
          Already have an account? <Link to='/login'>Log in</Link>
        </span>
      </form>
    </div>
  );
}

export default Signup;

