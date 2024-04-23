import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <>

<div className='flex flex-col'>



<div className='flex justify-center px-6 py-12'>
  <h2>Sign up for an account</h2>
</div>

<div className='flex justify-center'>
    <form>
      <div className='flex justify-center flex-col'>
        <label>Email</label>
        <input className='border-solid border-2 border-black' />
        <label>Password</label>
        <input className='border-solid border-2 border-black'/>

          <div className='flex justify-center px-4 py-6'>
          <button type='submit'>Sign Up</button>
          </div>

        </div>
    </form>
</div>

    <div className='flex items-center flex-col py-4'>
      <div>Already Have an Account?</div>
      <Link to='/signup'>Sign In</Link>
    </div>

</div>

    
    </>
  )
}

export default Signup