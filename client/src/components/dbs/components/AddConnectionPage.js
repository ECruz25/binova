import React, { Component } from 'react';
import ConnectionForm from './ConnectionForm';

class AddServerPage extends Component {
  addServer(server) {
    //update state
    const servers = { ...this.state.servers };
    //add new fishes
    const timeStamp = Date.now();
    servers[`server-${timeStamp}`] = server;
    //set state
    this.setState({ servers });
  }

  render() {
    return (
      <div>
        <h3>Add Server</h3>
        <ConnectionForm />
      </div>
    );
  }
}

export default AddServerPage;
