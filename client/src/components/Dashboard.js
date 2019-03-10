import React, { Component } from "react";
import ColumnList from "./ColumnList";
import Graph from "./Graph";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import {
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Button,
  TextField
} from "@material-ui/core";
import KpiViewer from "./KpiViewer";

class Dashboard extends Component {
  state = {
    displays: [],
    selectedNewGraph: ""
  };
  componentDidMount() {}

  handleOnCreate = () => {
    const graphs = this.state.displays.slice(0);
    graphs.push(this.state.selectedNewGraph);
    this.setState({ displays: graphs, selectedNewGraph: "" });
  };

  handleListItemClick = ev => {
    this.setState({ selectedNewGraph: ev.target.value });
  };

  returnGraph = display => {
    switch (display) {
      case "Bar":
        return <BarGraph returnGraph={this.returnGraph} />;
      case "KPI":
        return <KpiViewer returnGraph={this.returnGraph} />;
      case "Line":
        return <LineGraph returnGraph={this.returnGraph} />;
      case "Pie":
        return <PieGraph returnGraph={this.returnGraph} />;
      default:
        return null;
    }
  };

  render() {
    const { displays, selectedNewGraph } = this.state;
    const typeOfGraphs = ["Bar", "KPI", "Line", "Pie"];
    return (
      <div className="dashboard">
        <div className="graphs">
          {displays.map(display => this.returnGraph(display))}
        </div>
        <div className="dashboard-graph-selection">
          <TextField
            id="outlined-select-currency"
            select
            label={"Graph"}
            value={selectedNewGraph}
            onChange={this.handleListItemClick}
            margin="normal"
            variant="outlined"
          >
            {typeOfGraphs.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={this.handleOnCreate}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
