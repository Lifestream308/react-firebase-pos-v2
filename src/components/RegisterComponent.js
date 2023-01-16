import React from 'react'
import ItemComponent from './ItemComponent'

export default function RegisterComponent({ user, handleCartTotals, total, resetCart, totalItems, cartList, itemIncrease, itemDecrease }) {
  return (
    <div className='registerComponent'>
        <h2 className='registerComponent__title'>Your Register Cloud</h2>
        <div className='flex spaceAround'>
          <div className='flex wrap registerComponent__itemContainer'>
            { cartList.length === 0 && <h2 className='registerComponent__title'>Add Items to your Register below!</h2> }
          {user && cartList.map(item => { 
            return <ItemComponent key={item.name} item={item} handleCartTotals={handleCartTotals} itemIncrease={itemIncrease} itemDecrease={itemDecrease} />
          })}
          </div>
          <div className='registerComponent__checkout'>
            <h2>Cart</h2>
            <span><i className="bi bi-cart3"></i> {totalItems}</span>
            <p>Total: $ { total }</p>
            <button onClick={resetCart}>Reset Cart</button>
            <br></br>
            { cartList.filter(item=> item.amount > 0).map(item => {
              return ( 
              <div key={item.name}>
                <small>${ item.price} { item.name } x{ item.amount }</small>
              </div> )
            })}
            { cartList.filter(item=> item.amount > 0).length > 0 && 
            <div>
              <label>Cash Received: </label>
              <input type="number" defaultValue="0"></input>
              <br></br>
              <label>Change: </label>
              <input type="number" defaultValue="0"></input>
            </div> }
            {/* { cartList.filter(item=> item.amount > 0).length > 0 && <button>Checkout</button> } */}
          </div>
        </div>
    </div>
  )
}
