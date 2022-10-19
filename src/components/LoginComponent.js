import React from 'react'

export default function LoginComponent({ loginEmail, loginPassword, login, logout }) {
  return (<>
    <h1>Sign In Below</h1>
        <label>Username: </label>
        <input type='text' placeholder="Username" ref={loginEmail}></input>
        <label>Password: </label>
        <input type='text' placeholder="Password" ref={loginPassword}></input>

        <div className='flex'>
          <button onClick={login}>Login</button>
          <button onClick={logout}>Logout</button>
        </div>
    </>
  )
}
