import React, { useEffect, useState } from 'react'
import { deletePlayer, getPlayers } from './api'
import Users from './Users'

const ShowAll = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getPlayers().then((res) => {
      const users = res.data
      users.sort((a, b) => b.maxpoints - a.maxpoints)
      setUsers(res.data)
    })
  }, [])

  const list = users.map(({ _id, name, maxpoints }) => (
    <li key={_id}>
      {name}: {maxpoints}
    </li>
  ))

  return <ul>{list}</ul>
}

const Complete = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  return (
    <div>
      <div className='users-container'>
        <Users currentUser={currentUser} />
      </div>
      <button
        className='try-again-btn'
        onClick={() => window.location.reload()}>
        Try again
      </button>
      <button
        className='delete-btn'
        onClick={async () => {
          await deletePlayer(currentUser._id)
          window.location.reload()
        }}>
        Delete My Info
      </button>
      <div className='users-list'>
        <div>Users List</div>
        <ShowAll />
      </div>
    </div>
  )
}

export default Complete
