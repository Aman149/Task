import { useState, useEffect } from 'react'

function Login() {
  return (
    <div className='login'>
        <h2 className='heading'>Task</h2>
        <h4 className='title'>Login</h4>
        <form className='form'>
            <span className='message'>Enter your login credentials</span>
            <input className='input' type="text" placeholder='Enter your email'/>
            <input className='input' type="text" placeholder='Enter your password'/>
            <span className='forgot-password'>Forgot your password?</span>
            <button className='button'>Log in</button>
            <span className='redir-user'>Create a new user?</span>
        </form>
    </div>
  )
}

export default Login;
