import React from 'react';
import ReactDOM from 'react-dom';

// First we import some components...
import { Router, Route, Link } from 'react-router'


export default class App extends React.Component {
  render() {
      return (
        <div>
          <h1>App</h1>
          {/* change the <a>s to <Link>s */}
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
          </ul>

          {/*
            next we replace `<Child>` with `this.props.children`
            the router will figure out the children for us
          */}
          {this.props.children}
        </div>
      )
    }
}

export class About extends React.Component {
  render() {
    return (
      <p>Super About page</p>
    )
  }
}

export class Inbox extends React.Component {
  render() {
    return (
      <p>Super Inbox page</p>
    )
  }
}
