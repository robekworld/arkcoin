import React, { Component } from 'react';

export class AppPaymentVoter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    }
  }

  componentDidMount() {
    var that = this;
    var paymentVoter = that.props.match.params.id;
    var url = 'https://arkgo.arkcoin.net/delegate/paymentruns/details?address='+paymentVoter;
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(info) {
        that.setState({
          history: info
        });
      });
  }

  render() {
    if (typeof(this.state.history.count) === "undefined") {
      return (
        <div>
          <p> History
          </p>
          <p> loading
          </p>
        </div>
      );
    }

    //lazy so no key:value but just an array
    const payments = this.state.history.data.map((history) => [history.Pk, history.CreatedAt, Number((history.VoteWeight).toFixed(1)), Number((history.EarnedAmountXX).toFixed(6)), history.Transaction.id]);

    const paymentItem = payments.map((payments) =>
      <tr key={ payments[0] }>
        <td> { payments[1].substring(0,10) }
        </td>
        <td> { payments[2] }
        </td>
        <td> { payments[3] }
        </td>
        <td> <a href={"https://explorer.arkcoin.net/tx/"+payments[4]}> {payments[4].substring(0,6)+"..."} </a>
        </td>
      </tr>
    );

    return (
      <div>
        <p>
        {this.props.match.params.id}
        </p>
        <table>
          <thead>
            <tr>
              <th> Date
              </th>
              <th> Votes
              </th>
              <th> Paid
              </th>
              <th> Explorer
              </th>
            </tr>
          </thead>
          <tbody>{ paymentItem }</tbody>
        </table>
      </div>
    );
  }
}
