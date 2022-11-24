import React from 'react'

export default function LoginComponent({ emailRef, passwordRef, login, register }) {
  return (<>
    <h1 className='margin-top'>Sign In Below</h1>
        <label>Username: </label>
        <input type='text' placeholder="Username" ref={emailRef}></input>
        <label>Password: </label>
        <input type='text' placeholder="Password" ref={passwordRef}></input>

        <div className='flex spaceCenter'>
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </div>
    </>
  )
}
