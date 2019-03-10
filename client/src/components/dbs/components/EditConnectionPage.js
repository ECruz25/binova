import React, { Component } from "react";
import JobsList from "./JobsList";

class EditConnectionPage extends Component {
  componentDidMount() {
    fetch(`/connection/getConnections/${this.props.match.params.id}`)
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
      <div>
        <h3>Jobs</h3>
        <JobsList />
      </div>
    );
  }
}

export default EditConnectionPage;
