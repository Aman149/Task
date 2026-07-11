import { Link } from 'react-router-dom';

function Forgot() {
  return (
    <div className='login'>
      <h2 className='heading'>Task</h2>
      <h4 className='title'>Forgot Password</h4>
      <div className='form'>
        <span className='message'>
          Password reset isn’t implemented yet. Please create a new account.
        </span>
        <span className='redir-user'>
          <Link to='/login'>Back to login</Link>
          <br />
          <Link to='/signup'>Create a new user</Link>
        </span>
      </div>
    </div>
  );
}

export default Forgot;

