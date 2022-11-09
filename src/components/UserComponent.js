import React from 'react'

export default function UserComponent({logout, user}) {
  return (
    <div className='flex spaceBetween wide'>
    <span className='margin2'>{ user.email }</span>
    <button onClick={logout}>Logout</button>
  </div> 
  )
}
