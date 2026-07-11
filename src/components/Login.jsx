import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { setSession, getApiErrorMessage } from '../lib/auth';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/users/login', { username, password });
      setSession({ token: data.token, username: data.username });
      navigate('/todo', { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <h2 className='heading'>Task</h2>
      <h4 className='title'>Login</h4>
      <form className='form' onSubmit={handleSubmit}>
        <span className='message'>Enter your login credentials</span>
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
          placeholder='Password'
          value={password}
          autoComplete='current-password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <span className='form-error'>{error}</span>}
        <button className='button' type='submit' disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
        <span className='redir-user'>
          <Link to='/signup'>Create a new user?</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;

