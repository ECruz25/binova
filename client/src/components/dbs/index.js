import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import App from './components/App';
import AddConnectionPage from './components/AddConnectionPage';
import NotFound from './components/NotFound';
import registerServiceWorker from './registerServiceWorker';
import LoginPage from './components/LoginPage';
import ConnectionList from './components/ConnectionList';
import Header from './components/Header';
import JobsList from './components/JobsList';

const Root = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={App} exact={true} />
          <Route
            path="/connections/addConnection"
            component={AddConnectionPage}
          />
          <Route
            path="/connections/getConnections"
            exact={true}
            component={ConnectionList}
          />
          <Route path="/login" component={LoginPage} />
          <Route
            path="/connections/getConnections/:id/jobs"
            component={JobsList}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
