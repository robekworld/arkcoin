import React, { Component } from 'react';

export class AppDelegate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delegates: []
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
          delegates: data.delegates
        });
      });
  }

  render() {
    if (typeof(this.state.delegates[0]) === "undefined") {
      return (
        <div>
          <p> Ark Delegates
          </p>
          <p> loading
          </p>
        </div>
      );
    }

    const delegateRow = this.state.delegates.map((delegate) =>
      <tr key={ delegate.username }>
        <td>{ delegate.rate }
        </td>
        <td>{ delegate.username === 'jarunik' ? <b> { delegate.username } </b> : delegate.username }
        </td>
        <td>{ Math.round(delegate.vote / 100000000000) }
        </td>
      </tr>
    );

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Rank
              </th>
              <th>Delegate
              </th>
              <th>Vote(k)
              </th>
            </tr>
          </thead>
          <tbody>{delegateRow}
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
          <tbody>{ delegateItem }
          </tbody>
        </table>
      </div>
    );
  }
}
