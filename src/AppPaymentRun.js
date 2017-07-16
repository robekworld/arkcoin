import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class AppPaymentRun extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    }
  }

  componentDidMount() {
    var that = this;
    var paymentRunId = that.props.match.params.id;
    var url = 'https://arkgo.arkcoin.net/delegate/paymentruns/details?parentid='+paymentRunId;
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
    const payments = this.state.history.data.map((history) => [history.Address, Number((history.VoteWeight).toFixed(1)), Number((history.EarnedAmountXX).toFixed(6))]);

    const paymentItem = payments.map((payments) =>
      <tr key={ payments[0] }>
        <td> <Link to={'/paymentvoter/'+payments[0]}> { payments[0] } </Link>
        </td>
        <td> { payments[1] }
        </td>
        <td> { payments[2] }
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
              <th> Paid
              </th>
            </tr>
          </thead>
          <tbody>{ paymentItem }</tbody>
        </table>
      </div>
    );
  }
}
