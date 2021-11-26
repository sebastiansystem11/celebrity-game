/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CelebritiesList } from './celebrities-list';
import './index.css';
import { getBestUser } from './utils';
import { getPlayers, postPlayer } from './http';

// function handleLogin(userName) {
//   const pattern = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,10}$/;

//   if (!pattern.test(userName)) {
//     // eslint-disable-next-line
//       alert('The Nickname must contains number and letter, the length must over or equal 6 and less than 10');
//     return;
//   }

//   const users = JSON.parse(localStorage.getItem('users')) || [];
//   const id = new Date().valueOf();
//   let oldUser;

//   if (users.length > 0) {
//     users.forEach((user) => {
//       if (user.user === this.state.userName) {
//         localStorage.setItem('currentUserId', user.id);
//         localStorage.setItem('currentUserBest', Number(user.best) || 0);

//         oldUser = true;
//       }
//     });

//     if (!oldUser) {
//       // add new user
//       users.push({ user: this.state.userName, id: id });
//       localStorage.setItem('users', JSON.stringify(users));
//       localStorage.setItem('currentUserId', id);
//       localStorage.setItem('currentUserBest', 0);
//     }
//   } else {
//     // add new user
//     users.push({ user: this.state.userName, id: id });
//     localStorage.setItem('users', JSON.stringify(users));
//     localStorage.setItem('currentUserId', id);
//     localStorage.setItem('currentUserBest', 0);
//   }

//   localStorage.setItem('currentUser', this.state.userName);
//   ReactDOM.render(<Layout />, document.getElementById('root'));
// }

function Login() {
  const [username, setUsername] = useState('');
  const overallBestUserArr = JSON.parse(localStorage.getItem('users')) || [];
  let overallBestUser = [];
  let overallBest;

  const handleLogin = () => {
    const pattern = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,10}$/;

    if (!pattern.test(username)) {
      // eslint-disable-next-line
      alert('The Nickname must contains number and letter, the length must over or equal 6 and less than 10');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const id = new Date().valueOf();
    let oldUser;

    if (users.length > 0) {
      users.forEach((user) => {
        if (user.user === username) {
          localStorage.setItem('currentUserId', user.id);
          localStorage.setItem('currentUserBest', Number(user.best) || 0);

          oldUser = true;
        }
      });

      if (!oldUser) {
        // add new user
        users.push({ user: username, id: id });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUserId', id);
        localStorage.setItem('currentUserBest', 0);
      }
    } else {
      // add new user
      users.push({ user: username, id: id });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUserId', id);
      localStorage.setItem('currentUserBest', 0);
    }

    localStorage.setItem('currentUser', username);
    ReactDOM.render(<Layout />, document.getElementById('root'));
  };

  if (overallBestUserArr.length > 0) {
    for (let i = 10; i > 0; i--) {
      if (overallBestUser.length > 0) {
        break;
      } else {
        overallBestUser = getBestUser(overallBestUserArr, i);
        if (overallBestUser.length > 0) {
          overallBest = overallBestUser[0].best;

          const bestUsers = overallBestUser.map((user) => user.user);

          bestUsers.join(', ');
          localStorage.setItem('overallBest', overallBest);
          localStorage.setItem('overallBestUser', bestUsers);
        } else {
          localStorage.setItem('overallBest', 0);
          localStorage.setItem('overallBestUser', 'N/A');
        }
      }
    }
  } else {
    localStorage.setItem('overallBest', 0);
    localStorage.setItem('overallBestUser', 'N/A');
  }

  localStorage.setItem('currentScore', 0);
  return (
    <form onSubmit={handleLogin}>
      <label className="nickname-label">
        Nickname:
        <input
          className="user-name-input"
          value={username}
          placeholder="please enter your nickname"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <input type="submit" value="submit" className="submit-btn" />
    </form>
  );
}

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userName: '',
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleLogin = this.handleLogin.bind(this);
//     this.getBestUser = this.getBestUser.bind(this);

//     const overallBestUserArr = JSON.parse(localStorage.getItem('users')) || [];
//     let overallBestUser = [];
//     let overallBest;

//     if (overallBestUserArr.length > 0) {
//       for (let i = 10; i > 0; i--) {
//         if (overallBestUser.length > 0) {
//           break;
//         } else {
//           overallBestUser = this.getBestUser(overallBestUserArr, i);
//           if (overallBestUser.length > 0) {
//             overallBest = overallBestUser[0].best;

//             const bestUsers = overallBestUser.map((user) => user.user);

//             bestUsers.join(', ');
//             localStorage.setItem('overallBest', overallBest);
//             localStorage.setItem('overallBestUser', bestUsers);
//           } else {
//             localStorage.setItem('overallBest', 0);
//             localStorage.setItem('overallBestUser', 'N/A');
//           }
//         }
//       }
//     } else {
//       localStorage.setItem('overallBest', 0);
//       localStorage.setItem('overallBestUser', 'N/A');
//     }

//     localStorage.setItem('currentScore', 0);
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleLogin}>
//         <label className="nickname-label">
//           Nickname:
//           <input
//             className="user-name-input"
//             value={this.state.userName}
//             placeholder="please enter your nickname"
//             onChange={this.handleChange}
//           />
//         </label>
//         <input type="submit" value="submit" className="submit-btn" />
//       </form>
//     );
//   }

//   handleLogin() {
//     const pattern = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,10}$/;

//     if (!pattern.test(this.state.userName)) {
//       // eslint-disable-next-line
//       alert('The Nickname must contains number and letter, the length must over or equal 6 and less than 10');
//       return;
//     }

//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const id = new Date().valueOf();
//     let oldUser;

//     if (users.length > 0) {
//       users.forEach((user) => {
//         if (user.user === this.state.userName) {
//           localStorage.setItem('currentUserId', user.id);
//           localStorage.setItem('currentUserBest', Number(user.best) || 0);

//           oldUser = true;
//         }
//       });

//       if (!oldUser) {
//         // add new user
//         users.push({ user: this.state.userName, id: id });
//         localStorage.setItem('users', JSON.stringify(users));
//         localStorage.setItem('currentUserId', id);
//         localStorage.setItem('currentUserBest', 0);
//       }
//     } else {
//       // add new user
//       users.push({ user: this.state.userName, id: id });
//       localStorage.setItem('users', JSON.stringify(users));
//       localStorage.setItem('currentUserId', id);
//       localStorage.setItem('currentUserBest', 0);
//     }

//     localStorage.setItem('currentUser', this.state.userName);
//     ReactDOM.render(<Layout />, document.getElementById('root'));
//   }

//   handleChange(e) {
//     this.setState({ userName: e.target.value });
//   }

//   getBestUser(users, max) {
//     const bestUsers = [];

//     users.forEach((user) => {
//       if (user.best + '' === max + '') {
//         bestUsers.push(user);
//       }
//     });

//     return bestUsers;
//   }
// }

// function Layout(props){
//   const sortArray = (arr) =>{
//     const array = arr.sort(() => Math.random() - 0.5);

//     return array;
//   }
//   const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));
//   const [currentScore, setCurrentScore] = useState(localStorage.getItem('currentScore') || 0);
//   const [currentUserBest, setCurrentUserBest] = useState(localStorage.getItem('currentUserBest') || 0,)
//   const [overallBest, setOverallBest] = useState(localStorage.getItem('overallBest') || 0);
//   const [overallBestUser, setOverallBestUser] = useState(localStorage.getItem('overallBestUser') || 'N/A');
//   const [celebritiesList, setCelebritiesList] = useState(sortArray(CelebritiesList));

//   const setState = () => {
//     const celebritiesListData = celebritiesList;
//     const currentUserBestData = localStorage.getItem('currentUserBest');
//     const overallBestData = localStorage.getItem('overallBest');
//     const overallBestUserData = localStorage.getItem('overallBestUser');
//     const currentScoreData = localStorage.getItem('currentScore');
//     setCurrentUserBest(currentUserBestData)
//     console.log('currentUserBestData:', currentUserBestData)
//     console.log('currentUserBest:', currentUserBest)
//     setOverallBest(overallBestData)
//     setOverallBestUser(overallBestUserData)
//     setCurrentScore(currentScoreData)
//     setCelebritiesList(celebritiesListData);
//   }

//   const getNext = (reslut, msg) => {
//     if (msg === 'next') {
//       console.log('111:', currentUser)
//       const celebritiesListData = celebritiesList;

//       celebritiesListData.shift();
//       if (celebritiesListData.length > 0) {
//         setState();
//       } else {
//         ReactDOM.render(<Complete />, document.getElementById('root'));
//       }
//     }
//   }

//   return (
//     <div className="page-container">
//       <div className="header">
//         <Users users={currentUser, currentScore, currentUserBest, overallBest, overallBestUser, celebritiesList} />
//       </div>
//       <div className="main">
//         <Celebrity celebrityInfo={celebritiesList[0]} goNext={getNext} />
//       </div>
//     </div>
//   );
// }

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: localStorage.getItem('currentUser'),
      currentScore: localStorage.getItem('currentScore') || 0,
      currentUserBest: localStorage.getItem('currentUserBest') || 0,
      overallBest: localStorage.getItem('overallBest') || 0,
      overallBestUser: localStorage.getItem('overallBestUser') || 'N/A',
      celebritiesList: this.sortArray(CelebritiesList),
    };

    this.getNext = this.getNext.bind(this);
  }

  render() {
    return (
      <div className="page-container">
        <div className="header">
          <Users users={this.state} />
        </div>
        <div className="main">
          <Celebrity celebrityInfo={this.state.celebritiesList[0]} goNext={this.getNext} />
        </div>
      </div>
    );
  }

  sortArray(arr) {
    const array = arr.sort(() => Math.random() - 0.5);
    return array;
  }

  getNext(reslut, msg) {
    if (msg === 'next') {
      const celebritiesList = this.state.celebritiesList;
      const currentUserBest = localStorage.getItem('currentUserBest');
      const overallBest = localStorage.getItem('overallBest');
      const overallBestUser = localStorage.getItem('overallBestUser');
      const currentScore = localStorage.getItem('currentScore');

      celebritiesList.shift();

      if (celebritiesList.length > 0) {
        this.setState({
          currentUserBest: currentUserBest,
          overallBest: overallBest,
          overallBestUser: overallBestUser,
          currentScore: currentScore,
          celebritiesList: celebritiesList,
        });
      } else {
        ReactDOM.render(<Complete />, document.getElementById('root'));
      }
    }
  }
}

function Users(props) {
  const users = props.users;
  console.log('props:', props);
  return (
    <div className="users-container">
      <div className="current-user">
        Nickname:
        {users.currentUser ? users.currentUser : props.currentUser}
      </div>
      <div>
        Your Current Score:
        {users.currentScore}
      </div>
      <div className="current-user-best">
        Your Best Score:
        {users.currentUserBest}
      </div>
      <div className="overall-best">
        The Best Score Overall:
        {users.overallBestUser + '( ' + users.overallBest + ')'}
      </div>
    </div>
  );
}

function Celebrity(props) {
  const [answer, setAnswer] = useState('');
  const goToNext = () => {
    props.goNext(this, 'next');
  };
  const getAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const getCelebrities = (names) => {
    const list = names.map((name) => (
      <li key={name}>
        <label>
          <input name="celebrity" type="radio" value={name} onChange={getAnswer} />
          {name}
        </label>
      </li>
    ));

    return list;
  };

  const [celebrities, setCelebrities] = useState(getCelebrities(props.celebrityInfo.names));

  const handleSubmit = () => {
    let score = localStorage.getItem('currentScore') || 0;
    const currentUser = localStorage.getItem('currentUser');
    const currentUserBest = localStorage.getItem('currentUserBest') || 0;
    const currentUserId = localStorage.getItem('currentUserId') || new Date().valueOf();
    const overallBest = localStorage.getItem('overallBest') || 0;
    const users = JSON.parse(localStorage.getItem('users'));

    if (answer === props.celebrityInfo.answer) {
      score = Number(score) + 1;
      localStorage.setItem('currentScore', score);
    }

    if (score > overallBest) {
      localStorage.setItem('overallBest', score);
      localStorage.setItem('overallBestUser', currentUser);
    }

    if (score > currentUserBest) {
      const list = [];
      let flag;
      localStorage.setItem('currentUserBest', score);

      users.forEach((user) => {
        if (user.user === currentUser) {
          user['best'] = score;
          flag = true;
        }
      });

      if (!flag) {
        const obj = {};
        obj['user'] = currentUser;
        obj['id'] = currentUserId;
        obj['best'] = currentUserBest;

        list.push(obj);
      }

      const usersList = users.concat(list);
      localStorage.setItem('users', JSON.stringify(usersList));
    } else {
      const list = [];
      let flag;

      users.forEach((user) => {
        if (user.user === currentUser) {
          user['best'] = currentUserBest;
          flag = true;
        }
      });

      if (!flag) {
        const obj = {};
        obj['user'] = currentUser;
        obj['id'] = currentUserId;
        obj['best'] = currentUserBest;

        list.push(obj);
      }

      const usersList = users.concat(list);
      localStorage.setItem('users', JSON.stringify(usersList));
    }

    goToNext();
    // eslint-disable-next-line
  }

  return (
    <div className="celebrity-container">
      <div className="celebrity-img">
        <img alt="" src={props.celebrityInfo.url} />
      </div>
      <div className="celebrity-selector">
        <ul>{getCelebrities(props.celebrityInfo.names)}</ul>
        <button onClick={handleSubmit}>submit</button>
      </div>
    </div>
  );
}

class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: localStorage.getItem('currentUser'),
      currentUserBest: localStorage.getItem('currentUserBest'),
      overallBest: localStorage.getItem('overallBest'),
      overallBestUser: localStorage.getItem('overallBestUser'),
      currentUserId: localStorage.getItem('currentUserId'),
      users: localStorage.getItem('users'),
    };

    this.tryAgain = this.tryAgain.bind(this);
    this.delete = this.delete.bind(this);
    this.delete = this.delete.bind(this);
  }

  render() {
    return (
      <div>
        <div className="users-container">
          <Users users={this.state} />
        </div>
        <button className="try-again-btn" onClick={this.tryAgain}>
          Try again
        </button>
        <button className="delete-btn" onClick={this.delete}>
          Delete My Info
        </button>
        <div className="users-list">
          <div>Users List</div>
          <ShowAll />
        </div>
      </div>
    );
  }

  tryAgain() {
    window.location.reload();
  }

  delete() {
    const users = JSON.parse(this.state.users);

    users.forEach((user, index) => {
      if (user.id.toString() === this.state.currentUserId.toString()) {
        users.splice(index, 1);
      }
    });

    localStorage.setItem('users', JSON.stringify(users));
    // eslint-disable-next-line
    alert('Deleted');
  }

  showAll() {
    const users = JSON.parse(this.state.users);

    users.forEach((user) => {
      delete user.id;
    });

    this.users = users;
  }
}

function ShowAll() {
  const users = JSON.parse(localStorage.getItem('users'));

  const list = users.map((user) => (
    <li key={user.id}>
      {user.user}
      :
      {user.best}
    </li>
  ));

  return <ul>{list}</ul>;
}

ReactDOM.render(<Login />, document.getElementById('root'));
