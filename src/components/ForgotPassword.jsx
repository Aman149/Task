import { useState, useEffect } from 'react'

function Forgot() {
  return (
    <div className='login'>
        <h2 className='heading'>Task</h2>
        <h4 className='title'>Forgot Password</h4>
        <form className='form'>
            <span className='message'>Enter your email</span>
            <input className='input' type="text" placeholder='Enter your email'/>
            <button className='button'>Reset</button>
            <span className='redir-user'>
              <p>Already have an accout?</p>
              <p>Create a new user?</p>
            </span>
        </form>
    </div>
  )
}

export default Forgot;
