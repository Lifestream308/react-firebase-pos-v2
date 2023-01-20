import React from 'react'
import { Link } from 'react-router-dom'
import UpdateItemComponent from './UpdateItemComponent'

export default function UpdateComponent({ user, firebaseItemsDB, updateItem, deleteUser, itemPriceRef }) {
  return (
    <div className='updateComponent'>
        <Link to='/'>Back to Home when Done</Link>
        <h2>Update</h2>
        <div className='updateComponent__itemMap'>
            {user && firebaseItemsDB.filter(registerItem => registerItem.companyEmail === user.email).map(item => { 
                return <UpdateItemComponent key={item.menuItemName} item={item} updateItem={updateItem} deleteUser={deleteUser} itemPriceRef={itemPriceRef} />
            })}
        </div>
    </div>
  )
}
