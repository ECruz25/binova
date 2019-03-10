import React, { Component } from "react";
import { ResponsiveLine } from "@nivo/line";
import ColumnList from "./ColumnList";
import { Button } from "@material-ui/core";

class LineGraph extends Component {
  state = {
    columns: [],
    selectedColumns: {},
    intColumns: [],
    stringColumns: [],
    data: undefined
  };

  componentDidMount() {
    this.fetchColumns();
  }

  fetchColumns = async () => {
    const response = await fetch("/files");
    const columns = await response.json();

    const stringColumns = columns.filter(d => d.type === "string");
    const intColumns = columns.filter(d => d.type === "int");
    this.setState({ columns, stringColumns, intColumns });
  };

  fetchData = async () => {
    try {
      const { selectedColumns, legend, value } = this.state;
      const response = await fetch("/getGroupedForLineGraph", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ legend, value })
      });
      const data = await response.json();
      this.setState({ data });
    } catch (error) {
      console.log(error);
    }
  };

  handleOnSave = () => {
    this.fetchData();
  };

  componentDidUpdate() {
    setTimeout(() => {
      console.log("actualizando.....");
      this.fetchData();
    }, 5000);
  }

  handleListItemClickLegend = key => {
    this.setState({
      legend: key
    });
  };

  handleUpdate = () => {
    this.fetchData();
  };

  handleListItemClickValue = key => {
    this.setState({
      value: key
    });
  };

  handleListItemClick = columnKey => {
    this.setState({
      selectedColumns: { [columnKey]: true }
    });
  };

  render() {
    const { selectedColumns, data, intColumns, stringColumns } = this.state;

    return (
      <div className="dashboard-item">
        <div className="dashboard-item-columns-selection">
          <ColumnList
            columns={stringColumns}
            selectedColumns={selectedColumns}
            handleListItemClick={this.handleListItemClickLegend}
            label="legend"
          />
          <ColumnList
            columns={intColumns}
            selectedColumns={selectedColumns}
            handleListItemClick={this.handleListItemClickValue}
            label="value"
          />
          <div className="buttons">
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              onClick={this.handleOnSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              onClick={this.handleUpdate}
            >
              Update
            </Button>
          </div>
        </div>
        {data && (
          <ResponsiveLine
            data={[data]}
            margin={{
              top: 50,
              right: 110,
              bottom: 50,
              left: 60
            }}
            xScale={{
              type: "point"
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "prod",
              legendOffset: 36,
              legendPosition: "middle"
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "total",
              legendOffset: -40,
              legendPosition: "middle"
            }}
            yScale={{
              type: "linear",
              stacked: true,
              min: "auto",
              max: "auto"
            }}
            dotSize={10}
            dotColor="inherit:darker(0.3)"
            dotBorderWidth={2}
            dotBorderColor="#ffffff"
            enableDotLabel={true}
            dotLabel="y"
            dotLabelYOffset={-12}
            motionStiffness={90}
            motionDamping={15}
            height={250}
            width={450}
          />
        )}
      </div>
    );
  }
}

export default LineGraph;
