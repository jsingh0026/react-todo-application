import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route,Redirect , BrowserRouter as Router} from 'react-router-dom';
import Login from './components/login/login';
import Logout from './components/logout/logout';
import ListTasks from './components/taskBar/taskBar';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
      <Redirect to="/login" />
      <Route path="/login" component = {Login} />
      <Route path="/tasks" component = {ListTasks} />
      <Route path="/logout" component = {Logout} />
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
