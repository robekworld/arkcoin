import React, { Component } from 'react';

export class AppRewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reward: []
    }
  }

  componentDidMount() {
    var that = this;
    var url = 'https://arkgo.arkcoin.net/voters/rewards';
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
    const rewards = this.state.reward.map((reward) => [reward.Address, Number((reward.VoteWeight).toFixed(1)), Number((reward.EarnedAmountXX).toFixed(6))]);
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
              <th> Votes
              </th>
              <th> Unpaid
              </th>
            </tr>
          </thead>
          <tbody>{ rewardItem }</tbody>
        </table>
      </div>
    );
  }
}
