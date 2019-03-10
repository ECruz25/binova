import React, { Component } from 'react';
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      servers: {},
      users: {}
    };
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1>App</h1>
      </div>
    );
  }
}

export default App;
