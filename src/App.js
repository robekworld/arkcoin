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
          <p><a href="https://ark.io/">ark.io</a></p>
          <p><a href="https://www.reddit.com/r/ArkEcosystem/">reddit</a></p>
          <p><a href="https://explorer.arkcoin.net/">explorer</a></p>
          <p><a href="https://dexplorer.arkcoin.net/">devnet explorer</a></p>
          <p><a href="https://www.reddit.com/r/ArkEcosystem/wiki/jarunik">jarunik</a></p>
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
          that.setState({ ticker : data});
        });
    }

    render() {
        if (typeof(this.state.ticker[0]) === "undefined") {
          return (
            <div>
              <p>Ark market data</p>
              <p>loading</p>
            </div>
          );
        }
        return (
            <div>
            <p>Ark market data</p>
            <table>
                <tr>
                <td>Price in BTC </td><td>{this.state.ticker[0].price_btc}</td>
                </tr>
                <tr>
                <td>Price in USD </td><td>{this.state.ticker[0].price_usd}</td>
                </tr>
                <tr>
                <td>Change 24h </td><td>{this.state.ticker[0].percent_change_24h}%</td>
                </tr>
                </table>
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
        <AppTicker/>
      </div>
    );
  }
}

export default App;
