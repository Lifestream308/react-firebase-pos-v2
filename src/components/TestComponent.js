import React from 'react'
import { Link } from 'react-router-dom'

export default function TestComponent() {
  return (
    <div>
        <p>TestComponent</p>

        <nav className='Component__sideNav'>
            <ul>
                <li><Link className='' to='/'>Home</Link></li>
                <li><Link className='' to='/update'>Update</Link></li>
                <li><Link className='' to='/history'>History</Link></li>
                <li><Link className='' to='/about'>About</Link></li>
                <li onClick={ () => alert('Logged Out test')}><Link className='' to='/'>Logout</Link></li>
            </ul>
        </nav>

    </div>
  )
}
