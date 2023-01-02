import React from 'react'
import ItemComponent from './ItemComponent'

export default function RegisterComponent({ user, firebaseItemsDB, handleCartTotals, total, resetTotal, totalItems }) {
  return (
    <div className='registerComponent'>
        <h2 className='registerComponent__title'>Your Register Cloud</h2>
        <div className='flex spaceAround'>
          <div className='flex wrap registerComponent__itemContainer'>
            { firebaseItemsDB.filter(registerItem => registerItem.companyEmail === user.email).length===0 && <h2 className='registerComponent__title'>Add Items to your Register below!</h2> }
          {user && firebaseItemsDB.filter(registerItem => registerItem.companyEmail === user.email).map(item => { 
            return <ItemComponent key={item.menuItemName} item={item} handleCartTotals={handleCartTotals} />
          })}
          </div>
          <div className='registerComponent__checkout'>
            <h2>Cart</h2>
            <span><i className="bi bi-cart3"></i> {totalItems}</span>
            <p>Total: $ { total }</p>
            <button onClick={resetTotal}>Reset Cart</button>
          </div>
        </div>
    </div>
  )
}
