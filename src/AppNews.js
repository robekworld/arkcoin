import React, { Component } from 'react';
import Linkify from 'react-linkify';

export class AppNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: []
    }
  }

  componentDidMount() {
    var that = this;
    var url = `https://explorer.arkcoin.net/api/getTransactionsByAddress?address=AZHXnQAYajd3XkxwwiL6jnLjtDHjtAATtR&limit=50&offset=0&direction=received`;
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        that.setState({
          news: data
        });
      });
  }

  render() {
    if (typeof(this.state.news.success) === "undefined") {
      return (
        <div>
          <p> News
          </p>
          <p> loading
          </p>
        </div>
      );
    }

    const newsRow = [].concat(this.state.news.transactions)
    .filter((news) => news.vendorField !== undefined && news.amount >= 100000000  )
    .map((news) =>
        <tr key={news.id}>
            <td><Linkify> {news.vendorField}</Linkify> &nbsp;        
            (<a href={"https://explorer.arkcoin.net/tx/"+news.id}>{Number(Math.round(news.amount / 100000000)).toLocaleString('en')}</a>)
            </td>               
        </tr>
    );

    return (
      <div>
        <p>
          Send 1 Ark with vendorfield to <br/>
          AZHXnQAYajd3XkxwwiL6jnLjtDHjtAATtR   
        </p> 
        <table>
          <thead>
            <tr>
              <th>News (Donation)
              </th>        
            </tr>
          </thead>
          <tbody>
            {newsRow}
          </tbody>
        </table>
      </div>

    );
  }
}