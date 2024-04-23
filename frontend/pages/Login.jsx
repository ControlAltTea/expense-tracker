import { Link } from 'react-router-dom'
import React from 'react'

function Login() {
  return (
    <>
<div className='flex flex-col'>



<div className='flex justify-center px-6 py-12'>
  <h2>Sign in to your account</h2>
</div>

<div className='flex justify-center'>
    <form>
      <div className='flex justify-center flex-col'>
        <label>Email</label>
        <input className='border-solid border-2 border-black' />
        <label>Password</label>
        <input className='border-solid border-2 border-black'/>

          <div className='flex justify-center px-4 py-6'>
          <button type='submit'>Login</button>
          </div>

        </div>
    </form>
</div>

    <div className='flex items-center flex-col py-4'>
      <div>Don't Have an Account?</div>
      <Link to='/signup'>Sign Up</Link>
    </div>

</div>
    </>
  )
}

export default Login