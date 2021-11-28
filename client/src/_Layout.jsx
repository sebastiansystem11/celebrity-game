import React from 'react'
import ReactDOM from 'react-dom'
import CelebritiesList from './celebrities'
import Celebrity from './Celebrity'
import Complete from './Complete'
import Users from './Users.jsx'

class Layout extends React.Component {
  constructor(props) {
    console.log('layout render')

    super(props)

    this.state = {
      currentUser: localStorage.getItem('currentUser'),
      currentScore: localStorage.getItem('currentScore') || 0,
      currentUserBest: localStorage.getItem('currentUserBest') || 0,
      overallBest: localStorage.getItem('overallBest') || 0,
      overallBestUser: localStorage.getItem('overallBestUser') || 'N/A',
      celebritiesList: this.sortArray(CelebritiesList),
    }

    this.getNext = this.getNext.bind(this)
  }

  render() {
    return (
      <div className='page-container'>
        <div className='header'>
          <Users users={this.state} />
        </div>
        <div className='main'>
          <Celebrity
            celebrityInfo={this.state.celebritiesList[0]}
            goNext={this.getNext}
          />
        </div>
      </div>
    )
  }

  sortArray(arr) {
    const array = arr.sort(() => Math.random() - 0.5)
    return array
  }

  getNext(reslut, msg) {
    if (msg === 'next') {
      const celebritiesList = this.state.celebritiesList
      const currentUserBest = localStorage.getItem('currentUserBest')
      const overallBest = localStorage.getItem('overallBest')
      const overallBestUser = localStorage.getItem('overallBestUser')
      const currentScore = localStorage.getItem('currentScore')

      celebritiesList.shift()

      if (celebritiesList.length > 0) {
        this.setState({
          currentUserBest: currentUserBest,
          overallBest: overallBest,
          overallBestUser: overallBestUser,
          currentScore: currentScore,
          celebritiesList: celebritiesList,
        })
      } else {
        ReactDOM.render(<Complete />, document.getElementById('root'))
      }
    }
  }
}

export default Layout
