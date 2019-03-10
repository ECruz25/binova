import React, { Component } from "react";
import { Link } from "react-router-dom";

class ConnectionList extends Component {
  constructor() {
    super();
    this.state = {
      connections: []
    };
  }

  componentDidMount() {
    fetch("/connection/getConnections")
      .then(res => res.json())
      .then(connections => {
        console.log(connections);
        this.setState({ connections });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="ConnectionList list-group">
        <h1>connections</h1>
        {this.state.connections.map(connection => (
          <div key={connection._id} className="list-group-item">
            <Link
              className="list-group-item list-group-item-action"
              to={`/connections/getConnections/${connection._id}/jobs`}
            >
              <h2>{connection.connectionName}</h2>
              <p>{connection.client}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default ConnectionList;
