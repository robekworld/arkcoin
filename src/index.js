import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <App/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
