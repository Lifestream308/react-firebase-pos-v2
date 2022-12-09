import React from 'react'
import { Link } from 'react-router-dom'

export default function UserComponent({logout, user}) {
  return (
    <>
      <nav className='userComponent__nav'>
        <h1><Link className='userComponent__link2' to='/'>Register Cloud</Link></h1>
        <span>
          <Link className='userComponent__link' to='/update'>Update</Link>
          <Link className='userComponent__link' to='/' onClick={logout}>Logout</Link>
        </span>
      </nav>

      <hr />

      <div className='flex spaceBetween'>
        <span className='margin2'>Welcome { user.email }</span>
      </div> 
  </>
  )
}
