import { Link } from 'react-router-dom'
import React from 'react'

function Login() {
  return (
    <>

    <form>
        <label>Email</label>
        <input className='border-solid border-2 border-black' />
        <label>Password</label>
        <input className='border-solid border-2 border-black'/>
        <button type='submit'>Login</button>
    </form>

    <div>Don't Have an Account?</div>
    <Link to='/signup'>Sign Up</Link>
    </>
  )
}

export default Login