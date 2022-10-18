import './App.css';
import { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { async } from '@firebase/util';

function App() {

  // Firebase Create User, Login User, Logout User
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
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }
  // End of Firebase Create/Login/Logout User


  // Firebase Database - Create, Update, Delete, Read
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)

  const [users, setUsers] = useState(['empty'])
  const usersCollectionRef = collection(db, "users")
  
  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, age: newAge})
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = { age: age + 1 }
    await updateDoc(userDoc, newFields)
  }

  const deleteUser = async(id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(users)
    }
    getUsers()
  }, [])




  return (
    <div className="App">
      <header className="App-header">
        {true && <>
        <h1>Sign In Below</h1>
        <label>Username: </label>
        <input type='text' placeholder="Username" onChange={(e) => setLoginEmail(e.target.value)}></input>
        <label>Password: </label>
        <input type='text' placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}></input>

        <div className='flex'>
          <button onClick={login}>Login</button>
          <button onClick={logout}>Logout</button>
        </div>
        <button onClick={() => console.log(users.filter(x => x.companyEmail == user.email))}>Console Users</button>
        </>}

        {user ? user.email : "User not logged in."}

      </header>
    </div>
  );
}

export default App;
