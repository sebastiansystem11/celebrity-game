const Users = ({ currentUser }) => {
  const leader = JSON.parse(sessionStorage.getItem('leader'))
  return (
    <div className='users-container'>
      <div className='current-user'>
        Nickname:
        {currentUser.name}
      </div>
      <div>
        Your Current Score:
        {currentUser.points}
      </div>
      <div className='current-user-best'>
        Your Best Score:
        {currentUser.maxpoints}
      </div>
      <div className='overall-best'>
        The Best Score Overall:
        {leader.maxpoints}
      </div>
    </div>
  )
}

export default Users
