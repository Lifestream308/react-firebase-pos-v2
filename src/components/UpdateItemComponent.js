import React from 'react'

export default function UpdateItemComponent({ item, updateUser, deleteUser }) {
  return (
    <div className='updateItemComponent'>
        <div>{item.menuItemName}</div>
        <span>$</span>
        <input type='number' className='amount' defaultValue={item.Price} />
        <button className='updateItemComponent__button1' onClick={(e) => {updateUser(item.id, e.target.previousSibling.valueAsNumber)}}>Update Price</button>
        <br></br>
        <button className='updateItemComponent__button2' onClick={() => {deleteUser(item.id)}}>Delete</button>
    </div>
  )
}
