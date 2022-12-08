import React from 'react'
import { Link } from 'react-router-dom'

export default function UserComponent({logout, user}) {
  return (
    <>
      <nav className='userComponent__nav'>
        <h1><Link to='/'>Register Cloud</Link></h1>
        <span>
          <button><Link className='userComponent__link' to='/update'>Update</Link></button>
          <button onClick={logout}><Link className='userComponent__link' to='/'>Logout</Link></button>
        </span>
      </nav>

      <hr />

      <div className='flex spaceBetween'>
        <span className='margin2'>Welcome { user.email }</span>
      </div> 
  </>
  )
}
