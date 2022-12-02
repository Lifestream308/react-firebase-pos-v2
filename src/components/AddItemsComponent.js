import React from 'react'

export default function AddItemsComponent({ itemNameRef, itemPriceRef, createUser }) {
  return (
    <>
        <h2 className=''>Add Items To Register</h2>
        <div>
            <label>Name</label>
            <input type='text' ref={itemNameRef} />
        </div>
        <div>
            <label>Price</label>
            <input type='number' ref={itemPriceRef} />
        </div>
        <button onClick={createUser}>Add Item</button>
    </>
  )
}
