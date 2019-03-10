import React, { Component } from 'react';

class ConnectionCard extends Component {
  render() {
    return (
      <div className="ConnectionCard">
        <h3 className="ConnectionName">
          {this.props.connection.connectionName}
        </h3>
        <p>{this.props.connection.client}</p>
        <p>{this.props.connection.database}</p>
      </div>
    );
  }
}

export default ConnectionCard;
