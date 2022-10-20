import React from 'react'

export default function ItemComponent({ item, findTotal }) {

  return (
    <div className='margin2 cardWidth'>
        <div>{item.menuItemName}</div>
        <span>$</span>
        <span className='price'>{item.Price}</span>
        <br></br>
        <input type='number' className='amount' onChange={findTotal} />
    </div>
  )
}
