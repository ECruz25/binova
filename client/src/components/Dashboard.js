import React, { Component } from 'react';
import ColumnList from './ColumnList';
import Graph from './Graph';
import BarGraph from './BarGraph';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';

class Dashboard extends Component {
  state = {
    displays: [],
    selectedNewGraph: ''
  };
  componentDidMount() {
    // this.fetchColumns();
  }

  handleOnCreate = () => {
    // this.fetchData();
    const graphs = this.state.displays.slice(0);
    graphs.push(this.state.selectedNewGraph);
    this.setState({ displays: graphs, selectedNewGraph: '' });
  };

  handleListItemClick = (event, graph) => {
    this.setState({
      selectedNewGraph: graph
    });
  };
  render() {
    const { displays, selectedNewGraph } = this.state;
    const typeOfGraphs = ['Bar', 'Total'];
    return (
      <div>
        {displays.map(display => (display === 'Bar' ? <BarGraph /> : null))}
        <List className="columns">
          {typeOfGraphs.map(graph => (
            <ListItem
              key={graph}
              className="x"
              selected={selectedNewGraph === graph}
              onClick={event => this.handleListItemClick(event, graph)}
              button
            >
              <ListItemText primary={graph} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          onClick={this.handleOnCreate}
        >
          Save
        </Button>
      </div>
    );
  }
}

export default Dashboard;
