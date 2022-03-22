import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage'
import Dashboard from './components/pages/Dashboard'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router basename='/myApp' >
          <Switch>
            <Route exact path="/login" render={(props) => <LandingPage {...props}/>} />
            <Route path="/dashboard" render={(props) => <Dashboard {...props}/>} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
