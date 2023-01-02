import './App.css';
import { useState, useEffect, useRef } from 'react';
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import LoginComponent from './components/LoginComponent';
import UserComponent from './components/UserComponent';
import { Route, Routes, useLocation } from 'react-router-dom'
import AddItemsComponent from './components/AddItemsComponent';
import RegisterComponent from './components/RegisterComponent';
import UpdateComponent from './components/UpdateComponent';

function App() {

  // Firebase Create/Register User, Login User, Guest Login, Logout User
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

  const guestLogin = async () => {
    const guestEmail = "guest@guest.com"
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
  // End of Firebase Register/Login/GuestLogin/Logout


  // Firebase CRUD - Create, Update, Delete, Read Register Items
  const itemNameRef = useRef()
  const itemPriceRef = useRef()
  
  const [firebaseItemsDB, setFirebaseItemsDB] = useState([])
  const usersCollectionRef = collection(db, "users")

  const createItem = async () => {
    const filteredItems = firebaseItemsDB.filter(registerItem => registerItem.companyEmail === user.email)
    const filteredNames = Array.from(filteredItems, a => a.menuItemName)

    if (itemNameRef.current.value.trim() === '') {
      alert("Enter a name")
      return
    }
    if (itemNameRef.current.value.trim().length > 25 || itemNameRef.current.value.trim().length < 2) {
      alert("Name must be between 2-25 Characters")
      return
    }
    if (filteredNames.includes(itemNameRef.current.value.trim()))  {
      alert("Name already used")
      return
    }
    if (itemPriceRef.current.valueAsNumber <= 0 || itemPriceRef.current.valueAsNumber >= 1000) {
      alert("Price must be between 0-1000")
      return
    }
    if (isNaN(itemPriceRef.current.valueAsNumber)) {
      alert("Price must be between 0-1000")
      return
    }
    await addDoc(usersCollectionRef, {menuItemName: itemNameRef.current.value.trim(), Price: itemPriceRef.current.valueAsNumber, companyEmail: user.email})
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      let firebaseArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFirebaseItemsDB(firebaseArray);
    }
    getUsers()
  }

  const updateItem = async (id, price) => {
    if (price <= 0 || price >= 1000) {
      alert("Price must be between 0-1000")
      return
    }
    if (isNaN(price)) {
      alert("Price must be between 0-1000")
      return
    }
    const userDoc = doc(db, "users", id)
    const newFields = { Price: price }
    await updateDoc(userDoc, newFields)
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      let firebaseArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFirebaseItemsDB(firebaseArray);
    }
    getUsers()
    alert("Price Updated")
  }

  const deleteUser = async(id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      let firebaseArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFirebaseItemsDB(firebaseArray);
    }
    getUsers()
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      let firebaseArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFirebaseItemsDB(firebaseArray);
    }
    getUsers()
  }, [])

  const location = useLocation()
  useEffect(() => {
    setTotal(0)
    setTotalItems(0)
  }, [user, location.pathname])
  // End of Firebase CRUD - Create, Update, Delete, Read Register Items

  // Cart Functions and Logic
  const [total, setTotal] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [cartList, setCartList] = useState({})
  
  const prices = () => window.document.querySelectorAll('.price')
  const amounts = () => window.document.querySelectorAll('.amount')
  
  const handleCartTotals = (itemName, e) => {
      findTotal()
      findTotalCartItems()
      manageCartObject(itemName, e)
    }
    
  // Calculate Total Price in Cart. Adds up the price of all items in the Register based on amount * price
  const findTotal = () => {
    let totalCost = 0
    for (let i = 0; i < prices().length; i++) {
      totalCost += Number(prices()[i].innerHTML) * amounts()[i].value
    }
    setTotal(totalCost)
  }

  const manageCartObject = (itemName, e) => {
    setCartList(prev => ({...prev, [itemName]: e.target.valueAsNumber}))
  }

  const resetTotal = () => {
    const amounts = () => window.document.querySelectorAll('.amount')
    amounts().forEach((amount) => amount.valueAsNumber = 0)
    setTotal(0)
    setTotalItems(0)
    setCartList({})
  }

  const findTotalCartItems = () => {
    let amountItems = 0
    for (let i = 0; i < amounts().length; i++) {
      amountItems += amounts()[i].valueAsNumber
    }
    setTotalItems(amountItems)
  }
  // End of Cart Functions and Logic

  return (
    <div className="App">
      <div className="App">

        { !user && <LoginComponent emailRef={emailRef} passwordRef={passwordRef} login={login} register={register} guestLogin={guestLogin} /> }

        { user && <UserComponent logout={logout} user={user} /> }

        <Routes>
          <Route path='/' element={ user && 
            <>
              <RegisterComponent user={user} firebaseItemsDB={firebaseItemsDB} handleCartTotals={handleCartTotals} total={total} resetTotal={resetTotal} totalItems={totalItems} />
              <AddItemsComponent itemNameRef={itemNameRef} itemPriceRef={itemPriceRef} createItem={createItem} />
            </> }>              
          </Route>
          <Route path='/update' element={ user && 
            <UpdateComponent user={user} firebaseItemsDB={firebaseItemsDB} updateItem={updateItem} deleteUser={deleteUser} itemPriceRef={itemPriceRef} /> }>
          </Route>
        </Routes>
      </div>


    </div>
  );
}

export default App;
