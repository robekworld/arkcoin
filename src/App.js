import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'

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
            <Link to='/rewards'>Rewards</Link>
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

class AppLinks extends Component {
  render() {
    return (
      <div className="AppBody">
        <p>
          <a href="https://ark.io/"> ark.io</a>
        </p>
        <p>
          <a href="https://www.reddit.com/r/ArkEcosystem/"> reddit</a>
        </p>
        <p>
          <a href="https://explorer.arkcoin.net/">explorer</a>
        </p>
        <p>
          <a href="https://dexplorer.arkcoin.net/">devnet explorer</a>
        </p>
        <p>
          <a href="https://www.reddit.com/r/ArkEcosystem/wiki/jarunik">delegate proposal jarunik</a>
        </p>
      </div>
    );
  }
}

class AppTicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: []
    }
  }

  componentDidMount() {
    var that = this;
    var url = `https://api.coinmarketcap.com/v1/ticker/Ark/`;
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({
          ticker: data
        });
      });
  }

  render() {
    if (typeof(this.state.ticker[0]) === "undefined") {
      return (
        <div>
          <p> Ark market data
          </p>
          <p> loading
          </p>
        </div>
      );
    }
    return (
      <div>
        <p> Ark market data
        </p>
        <table>
          <tbody>
            <tr>
              <td> Price in BTC
              </td>
              <td>{this.state.ticker[0].price_btc}</td>
            </tr>
            <tr>
              <td> Price in USD
              </td>
              <td>{this.state.ticker[0].price_usd}</td>
            </tr>
            <tr>
              <td> Change 24
              </td>
              <td>{this.state.ticker[0].percent_change_24h}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class AppDelegate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delegate: []
    }
  }

  componentDidMount() {
    var that = this;
    var url = `https://explorer.arkcoin.net/api/delegates/getactive`;
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({
          delegate: data.delegates
        });
      });
  }

  render() {
    if (typeof(this.state.delegate[0]) === "undefined") {
      return (
        <div>
          <p> Ark Delegates
          </p>
          <p> loading
          </p>
        </div>
      );
    }

    //lazy so no key:value but just an array
    const delegates = this.state.delegate.map((delegate) => [delegate.rate, delegate.username, Math.round(delegate.vote / 100000000000)]);

    const delegateItem = delegates.map((delegates) =>
      <tr key={ delegates[1] }>
        <td> { delegates[0] }
        </td>
        <td> { delegates[1] }
        </td>
        <td> { delegates[2] }
        </td>
      </tr>
    );

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th> Rank
              </th>
              <th> Delegate
              </th>
              <th> Vote(k)
              </th>
            </tr>
          </thead>
          <tbody> { delegateItem }
          </tbody>
        </table>
        <AppStandby />
      </div>

    );
  }
}

class AppStandby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delegate: []
    }
  }

  componentDidMount() {
    var that = this;
    var url = `https://explorer.arkcoin.net/api/delegates/getStandby`;
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({
          delegate: data.delegates
        });
      });
  }

  render() {
    if (typeof(this.state.delegate[0]) === "undefined") {
      return (
        <div>
          <p> Ark Standby
          </p>
          <p> loading
          </p>
        </div>
      );
    }

    //lazy so no key:value but just an array
    const delegates = this.state.delegate.map((delegate) => [delegate.rate, delegate.username, Math.round(delegate.vote / 100000000000)]);

    const delegateItem = delegates.map((delegates) =>
      <tr key={ delegates[1] }>
        <td> { delegates[0] }
        </td>
        <td> { delegates[1] }
        </td>
        <td> { delegates[2] }
        </td>
      </tr>
    );

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th> Rank
              </th>
              <th> Standby
              </th>
              <th> Vote(k)
              </th>
            </tr>
          </thead>
          <tbody> { delegateItem }
          </tbody>
        </table>
      </div>
    );
  }
}

class AppRewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reward: []
    }
  }

  componentDidMount() {
    var that = this;
    var url = `https://explorer.arkcoin.net/arkgoserver/voters/rewards/`;
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        console.log(response);
        return response.json();
      })
      .then(function(data) {
        that.setState({
          reward: data
        });
      });
  }

  render() {
    if (typeof(this.state.reward[0]) === "undefined") {
      return (
        <div>
          <p> Rewards
          </p>
          <p> loading
          </p>
        </div>
      );
    }

    //lazy so no key:value but just an array
    const rewards = this.state.reward.map((reward) => [reward.Address, reward.VoteWeight, reward.EarnedAmountXX]);
    console.log(rewards);

    const rewardItem = rewards.map((rewards) =>
      <tr key={ rewards[0] }>
        <td> { rewards[0] }
        </td>
        <td> { rewards[1] }
        </td>
        <td> { rewards[2] }
        </td>
      </tr>
    );

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th> Address
              </th>
              <th> Vote
              </th>
              <th> Earnings
              </th>
            </tr>
          </thead>
          <tbody> { rewardItem }
          </tbody>
        </table>
      </div>

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
