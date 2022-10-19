import './App.css';
import { useState, useEffect, useRef } from 'react';
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
  const [user, setUser] = useState({})

  const loginEmail = useRef()
  const loginPassword = useRef()

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
        loginEmail.current.value,
        loginPassword.current.value
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
      let firebaseArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setUsers(firebaseArray);
    }
    getUsers()
  }, [])



  const [total, setTotal] = useState(0)
  const prices = () => window.document.querySelectorAll('.price')
  const amounts = () => window.document.querySelectorAll('.amount')

  const findTotal = () => {
    let totalCost = 0
    for (let i = 0; i < prices().length; i++) {
      totalCost += Number(prices()[i].innerHTML) * amounts()[i].value
    }
    setTotal(totalCost)
    return totalCost
  }

  return (
    <div className="App">
      <header className="App-header">
        <LoginComponent loginEmail={loginEmail} loginPassword={loginPassword} login={login} logout={logout} />

        {user ? user.email : "User not logged in."}

        <button onClick={() => console.log(findTotal())}>Console Total</button>

        <button onClick={() => console.log(amounts()[0].value)}>Amounts</button>

        <div className='flex'>
          <div>
          {user && users.filter(x => x.companyEmail == user.email).map(item => { 
            return <ItemComponent key={item.menuItemName} item={item} />
          })}
          </div>
          <div className='lgAside'>
          <p>Total: { total }</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
