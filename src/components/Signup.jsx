import { useState, useEffect } from 'react'

function Login() {
  return (
    <div className='login'>
        <h2 className='heading'>Task</h2>
        <h4 className='title'>Sign up</h4>
        <form className='form'>
            <span className='message'>Create an account</span>
            <input className='input' type="text" placeholder='Enter your email'/>
            <input className='input' type="text" placeholder='Enter your password'/>
            <button className='button'>Sign Up</button>
        </form>
    </div>
  )
}

export default Login;
