import React from 'react'

export default function UserComponent({logout, user}) {
  return (
    <>
      <nav className='userComponent__nav'>
        <h1><a href='#'>Register Cloud</a></h1>
        <span>
          <button>Update</button>
          <button onClick={logout}>Logout</button>
        </span>
      </nav>

      <hr />

      <div className='flex spaceBetween'>
        <span className='margin2'>Welcome { user.email }</span>
      </div> 
  </>
  )
}
