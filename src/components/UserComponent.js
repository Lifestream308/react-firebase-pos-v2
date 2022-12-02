import React from 'react'

export default function UserComponent({logout, user}) {
  return (
    <>
      <nav className='userComponent__nav'>
        <h1>Register Cloud</h1>
        <button onClick={logout}>Logout</button>
      </nav>

      <hr />

      <div className='flex spaceBetween'>
        <span className='margin2'>{ user.email }</span>
      </div> 
  </>
  )
}
