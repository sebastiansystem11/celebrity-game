import { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { addPlayer, getLeaders, getPlayers } from './api'
import Layout from './Layout'

const Login = () => {
  const [username, setUsername] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    // get the top one
    getLeaders(1).then((res) => {
      const leader = res.data[0] || { maxpoints: 0 }
      sessionStorage.setItem('leader', JSON.stringify(leader))
    })

    // get all players
    getPlayers().then((res) => {
      setUsers(res.data)
    })
  }, [])

  useEffect(() => {
    // store users
    sessionStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const handleLogin = useCallback(
    async (e) => {
      // prevent browser reloading
      e.preventDefault()

      const name = username
      const pattern = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,10}$/

      if (!pattern.test(name)) {
        alert(
          'The Nickname must contains number and letter, the length must over or equal 6 and less than 10'
        )
        return
      }

      let currentUser

      if (users.length > 0) {
        currentUser = users.find((user) => user.name === name)
      }

      if (!currentUser) {
        currentUser = (await addPlayer({ name, points: 0, maxpoints: 0 })).data
        setUsers([...users, currentUser])
      }

      sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
      ReactDOM.render(<Layout />, document.getElementById('root'))
    },
    [username, users]
  )

  return (
    <form onSubmit={handleLogin}>
      <label className='nickname-label' htmlFor='username'>
        Nickname:
        <input
          id='username'
          value={username}
          className='user-name-input'
          placeholder='please enter your nickname'
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <input type='submit' value='submit' className='submit-btn' />
    </form>
  )
}

export default Login
