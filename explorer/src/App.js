import React, { Component } from 'react';
import { DrizzleProvider } from 'drizzle-react'

import SmartPiggies from './contracts/SmartPiggies.json'

import Home from './components/Home'

//import logo from './logo.svg';
import './App.css';

const options = { contracts: [SmartPiggies] }

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={options}>
        <Home />
      </DrizzleProvider>
    );
  }
}

{/**
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
  **/}

export default App;
