import React from 'react'

function Signup() {
  return (
    <>

    <form>
        <label>Email</label>
        <input className='border-solid border-2 border-black'/>
        <label>Password</label>
        <input className='border-solid border-2 border-black'/>
        <button type='submit'>Sign Up</button>
    </form>

    
    </>
  )
}

export default Signup