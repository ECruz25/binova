import React, { Component } from "react";

class UserForm extends Component {
  onSubmit = e => {
    e.preventDefault();
    fetch("/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        form: this.state
      })
    }).catch(err => {
      console.log(err);
    });
    console.log("information sent");
  };

  onUserNameChange = e => {
    const username = e.target.value;
    this.setState(() => ({
      username
    }));
    console.log(this.state);
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({
      password
    }));
    console.log(this.state);
  };

  render() {
    return (
      <div className="UserForm">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="username">username</label>
          <input
            type="text"
            className="username"
            name="username"
            onChange={this.onUserNameChange}
          />
          <label htmlFor="password">password</label>
          <input
            label="Password"
            type="password"
            className="password"
            name="password"
            onChange={this.onPasswordChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default UserForm;
