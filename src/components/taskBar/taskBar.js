import React from 'react';
import Axios from 'axios';
import TaskInput from '../taskInput/taskInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import './taskBar.css'

export default class ListTasks extends React.Component{
    constructor(props){
        super(props);
        const token = localStorage.getItem('token');
        let loggedIn = true;
        if(token === null) loggedIn = false;
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        };
        const endpoint = `https://todo-application-backend.herokuapp.com`;
        this.state= {
            tasks: [],
            task:'',
            loggedIn,
            config,
            endpoint
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        Axios.get(this.state.endpoint+`/tasks`,this.state.config).then(res => {
          this.setState({
            tasks: res.data.data
          });
        })
      }
      handleDelete(id){
          Axios.delete(this.state.endpoint+`/tasks/${id}`, this.state.config)
          .then(res =>{
              this.componentDidMount();
          })
      }

      updateTask(id, value, name){
          if(name === 'status') value = !value;
          Axios.put(this.state.endpoint+`/tasks/${id}`,{[name]:value}, this.state.config)
          .then(res =>{
              this.componentDidMount();
          })
      }
    render(){
        if(!this.state.loggedIn)return(<Redirect to="/login"/>)
        return(
            <div className="App container">
                <header>
                <div className="header">
                    <span className="headerContent">Node and React JS ToDo App</span>
                    <button type="button" className="btn btn-warning"><Link to="/logout">logout</Link></button>
                </div>
                </header>
                <div className="content">
                <div>
                    <TaskInput onAddTask={this.componentDidMount} />
                    {this.state.tasks.map(task => (
                        <div className="task" key={task._id}>
                            <p>
                                <FontAwesomeIcon className={`${task.status ? 'checkIconActive' : 'checkIcon'}`} icon={faCheckCircle}
                                    onClick={() => { this.updateTask(task._id, task.status, 'status') }} />
                                <input type="text" name="task" id={task._id}
                                    value={task.task}
                                    onChange={(e) => this.updateTask(task._id, e.target.value, e.target.name)}
                                />
                                <span>
                                    <FontAwesomeIcon icon={faTrash}
                                        onClick={() => { this.handleDelete(task._id) }}
                                    />
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        )
    }
}