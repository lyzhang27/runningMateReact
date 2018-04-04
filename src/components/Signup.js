import React, { Component } from 'react'
import axios from 'axios'
import App from "../App";

class Signup extends Component {
    constructor(props){
        super(props);
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup(e) {
        e.preventDefault();
        let that = this
        axios.post('http://localhost:3001/api/v1/users',
            { user: {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            }
        })
            .then(function(response){
                console.log(response)
                that.props.changePage("login");
                that.props.updateCurrentUser(response.data.email);
            })
            .catch(function(error){
                console.log(error.response)
            })
    }

    render() {
        return (
            <div>
                <h2>Signup</h2>
                <form>
                    <input id="email" placeholder="email"/>
                    <input id="password" placeholder="password"/>
                    <button onClick={this.handleSignup}>Submit</button>
                </form>
                <button onClick={() => this.props.changePage("login")}>Back to Login</button>
            </div>
        );
    };
};

export default Signup;
