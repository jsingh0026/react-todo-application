import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../../App.css';

export default class Login extends React.Component{

  constructor(props){
    super(props)
    const token = localStorage.getItem('token');
    let loggedIn = true;
        if(token === null) loggedIn = false;
        this.state= {
            tasks: [],
            task:'',
            loggedIn
        }
    this.state = {
      username:'',
      password:'',
      loggedIn
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit(e){
      e.preventDefault();
      Axios.post(`https://todo-application-backend.herokuapp.com/users/login`, {email: this.state.username, password: this.state.password} ).then(res => {
          if(res.data.success){
              localStorage.setItem('token', res.data.data.token);
            this.setState({
                loggedIn:true
            })
        }
      })
      .catch(error => {
          console.log(error);
      })
  }

  render(){
      if(this.state.loggedIn){
          return(<Redirect to="/tasks" />)
      }
    return(
      <div className="App container">
        <header><div className="header">
          <span className="headerContent">Login</span>
          </div>
        </header>
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <div>
            <input type="text" className="username" placeholder="Username" 
            name="username" value={this.state.username}
            onChange={this.handleChange}/>
            </div>
            <div>
            <input type="password" className="password" placeholder="Password" 
            name="password" value={this.state.password}
            onChange={this.handleChange}/>
            </div>
            <input className="btn btn-success submitBtn" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

