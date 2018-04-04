import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import WorkoutsContainer from './components/WorkoutsContainer'

class App extends Component {
    constructor(){
        super();
        this.state = {
            page:"login",
            currentUser: null
        }

        this.changePage = this.changePage.bind(this);
        this.updateCurrentUser = this.updateCurrentUser.bind(this);
    }

    changePage(newPage) {
        this.setState({
            page: newPage
        })
    }

    updateCurrentUser(userId) {
        console.log(userId)
        this.setState({
            currentUser: userId
        })
    }

    render() {
        switch(this.state.page) {
            case "login":
                return <Login changePage={this.changePage} updateCurrentUser={this.updateCurrentUser}/>
            case "signup":
                return <Signup changePage={this.changePage}/>
            case "home":
                return(
                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">Marathon Workout Plans</h1>
                        </header>
                        <WorkoutsContainer userId={this.state.currentUser}/>
                    </div>
                )
        }
    }
}

export default App;
