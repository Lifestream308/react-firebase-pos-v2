import React from 'react'

export default function ItemComponent({ item }) {
  return (
    <div>
        <p>{item.menuItemName}</p>
        <p>{item.Price}</p>
    </div>
  )
}
