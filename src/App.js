import React, { useEffect, useState, useCallback } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';

import Navbar from './shared/Navbar/Navbar';

import Auth from './Auth/Auth';
import Starting from './Starting/Starting';
import Schedule from './Schedule/Schedule';
import ScharedItems from './SharedItems/SharedItems';
import Announcements from './Announcements/Annauncements';
import { AuthContext } from './shared/Context/auth-context';
import SharedItems from './SharedItems/SharedItems';

const App = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let routes;

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('[App] ' + user);
      if (user) {
        props.onAuth(user.displayName, user.photoURL);
      }
    });
  }, [props]);

  // console.log('[logged]' + isLoggedIn);
  // if (isLoggedIn) {
  //   routes = (
  //     <Switch>
  //       <Route path="/main" exact>
  //         <Main />
  //       </Route>
  //       <Route path="/addgroup" exact>
  //         <AddGroup />
  //       </Route>
  //       <Route path="/profile" exact>
  //         <Profile />
  //       </Route>
  //       <Route path="/team" exact>
  //         <Team />
  //       </Route>
  //       <Route path="/:groupId/tasks" exact>
  //         <MyTasks />
  //       </Route>
  //       <Redirect to="/main" />
  //     </Switch>
  //   );
  // } else {
  //   routes = (
  //     <Switch>
  //       <Route path="/" exact>
  //         <Starting />
  //       </Route>
  //       <Route path="/auth" exact>
  //         <Auth />
  //       </Route>
  //       <Route path="/:groupId/tasks" exact>
  //         <MyTasks />
  //       </Route>
  //       <Redirect to="/auth" />
  //     </Switch>
  //   );
  // }

  routes = (
    <Switch>
      <Route path="/Schedule" exact>
        <Schedule />
      </Route>
      <Route path="/announcements" exact>
        <Announcements />
      </Route>
      <Route path="/shareditems" exact>
        <SharedItems />
      </Route>
      <Redirect to="/announcements" />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{ isLogedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <Navbar />
        <main className="container">{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

// function getUser() {
//   axios
//     .get(`https://tvarkymas-4237a.firebaseio.com/Users/${user.email}.json`)
//     .then((response) => {
//       if (!response.data) {
//         createUser();
//       } else {
//         console.log('[App][success]' + response.data);
//       }
//     })
//     .catch((err) => {
//       console.log('[App][fail}' + err);
//     });
// }

// function createUser() {
//   axios
//     .post(
//       `https://tvarkymas-4237a.firebaseio.com/Users/${user.email}.json`,
//       user
//     )
//     .then((res) => {
//       console.log('[App]' + res);
//     })
//     .catch((err) => {
//       console.log('[App] ' + err);
//     })
// }
