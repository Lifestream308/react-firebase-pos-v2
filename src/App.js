import './App.css';
import { useState, useEffect, useRef } from 'react';
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import { async } from '@firebase/util';
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


  // Firebase CRUD - Create, Update, Delete, Read
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)

  const newItemName = useRef()
  const newItemPrice = useRef()
  
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")
  
  const createUser = async () => {
    await addDoc(usersCollectionRef, {menuItemName: newItemName.current.value, Price: Number(newItemPrice.current.value), companyEmail: user.email})
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
      <header className="App-header">

        { user &&  
        <div className='flex spaceBetween wide'>
          <span className='margin2'>{ user.email }</span>
          <button onClick={logout}>Logout</button>
        </div> 
        }

        {!user && <LoginComponent loginEmail={loginEmail} loginPassword={loginPassword} login={login} logout={logout} /> }

        <hr/>

        <h2 className='underline'>Menu</h2>

        <div className='flex wide spaceAround'>
          <div className='flex wrap'>
          {user && users.filter(x => x.companyEmail === user.email).map(item => { 
            return <ItemComponent key={item.menuItemName} item={item} findTotal={findTotal} />
          })}
          </div>
          <div className='lgAside'>
          <p className='margin2'>Total: $ { total }</p>
          </div>
        </div>

        <h2 className='underline'>Add Items To Menu</h2>
        <div>
          <label>Name</label>
          <input type='text' ref={newItemName} />
        </div>
        <div>
          <label>Price</label>
          <input type='number' ref={newItemPrice} />
        </div>
        <button onClick={createUser}>Add Item</button>
      </header>
    </div>
  );
}

export default App;
