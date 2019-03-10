import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  MenuItem
} from "@material-ui/core";

class Dashboard extends Component {
  state = {
    col: ""
  };
  handleListItemClick = ev => {
    const { handleListItemClick } = this.props;
    this.setState({ col: ev.target.value });
    handleListItemClick(ev.target.value);
  };

  handleOnSave = () => {
    const { handleOnSave } = this.props;
    handleOnSave();
  };

  handleOnRemove = () => {
    const { handleOnRemove } = this.props;
  };

  render() {
    const { columns, label } = this.props;
    return (
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label={label}
          style={{ width: "150px" }}
          value={this.state.col}
          onChange={this.handleListItemClick}
          margin="normal"
          variant="outlined"
        >
          {columns.map(option => (
            <MenuItem key={option.key} value={option.key}>
              {option.columnName}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default Dashboard;
