import { useState } from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout'
import { getBestUser } from './utils'

const Login = () => {
  const [username, setUsername] = useState('')
  const overallBestUserArr = JSON.parse(localStorage.getItem('users')) || []
  let overallBestUser = []
  let overallBest

  const handleLogin = () => {
    const pattern = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,10}$/

    if (!pattern.test(username)) {
      alert(
        'The Nickname must contains number and letter, the length must over or equal 6 and less than 10'
      )
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const id = new Date().valueOf()
    let oldUser

    if (users.length > 0) {
      users.forEach((user) => {
        if (user.user === username) {
          localStorage.setItem('currentUserId', user.id)
          localStorage.setItem('currentUserBest', Number(user.best) || 0)

          oldUser = true
        }
      })

      if (!oldUser) {
        // add new user
        users.push({ user: username, id })
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('currentUserId', id)
        localStorage.setItem('currentUserBest', 0)
      }
    } else {
      // add new user
      users.push({ user: username, id })
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('currentUserId', id)
      localStorage.setItem('currentUserBest', 0)
    }

    localStorage.setItem('currentUser', username)
    ReactDOM.render(<Layout />, document.getElementById('root'))
  }

  if (overallBestUserArr.length > 0) {
    for (let i = 10; i > 0; i--) {
      if (overallBestUser.length > 0) {
        break
      } else {
        overallBestUser = getBestUser(overallBestUserArr, i)
        if (overallBestUser.length > 0) {
          overallBest = overallBestUser[0].best

          const bestUsers = overallBestUser.map((user) => user.user)

          bestUsers.join(', ')
          localStorage.setItem('overallBest', overallBest)
          localStorage.setItem('overallBestUser', bestUsers)
        } else {
          localStorage.setItem('overallBest', 0)
          localStorage.setItem('overallBestUser', 'N/A')
        }
      }
    }
  } else {
    localStorage.setItem('overallBest', 0)
    localStorage.setItem('overallBestUser', 'N/A')
  }

  localStorage.setItem('currentScore', 0)
  return (
    <form onSubmit={handleLogin}>
      <label className='nickname-label' htmlFor='username'>
        Nickname:
        <input
          id='username'
          className='user-name-input'
          value={username}
          placeholder='please enter your nickname'
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <input type='submit' value='submit' className='submit-btn' />
    </form>
  )
}

export default Login
