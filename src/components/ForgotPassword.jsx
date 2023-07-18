import { useState, useEffect } from 'react'

function Forgot() {
  return (
    <div className='login'>
        <h2 className='heading'>Task</h2>
        <h4 className='title'>Forgot Password</h4>
        <form className='form'>
            <span className='message'>Enter your email</span>
            <input className='input' type="text" placeholder='Enter your email'/>
            <span className='forgot-password'>Forgot your password?</span>
            <button className='button'>Reset</button>
        </form>
    </div>
  )
}

export default Forgot;
