import React from 'react'
import ItemComponent from './ItemComponent'

export default function RegisterComponent({ user, firebaseItemsDB, handleCartTotals, total, resetCart, totalItems, cartList, itemIncrease, itemDecrease, cash, handleCash, checkoutCartList, createSaleHistory }) {
  return (
    <div className='registerComponent'>
        <h2 className='registerComponent__title'>Your Register Cloud</h2>
        <div className='flex spaceAround'>
          <div className='flex wrap registerComponent__itemContainer'>
            { cartList.length === 0 && <h2 className='registerComponent__title'>{ firebaseItemsDB ? "Add Items to your Register below!" : "Loading..." }</h2> }
          {user && cartList.map(item => { 
            return <ItemComponent key={item.name} item={item} handleCartTotals={handleCartTotals} itemIncrease={itemIncrease} itemDecrease={itemDecrease} />
          })}
          </div>
          <div className='registerComponent__checkout'>
            <div>
              <h2>Cart</h2>
              <span><i className="bi bi-cart3"></i> {totalItems}</span>
              <p>Total: $ { total }</p>
              <button className='registerComponent__checkoutButton1' onClick={resetCart}>Reset Cart</button>
            </div>
            <div>
              { checkoutCartList.map(item => {
                return ( 
                <div key={item.name}>
                  <small>${ item.price} { item.name } x{ item.amount }</small>
                </div> )
              })}
            </div>
            <div>
              { checkoutCartList.length > 0 && 
              <div className='registerComponent__cashContainer'>
                <label>Cash Payment:</label>
                <br/>
                <span>$ </span>
                <input className='registerComponent__input' onChange={ (e) => handleCash(e)} type="number" value={ cash }></input>
              </div> }
            </div>
            <div>
              { cash - total >= 0 && checkoutCartList.length > 0 &&
              <div className='registerComponent__changeContainer'>
                <span>Change is $ </span>
                <span className='registerComponent__span'>{ (cash - total).toFixed(2) }</span>
                <br></br>
                <button className='registerComponent__changeContainerButton1' onClick={ ()=> createSaleHistory()}>Add to History</button>
              </div> }
            </div>
          </div>
        </div>
    </div>
  )
}
