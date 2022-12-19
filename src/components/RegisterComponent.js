import React from 'react'
import ItemComponent from './ItemComponent'

export default function RegisterComponent({ user, registerItems, findTotal, total, resetTotal }) {
  return (
    <div className='registerComponent'>
        <h2 className='registerComponent__title'>Your Register Cloud</h2>
        <div className='flex spaceAround'>
          <div className='flex wrap registerComponent__itemContainer'>
            { registerItems.filter(registerItem => registerItem.companyEmail === user.email).length===0 && <h2 className='registerComponent__title'>Add Items to your Register below!</h2> }
          {user && registerItems.filter(registerItem => registerItem.companyEmail === user.email).map(item => { 
            return <ItemComponent key={item.menuItemName} item={item} findTotal={findTotal} />
          })}
          </div>
          <div className='registerComponent__checkout'>
            <h2>Checkout</h2>
            <p>Total: $ { total }</p>
            <button onClick={resetTotal}>Reset Total</button>
          </div>
        </div>
    </div>
  )
}
