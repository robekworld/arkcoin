import React, { Component } from 'react';

export class AppTicker extends Component {
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
