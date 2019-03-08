import React, { Component } from 'react';
import ColumnList from './ColumnList';
import Graph from './Graph';
import BarGraph from './BarGraph';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import KpiViewer from './KpiViewer';

class Dashboard extends Component {
  state = {
    displays: [],
    selectedNewGraph: ''
  };
  componentDidMount() {}

  handleOnCreate = () => {
    const graphs = this.state.displays.slice(0);
    graphs.push(this.state.selectedNewGraph);
    this.setState({ displays: graphs, selectedNewGraph: '' });
  };

  handleListItemClick = (event, graph) => {
    this.setState({
      selectedNewGraph: graph
    });
  };

  returnGraph = display => {
    switch (display) {
      case 'Bar':
        return <BarGraph />;
      case 'KPI':
        return <KpiViewer />;
      default:
        return null;
    }
  };

  render() {
    const { displays, selectedNewGraph } = this.state;
    const typeOfGraphs = ['Bar', 'KPI'];
    return (
      <div>
        {displays.map(display => this.returnGraph(display))}
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
