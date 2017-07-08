import React, { Component } from 'react';

export class AppLinks extends Component {
  render() {
    return (
      <div className="AppBody">
        <p>
          <a href="https://ark.io/"> ark.io</a>
        </p>
        <p>
          <a href="https://www.reddit.com/r/ArkEcosystem/"> /r/ArkEcosystem</a>
        </p>
        <p>
          <a href="https://www.reddit.com/r/ArkDelegates/"> /r/ArkDelegates</a>
        </p>
        <p>
          <a href="https://explorer.arkcoin.net/">explorer</a>
        </p>
        <p>
          <a href="https://dexplorer.arkcoin.net/">devnet explorer</a>
        </p>
        <p>
          <a href="https://www.reddit.com/r/ArkDelegates/wiki/jarunik">delegate proposal jarunik</a>
        </p>
      </div>
    );
  }
}
