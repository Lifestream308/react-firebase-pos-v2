import React from 'react'

export default function AddItemsComponent({ itemNameRef, itemPriceRef, createItem }) {
  return (
    <div className='addItemsComponent'>
        <h2>Add Items To Register</h2>
        <div>
            <input type='text' ref={itemNameRef} placeholder="Name" />
        </div>
        <div>
            <input type='number' ref={itemPriceRef} placeholder="Price" />
        </div>
        <button onClick={createItem}>Add Item</button>
    </div>
  )
}
