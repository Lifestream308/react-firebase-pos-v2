import React from 'react'

export default function ItemComponent({ item }) {

  return (
    <div className='margin2'>
        <span>{item.menuItemName} $</span>
        <span className='price'>{item.Price}</span>
        <br></br>
        <input type='number' className='amount' />
    </div>
  )
}
