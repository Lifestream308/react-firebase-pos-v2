import './App.css';
import { useState, useEffect, useRef } from 'react';
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import { async } from '@firebase/util';
import LoginComponent from './components/LoginComponent';
import ItemComponent from './components/ItemComponent';
import UserComponent from './components/UserComponent';

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
      <div className="App-header">

        { !user && <LoginComponent emailRef={emailRef} passwordRef={passwordRef} login={login} register={register} guestLogin={guestLogin} /> }
        { user && <UserComponent logout={logout} user={user} /> }

        <hr/>

        <h2 className='underline'>Your Register Cloud</h2>

        <div className='flex wide spaceAround'>
          <div className='flex wrap'>
          {user && registerItems.filter(registerItem => registerItem.companyEmail === user.email).map(item => { 
            return <ItemComponent key={item.menuItemName} item={item} findTotal={findTotal} />
          })}
          </div>
          <div className='lgAside'>
          <p className='margin2'>Total: $ { total }</p>
          </div>
        </div>

        <h2 className='underline'>Add Items To Register</h2>
        <div>
          <label>Name</label>
          <input type='text' ref={itemNameRef} />
        </div>
        <div>
          <label>Price</label>
          <input type='number' ref={itemPriceRef} />
        </div>
        <button onClick={createUser}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
