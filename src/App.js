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
import AboutComponent from './components/AboutComponent';
import HistoryComponent from './components/HistoryComponent';
import { async } from '@firebase/util';

function App() {

  // Firebase Create/Register User, Login User, Guest Login, Logout User
  const [user, setUser] = useState({})

  const credentials = {
    emailRef : useRef(),
    passwordRef : useRef()
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        credentials.emailRef.current.value,
        credentials.passwordRef.current.value
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
        credentials.emailRef.current.value,
        credentials.passwordRef.current.value
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


  // Firebase Items CRUD - Create, Update, Delete, Read Register Items
  const itemNameRef = useRef()
  const itemPriceRef = useRef()
  
  const [firebaseItemsDB, setFirebaseItemsDB] = useState([])
  const usersCollectionRef = collection(db, "users")
  // const historyCollectionRef = collection(db, "saleHistory")

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    let firebaseArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setFirebaseItemsDB(firebaseArray);
  }

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
    getUsers()
    alert("Price Updated")
  }

  const deleteUser = async(id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])
  // End of Firebase Items CRUD - Create, Update, Delete, Read Register Items

  // Firebase History CRUD - Create, Delete, Read Sales History
  const [firebaseHistoryDB, setFirebaseHistoryDB] = useState([])
  const historyCollectionRef = collection(db, "saleHistory")
  const [sortedHistory, setSortedHistory] = useState([])

  // let filteredHistory1 = firebaseHistoryDB.filter(saleEntry => saleEntry.companyEmail === user.email)
  // let sortedHistory11 = filteredHistory1.sort((a, b) => a.postID - b.postID)

  useEffect(() => {
    if (user && firebaseHistoryDB) {
      // let cartObject = []
      let filterArray = firebaseHistoryDB.filter(saleEntry => saleEntry.companyEmail === user.email)
      let sortedArray = filterArray.sort((a, b) => a.postID - b.postID)

      // filterArray.forEach(item => {
      //   cartObject.push({ name: item.menuItemName, amount : 0, price : item.Price, id: item.id })
      // })
      setSortedHistory(sortedArray)
  }
  }, [firebaseHistoryDB, user])

  const getHistory = async () => {
    const data = await getDocs(historyCollectionRef);
    let firebaseArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setFirebaseHistoryDB(firebaseArray);
  }

  const createSaleHistory = async () => {
    let filteredHistory = firebaseHistoryDB.filter(saleEntry => saleEntry.companyEmail === user.email)
    let sortedHistory = filteredHistory.sort((a, b) => a.postID - b.postID)

    await addDoc(historyCollectionRef, {
      companyEmail: user.email, 
      postID: sortedHistory.length > 0 ? sortedHistory[sortedHistory.length-1].postID + 1 : 1,
      sale: JSON.stringify(checkoutCartList),
      saleTotal: total,
      totalItems: totalItems, 
      cashReceived: cash
    })
    if (sortedHistory.length >= 10) {
      deleteHistory(sortedHistory[0].id)
    }
    getHistory()
    resetCart()
    alert("Sale Completed and Added to History")
  }

  const deleteHistory = async(id) => {
    const userDoc = doc(db, "saleHistory", id)
    await deleteDoc(userDoc)
  }

  useEffect(() => {
    getHistory()
  }, [])
  // End of Firebase History CRUD - Create, Update, Delete, Read Sale History


  // Cart Functions and Logic

  const [cartList, setCartList] = useState([])
  const [total, setTotal] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [cash, setCash] = useState(0)

  let checkoutCartList = cartList.filter(item=> item.amount > 0)
  
  const handleCartTotals = (item, e) => {
    let cartObject = [...cartList]
    let findItem = cartObject.find((index) => index.name === item.name)
    findItem.amount = e.target.valueAsNumber
    setCartList(cartObject)
    handleTotalCost()
    handleItemsInCart()
    }

    // handle an array later. resets cart when url changes. If user changes, need a new filtered Items list
  const location = useLocation()  
  useEffect(() => {
    resetCart()
}, [user, location.pathname])

  useEffect(() => {
    if (user) {
      let filterArray = firebaseItemsDB.filter(registerItem => registerItem.companyEmail === user.email)
      let cartObject = []
      filterArray.forEach(item => {
        cartObject.push({ name: item.menuItemName, amount : 0, price : item.Price, id: item.id })
      })
      setCartList(cartObject)
      handleTotalCost()
  }
  }, [firebaseItemsDB, user])

  const handleTotalCost = () => {
    let totalCost = 0 
    cartList.forEach((index) => {
      if (index.amount > 0) {
        totalCost += index.amount * index.price
      }
    })
    setTotal(totalCost.toFixed(2))
  }

  const handleItemsInCart = () => {
    let totalItemsInCart = 0 
    cartList.forEach((index) => {
      if (index.amount > 0) {
        totalItemsInCart += index.amount
      }
    })
    setTotalItems(totalItemsInCart)
  }

  const resetCart = () => {
    let cartObject = [...cartList]
    cartObject.forEach((index) => {
      index.amount = 0
    })
    setCartList(cartObject)
    handleTotalCost()
    handleItemsInCart()
    setCash(0)
  }

  const itemIncrease = (item) => {
    let cartObject = [...cartList]
    let findIndex = cartObject.find(index => index.name === item.name)
    findIndex.amount ++
    setCartList(cartObject)
    handleTotalCost()
    handleItemsInCart()
  }

  const itemDecrease = (item) => {
    let cartObject = [...cartList]
    let findIndex = cartObject.find(index => index.name === item.name)
    if (findIndex.amount <= 0) return
    findIndex.amount --
    setCartList(cartObject)
    handleTotalCost()
    handleItemsInCart()
  }

  const handleCash = (e) => {
    setCash(e.target.value)
  }
  // End of Cart Functions and Logic

  return (
    <div className="App">
      <div className="App">

        { !user && <LoginComponent credentials={credentials} login={login} register={register} guestLogin={guestLogin} /> }

        { user && <UserComponent logout={logout} user={user} /> }

        <Routes>
          <Route path='/' element={ user && 
            <>
              <RegisterComponent user={user} firebaseItemsDB={firebaseItemsDB} handleCartTotals={handleCartTotals} total={total} resetCart={resetCart} totalItems={totalItems} cartList={cartList} itemIncrease={itemIncrease} itemDecrease={itemDecrease} cash={cash} handleCash={handleCash} checkoutCartList={checkoutCartList} createSaleHistory={createSaleHistory} />
              <AddItemsComponent itemNameRef={itemNameRef} itemPriceRef={itemPriceRef} createItem={createItem} />
            </> }>              
          </Route>
          <Route path='/update' element={ user && 
            <UpdateComponent user={user} firebaseItemsDB={firebaseItemsDB} updateItem={updateItem} deleteUser={deleteUser} itemPriceRef={itemPriceRef} /> }>
          </Route>
          <Route path='/about' element={ user && 
            <AboutComponent user={user} firebaseItemsDB={firebaseItemsDB} /> }>
          </Route>
          <Route path='/history' element={ user && 
            <HistoryComponent user={user} firebaseHistoryDB={firebaseHistoryDB} sortedHistory={sortedHistory} /> }>
          </Route>
        </Routes>
      </div>


    </div>
  );
}

export default App;
