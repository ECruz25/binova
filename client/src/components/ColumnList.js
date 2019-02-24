import React, { Component } from 'react';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';

class Dashboard extends Component {
  handleListItemClick = (event, columnKey) => {
    const { handleListItemClick } = this.props;
    handleListItemClick(columnKey);
  };

  handleOnSave = () => {
    const { handleOnSave } = this.props;
    handleOnSave();
  };

  render() {
    const { columns, selectedColumns } = this.props;
    return (
      <div>
        <List className="columns">
          {columns.map(column => (
            <ListItem
              key={column.key}
              className="x"
              selected={selectedColumns[column.key]}
              onClick={event => this.handleListItemClick(event, column.key)}
              button
            >
              <ListItemText primary={column.columnName} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          onClick={this.handleOnSave}
        >
          Save
        </Button>
      </div>
    );
  }
}

export default Dashboard;
