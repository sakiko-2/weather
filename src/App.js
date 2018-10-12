import React, { Component } from 'react';
import { Sun } from 'react-feather';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='container'>
          <div className='main-weather-icon'>
            <Sun />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
