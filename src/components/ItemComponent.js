import React from 'react'

export default function ItemComponent({ item, handleCartTotals }) {
  return (
    <div className='itemComponent'>
        <div className='name'>{item.menuItemName}</div>
        <span>$</span>
        <span className='price'>{item.Price}</span>
        <br></br>
        <input type='number' className='amount' onChange={e => handleCartTotals(item, e)} defaultValue='0' />
    </div>
  )
}