import React from 'react'
import { Link } from 'react-router-dom'
import UpdateItemComponent from './UpdateItemComponent'

export default function UpdateComponent({ user, registerItems, updateUser, deleteUser, itemPriceRef }) {
  return (
    <div className='updateComponent'>
        <Link to='/'>Back to Home when Done</Link>
        <p>UpdateComponent</p>
        <div className='updateComponent__itemMap'>
            {user && registerItems.filter(registerItem => registerItem.companyEmail === user.email).map(item => { 
                return <UpdateItemComponent key={item.menuItemName} item={item} updateUser={updateUser} deleteUser={deleteUser} itemPriceRef={itemPriceRef} />
            })}
        </div>
    </div>
  )
}
