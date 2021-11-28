import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import { updatePlayer } from './api'
import CelebritiesList from './celebrities'
import Celebrity from './Celebrity'
import Complete from './Complete'
import Users from './Users.jsx'

const Layout = () => {
  const [currentUser, setCurrentUser] = useState({
    ...JSON.parse(sessionStorage.getItem('currentUser')),
    points: 0,
  })

  const [celebrities, setCelebrities] = useState(CelebritiesList)

  const goNext = useCallback(
    async (valid) => {
      const list = celebrities.slice(1)
      if (list.length > 0) {
        list.sort(() => Math.random() - 0.5)
        setCelebrities(list)
      }

      if (valid) {
        // correct answer
        setCurrentUser({ ...currentUser, points: currentUser.points + 1 })
      }

      if (list.length === 0) {
        // finish
        let { _id: id, maxpoints, points } = currentUser

        if (valid) {
          points += 1
        }

        maxpoints = points > maxpoints ? points : maxpoints

        await updatePlayer(id, {
          maxpoints,
          points,
        })

        sessionStorage.setItem(
          'currentUser',
          JSON.stringify({ ...currentUser, points, maxpoints })
        )

        ReactDOM.render(<Complete />, document.getElementById('root'))
      }
    },
    [celebrities, currentUser]
  )

  return (
    <div className='page-container'>
      <div className='header'>
        <Users currentUser={currentUser} />
      </div>
      <div className='main'>
        <Celebrity celebrityInfo={celebrities[0]} goNext={goNext} />
      </div>
    </div>
  )
}

export default Layout
