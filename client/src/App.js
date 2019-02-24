import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import UploadData from './components/UploadData';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <header className="App-header">
              <Route path="/" component={Dashboard} exact />
              <Route path="/upload" component={UploadData} />
            </header>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
