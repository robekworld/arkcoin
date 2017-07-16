import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'

import { AppLinks } from './AppLinks.js'
import { AppTicker } from './AppTicker.js'
import { AppDelegate } from './AppDelegate.js'
import { AppRewards } from './AppRewards.js'
import { AppHistory } from './AppHistory.js'
import { AppPaymentRun} from './AppPaymentRun.js'
import { AppPaymentVoter} from './AppPaymentVoter.js'

class AppHeader extends Component {
  render() {
    return (
      <div className="AppHeader">
        <img src={ logo } className="AppLogo" alt="logo" />
        <nav>
          <p>
            <Link to='/'>Home</Link> &nbsp;
            <Link to='/delegates'>Delegates</Link> &nbsp;
            <Link to='/ticker'>Ticker</Link> &nbsp;
            <Link to='/rewards'>Rewards</Link> &nbsp;
            <Link to='/history'>History</Link>
          </p>
        </nav>
      </div>
    );
  }
}

class AppIntro extends Component {
  render() {
    return ( <
      div className = "AppIntro" >
      <
      p >
      Welcome to arkcoin.net <
      /p> <
      /div>
    );
  }
}

class AppHome extends Component {
  render() {
    return (
      <div className="AppHome">
        <AppIntro />
        <AppLinks />
      </div>
    );
  }
}

class AppMain extends Component {
  render() {
    return (
      <div className="AppMain">
        <Switch>
          <Route exact path='/' component={AppHome}/>
          <Route path='/delegates' component={AppDelegate}/>
          <Route path='/ticker' component={AppTicker}/>
          <Route path='/rewards' component={AppRewards}/>
          <Route path='/history' component={AppHistory}/>
          <Route path='/paymentrun/:id' component={AppPaymentRun}/>
          <Route path='/paymentvoter/:id' component={AppPaymentVoter}/>
        </Switch>
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppMain />
      </div>
    );
  }
}

export default App;
