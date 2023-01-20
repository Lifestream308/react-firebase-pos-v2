import React from 'react'

export default function HistoryComponent({firebaseHistoryDB}) {
  return (
    <div>
        <div>HistoryComponent</div>
        <button onClick={()=>console.log(firebaseHistoryDB)}>ConsoleLog Something</button>
    </div>
  )
}
