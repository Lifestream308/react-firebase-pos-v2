import React from 'react'
import ItemComponent from './ItemComponent'

export default function RegisterComponent({ user, registerItems, findTotal, total }) {
  return (
    <>
        <h2 className=''>Your Register Cloud</h2>
        <div className='flex spaceAround'>
          <div className='flex wrap'>
          {user && registerItems.filter(registerItem => registerItem.companyEmail === user.email).map(item => { 
            return <ItemComponent key={item.menuItemName} item={item} findTotal={findTotal} />
          })}
          </div>
          <div className='lgAside'>
          <p className='margin2'>Total: $ { total }</p>
          </div>
        </div>
    </>
  )
}
