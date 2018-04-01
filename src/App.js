import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WorkoutsContainer from './components/WorkoutsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Running Plans</h1>
        </header>
        <WorkoutsContainer />
      </div>
    );
  }
}

export default App;
