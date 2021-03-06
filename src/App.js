import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'

import { AppLinks } from './AppLinks.js'
import { AppDelegate } from './AppDelegate.js'
import { AppVoters } from './AppVoters.js'
import { AppHistory } from './AppHistory.js'
import { AppPaymentRun} from './AppPaymentRun.js'
import { AppPaymentVoter} from './AppPaymentVoter.js'
import { AppBittrex} from './AppBittrex.js'
import { AppNews} from './AppNews.js'

class AppHeader extends Component {
  render() {
    return (
      <div className="AppHeader">
        <img src={ logo } className="AppLogo" alt="logo" />
        <nav>
          <Link to='/'>News</Link> &nbsp;
          <Link to='/links'>Jarunik</Link> &nbsp;
          <Link to='/delegates'>Delegates</Link> &nbsp;
          <Link to='/voters'>Voters</Link> &nbsp;
          <Link to='/history'>History</Link> &nbsp;
          <Link to='/bittrex'>Bittrex</Link>
        </nav>
      </div>
    );
  }
}

class AppMain extends Component {
  render() {
    return (
      <div className="AppMain">
        <Switch>
          <Route exact path='/' component={AppNews}/>
          <Route path='/links' component={AppLinks}/>
          <Route path='/delegates' component={AppDelegate}/>
          <Route path='/voters' component={AppVoters}/>          
          <Route path='/history' component={AppHistory}/>
          <Route path='/paymentrun/:id' component={AppPaymentRun}/>
          <Route path='/paymentvoter/:id' component={AppPaymentVoter}/>
          <Route path='/bittrex' component={AppBittrex}/>
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
