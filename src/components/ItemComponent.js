import React from 'react'

export default function ItemComponent({ item, findTotal }) {
  return (
    <div className='itemComponent'>
        <div>{item.menuItemName}</div>
        <span>$</span>
        <span className='price'>{item.Price}</span>
        <br></br>
        <input type='number' className='amount' onChange={findTotal} defaultValue='0' />
    </div>
  )
}
