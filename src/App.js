import './App.css';
import { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { async } from '@firebase/util';

function App() {

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }





  return (
    <div className="App">
      <header className="App-header">
        {true && <>
        <h1>Sign In Below</h1>
        <label>Username: </label>
        <input type='text' placeholder="Username"></input>
        <label>Password: </label>
        <input type='text' placeholder="Password"></input>

        <div className='flex'>
          <button>Login</button>
          <button onClick={logout}>Logout</button>
        </div>

        <button onClick={() => alert("Guest Signed In Now")}>Guest Sign In</button>
</>}

        <p>Interesting</p>
      </header>
    </div>
  );
}

export default App;
