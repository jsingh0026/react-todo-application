import React from 'react';
import Axios from 'axios';
import './taskInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default class TaskInput extends React.Component{
    constructor(props){
        super(props)
        const token = localStorage.getItem('token');
        const endpoint = `https://todo-application-backend.herokuapp.com`;
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        };
        this.state= {
            task:'',
            config, 
            endpoint
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            task: e.target.value
        })
      }

    handleSubmit(e){
        e.preventDefault();
        const newTask = {
          task: this.state.task
        };
        Axios.post(this.state.endpoint+`/tasks`, newTask, this.state.config)
        .then(res =>{
            if(this.state.task!==""){
                this.setState({
                    task:''
                })
            this.props.onAddTask();
            }
        })
      }  

    render(){
        return(
            <form id="todo-input" onSubmit={this.handleSubmit}>
                <input className="input" type="text" placeholder="Tell me Anything, I will remember for you"
                    value={this.state.task}
                    onChange={this.handleChange}
                />
                <button type="submit"><FontAwesomeIcon className="faicon" icon={faPlusCircle}/></button>
            </form>
        )
    }
}