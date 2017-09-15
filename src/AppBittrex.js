import React, { Component } from 'react';

export class AppBittrex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payments: []
    }
  }

  componentDidMount() {
    var that = this;
    var url = 'https://explorer.arkcoin.net/api/getTransactionsByAddress?address=AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK&limit=50&offset=0';
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({
          payments: data
        });
      });
  }

  render() {
    const bittrex = "AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK";

    if (typeof(this.state.payments.success) === "undefined") {
      return (
        <div>
          <p> Payments
          </p>
          <p> loading
          </p>
        </div>
      );
    }

    const paymentRow = this.state.payments.transactions.map((payment) =>
      <tr key={ payment.id }>
        <td> { payment.senderId == bittrex ?
            <a href={"https://explorer.arkcoin.net/address/"+payment.recipientId}> {payment.recipientId}</a>
            :
            <a href={"https://explorer.arkcoin.net/address/"+payment.senderId}> {payment.senderId}</a>
            }
        </td>
        <td> 
        {payment.amount / 100000000 > 1000 ?
            <b>
                {payment.senderId == bittrex ?
                    <font color='green'> {Number(-Math.round(payment.amount / 100000000)).toLocaleString('en')} </font>
                    :
                    <font color='red'> {Number(Math.round(payment.amount / 100000000)).toLocaleString('en')} </font>
                }
            </b>  
            :
            <div>
                {payment.senderId == bittrex ?
                    <font color='green'> {Number (-Math.round(payment.amount / 100000000)).toLocaleString('en')} </font>
                    :
                    <font color='red'> {Number(Math.round(payment.amount / 100000000)).toLocaleString('en')} </font>
                }
            </div>                  
        }         

        </td>
      </tr>
    );

    return (
      <div>
        <p>
        <a href={"https://explorer.arkcoin.net/address/"+bittrex}> {bittrex}</a>
        </p>          
        <table>
          <thead>
            <tr>
              <th> Address
              </th>
              <th> Amount
              </th>
            </tr>
          </thead>
          <tbody>{ paymentRow }</tbody>
        </table>
      </div>
    );
  }
}
