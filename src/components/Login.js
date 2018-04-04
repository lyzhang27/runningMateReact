import React, { Component } from 'react'
import App from "../App";
import axios from "axios/index";

class Login extends Component {
    constructor(props){
        super(props);
        this.handleSignin = this.handleSignin.bind(this);
    }

    handleSignin(e) {
        e.preventDefault();
        let that = this
        axios.post('http://localhost:3001/api/v1/users/sign_in',
            { user: {
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                }
            })
            .then(function(response){
                console.log(response)
                that.props.updateCurrentUser(response.data.id);
                console.log(response.data.id)
                that.props.changePage("home");
            })
            .catch(function(error){
                console.log(error.response)
            })
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form>
                    <input id='email' placeholder='email'/>
                    <input id='password' placeholder='password'/>
                    <button onClick={this.handleSignin}>Submit</button>
                </form>
                <button onClick={() => this.props.changePage('signup')}>Sign Up!</button>
            </div>
        )
    }
}

export default Login;