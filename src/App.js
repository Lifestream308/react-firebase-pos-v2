import './App.css';
import { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { async } from '@firebase/util';
import LoginComponent from './components/LoginComponent';
import ItemComponent from './components/ItemComponent';

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
  
  const [users, setUsers] = useState([])
  // let menuItems = users.filter(x => x.companyEmail == user.email)
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
    }
    getUsers()
  }, [])




  return (
    <div className="App">
      <header className="App-header">
        <LoginComponent setLoginEmail={setLoginEmail} setLoginPassword={setLoginPassword} login={login} logout={logout} />

        {user ? user.email : "User not logged in."}
        <button onClick={() => console.log(users)}>Console Items</button>

        {user && users.filter(x => x.companyEmail == user.email).map(item => { 
          return <ItemComponent key={item.menuItemName} item={item} />
        })}
      </header>
    </div>
  );
}

export default App;
