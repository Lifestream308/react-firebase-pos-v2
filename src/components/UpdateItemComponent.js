import React from 'react'

export default function UpdateItemComponent({ item, updateUser, deleteUser }) {
  return (
    <div className='itemComponent'>
        <div>{item.menuItemName}</div>
        <span>$</span>
        <input type='number' className='amount' defaultValue={item.Price} />
        <button onClick={(e) => {updateUser(item.id, e.target.previousSibling.valueAsNumber)}}>Update Price</button>
        <br></br>
        <button onClick={() => {deleteUser(item.id)}}>Delete</button>
    </div>
  )
}
