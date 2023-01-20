import React from 'react'

export default function LoginComponent({ credentials, login, register, guestLogin }) {
  return (<>
    <div className="flex spaceCenter loginComponent">
        <div className="loginComponent__header">
            <h1>Register Cloud</h1>
            <p>Point-Of-Sale service at your fingertips. Use the Guest Login to sample the experience.</p>
            <button className='loginComponent__button3' onClick={ guestLogin }>Guest Login</button>
        </div>
        <div className="loginComponent__inputCard">
            <input type="text" name="email" id="email" placeholder="Email" ref={ credentials.emailRef } />
            <br />
            <input type="password" name="password" id="password" placeholder="Password" ref={ credentials.passwordRef } />
            <button className='loginComponent__button1' onClick={ login }>Login</button>
            <hr />
            <button className='loginComponent__button2' onClick={ register }>Create New Account</button>
        </div>
    </div>
    </>
  )
}
