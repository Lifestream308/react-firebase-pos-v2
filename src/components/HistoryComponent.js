import React from 'react'

export default function HistoryComponent({firebaseHistoryDB, sortedHistory}) {
  return (
    <div>
        <div>History Component</div>
        <br/>
        <small>Sorted newest to oldest</small>
        <hr/>
        { sortedHistory.length === 0 && <p>Sell some items first and then the sale will appear here!</p>}
        { sortedHistory.length>0 && sortedHistory.map((saleEntry) => {
          return (
          <div key={saleEntry.id}>
            <div className="flex spaceAround">
              <div>
                <p>{saleEntry.totalItems} {saleEntry.totalItems === 1 ? "item" : "items"} Sold</p>
                <p>${saleEntry.saleTotal} total price</p>
                <p>${saleEntry.cashReceived} cash received</p>
              </div>
              <div>
                { JSON.parse(saleEntry.sale).map(item => {
                  return <p key={item.name}>{item.name} x{item.amount}</p>
                }) }
              </div>
            </div>
            <hr/>
          </div>)
        })}
    </div>
  )
}
