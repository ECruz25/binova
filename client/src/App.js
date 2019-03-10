import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import UploadData from "./components/UploadData";
import Dashboard from "./components/Dashboard";
import BIForm from "./components/BI Integration/BIForm";
import BI from "./components/BI Integration/BI";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <header className="App-header">
              <Route path="/" component={Dashboard} exact />
              <Route path="/upload" component={UploadData} exact />
              <Route path="/bi/" component={BI} exact />
              <Route path="/bi/newEmbed" component={BIForm} exact />
            </header>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
