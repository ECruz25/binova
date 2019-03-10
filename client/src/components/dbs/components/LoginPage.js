import React, { Component } from 'react';

import UserForm from './UserForm';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <h3>Add Server</h3>
        <UserForm />
      </div>
    );
  }
}

export default LoginPage;
