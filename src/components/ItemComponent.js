import React from 'react'

export default function ItemComponent({ item, handleCartTotals, itemIncrease, itemDecrease }) {
  return (
    <div className='itemComponent'>
        <div className='name'>{item.name}</div>
        <span>$</span>
        <span className='price'>{item.price}</span>
        <br></br>
        <br></br>
        <div className='flex'>
          <button className='itemComponent__button1' onClick={()=> itemDecrease(item)}><i className="bi bi-dash-square"></i></button>
          <input type='number' className='amount itemComponent__input' onChange={e => handleCartTotals(item, e)} value={item.amount} />
          <button className='itemComponent__button1' onClick={()=> itemIncrease(item)}><i className="bi bi-plus-square"></i></button>
        </div>
    </div>
  )
}