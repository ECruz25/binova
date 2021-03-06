import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import ColumnList from "./ColumnList";
import { Button } from "@material-ui/core";

class BarGraph extends Component {
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
      debugger;
      const response = await fetch("/getGroupedForBarGraph", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ legend, value })
      });
      const jsonresponse = await response.json();
      const data = Object.keys(jsonresponse).map(c => ({
        tal: c,
        [c]: jsonresponse[c]
      }));
      debugger;

      const keys = Object.keys(jsonresponse);
      console.log(data);
      this.setState({ data, keys });
    } catch (error) {
      console.log(error);
    }
  };

  handleOnSave = () => {
    this.fetchData();
  };

  handleUpdate = () => {
    this.fetchData();
  };

  componentDidUpdate() {
    setTimeout(() => {
      console.log("actualizando.....");
      this.fetchData();
    }, 5000);
  }

  handleListItemClick = columnKey => {
    this.setState({
      selectedColumns: { [columnKey]: true }
    });
  };

  handleListItemClickLegend = key => {
    this.setState({
      legend: key
    });
  };

  handleListItemClickValue = key => {
    this.setState({
      value: key
    });
  };

  render() {
    const {
      selectedColumns,
      data,
      intColumns,
      stringColumns,
      keys
    } = this.state;

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
          <ResponsiveBar
            width={450}
            height={250}
            margin={{
              top: 60,
              right: 120,
              bottom: 60,
              left: 80
            }}
            colors="accent"
            data={data}
            indexBy="tal"
            keys={keys}
            labelTextColor="inherit:darker(1.4)"
            labelSkipWidth={16}
            labelSkipHeight={16}
            groupMode="stacked"
            colorBy="index"
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        )}
      </div>
    );
  }
}

export default BarGraph;
