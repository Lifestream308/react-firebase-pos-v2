import React from 'react'

export default function LoginComponent({ emailRef, passwordRef, login, register, guestLogin }) {
  return (<>
    <div class="flex spaceCenter loginComponent">
        <div class="loginComponent__header">
            <h1>Register Cloud</h1>
            <p>Point-Of-Sale service at your fingertips. Use the Guest Login to sample the experience.</p>
            <button className='loginComponent__button3' onClick={ guestLogin }>Guest Login</button>
        </div>
        <div class="loginComponent__inputCard">
            <input type="text" name="" id="" placeholder="Email" ref={ emailRef } />
            <br />
            <input type="text" name="" id="" placeholder="Password" ref={ passwordRef } />
            <button className='loginComponent__button1' onClick={ login }>Login</button>
            <hr />
            <button className='loginComponent__button2' onClick={ register }>Create New Account</button>
        </div>
    </div>
    </>
  )
}
