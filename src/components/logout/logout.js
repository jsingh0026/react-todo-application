import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

export default class Logout extends React.Component{
    constructor(props){
        super(props)
        localStorage.removeItem('token');
    }

  render(){
    return(
      <div className="App container">
        <header><div className="header">
          <span className="headerContent">Logged Out!</span>
          </div>
        </header>
        <div className="content">
            <Link to="/login">Login Again</Link>
        </div>
      </div>
    );
  }
}

