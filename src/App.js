import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class AppHeader extends Component{
  render() {
    return (
        <div className="AppHeader">
          <img src={logo} className="AppLogo" alt="logo" />
        </div>
    );
  }
}

class AppIntro extends Component{
  render() {
    return (
        <div className="AppIntro">
          <p>
            Welcome to arkcoin.net
          </p>
        </div>
    );
  }
}

class AppLinks extends Component{
  render() {
    return (
        <div className="AppBody">
          <ul>
            <a href="https://ark.io/">ark.io</a>
          </ul>
          <ul>
            <a href="https://www.reddit.com/r/ArkEcosystem/">reddit</a>
          </ul>
          <ul>
            <a href="https://explorer.arkcoin.net/">explorer</a>
          </ul>
          <ul>
            <a href="https://dexplorer.arkcoin.net/">devnet explorer</a>
          </ul>          
          <ul>
            <a href="https://www.reddit.com/r/ArkEcosystem/wiki/jarunik">jarunik</a>
          </ul>
        </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader/>
        <AppIntro/>
        <AppLinks/>
      </div>
    );
  }
}

export default App;
