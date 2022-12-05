import React from 'react'

export default function AddItemsComponent({ itemNameRef, itemPriceRef, createUser }) {
  return (
    <div className='addItemsComponent'>
        <h2>Add Items To Register</h2>
        <div>
            <input type='text' ref={itemNameRef} placeholder="Name" />
        </div>
        <div>
            <input type='number' ref={itemPriceRef} placeholder="Price" />
        </div>
        <button onClick={createUser}>Add Item</button>
    </div>
  )
}
