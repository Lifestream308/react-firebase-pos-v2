import React from 'react'

export default function LoginComponent({ setLoginEmail, setLoginPassword, login, logout }) {
  return (<>
    <div>LoginComponent</div>
    <h1>Sign In Below</h1>
        <label>Username: </label>
        <input type='text' placeholder="Username" onChange={(e) => setLoginEmail(e.target.value)}></input>
        <label>Password: </label>
        <input type='text' placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}></input>

        <div className='flex'>
          <button onClick={login}>Login</button>
          <button onClick={logout}>Logout</button>
        </div>
    </>
  )
}
