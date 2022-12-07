import './App.css';
import { useState, useEffect, useRef } from 'react';
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import LoginComponent from './components/LoginComponent';
import UserComponent from './components/UserComponent';
import { Route, Routes } from 'react-router-dom'
import AddItemsComponent from './components/AddItemsComponent';
import RegisterComponent from './components/RegisterComponent';
import Home from './components/Home'

function App() {

  // Firebase Create User, Login User, Logout User
  const [user, setUser] = useState({})

  const emailRef = useRef()
  const passwordRef = useRef()

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
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
        emailRef.current.value,
        passwordRef.current.value
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  // Guest Login Function
  const guestLogin = async () => {
    const guestEmail = "green@green.com"
    const guestPassword = "password"
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        guestEmail,
        guestPassword
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }
  // End of Firebase Create/Login/Logout User


  // Firebase CRUD - Create, Update, Delete, Read
  const itemNameRef = useRef()
  const itemPriceRef = useRef()
  
  const [registerItems, setRegisterItems] = useState([])
  const usersCollectionRef = collection(db, "users")
  
  const createUser = async () => {
    await addDoc(usersCollectionRef, {menuItemName: itemNameRef.current.value, Price: Number(itemPriceRef.current.value), companyEmail: user.email})
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
      setRegisterItems(firebaseArray);
    }
    getUsers()
  }, [])
  // End of Firebase CRUD - Create, Update, Delete, Read


  // Calculate Total. Adds up the price of all items in the Menu based on amount * price
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
      <div className="App">

        { !user && <LoginComponent emailRef={emailRef} passwordRef={passwordRef} login={login} register={register} guestLogin={guestLogin} /> }

        { user && <UserComponent logout={logout} user={user} /> }

        <Routes>
          <Route path='/' element={ user && 
            <>
              <RegisterComponent user={user} registerItems={registerItems} findTotal={findTotal} total={total} />
              <AddItemsComponent itemNameRef={itemNameRef} itemPriceRef={itemPriceRef} createUser={createUser} />
            </> }>              
          </Route>
          <Route path='/update' element={ user && <Home /> }>              
          </Route>
        </Routes>
      </div>


    </div>
  );
}

export default App;
