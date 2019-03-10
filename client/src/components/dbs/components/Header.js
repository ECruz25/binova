import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
    <NavLink
      to="/"
      className="navbar-brand"
      activeClassName="active"
      exact={true}
    >
      Home
    </NavLink>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" activeClassName="active">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/connections/addConnection"
            className="nav-link"
            activeClassName="active"
          >
            Create Connection
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/connections/getConnections"
            className="nav-link"
            activeClassName="active"
          >
            View Connections
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/help" className="nav-link" activeClassName="active">
            Help
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
