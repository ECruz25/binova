import React, { Component } from "react";
import { ResponsivePie } from "@nivo/pie";
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

  handleUpdate = () => {
    console.log("actualizando");
    this.fetchData();
  };

  componentDidUpdate() {
    setTimeout(() => {
      console.log("actualizando.....");
      this.fetchData();
    }, 5000);
  }

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
        id: c,
        label: c,
        value: jsonresponse[c]
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
          <ResponsivePie
            data={data}
            margin={{
              top: 40,
              right: 80,
              bottom: 80,
              left: 80
            }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors="nivo"
            colorBy="id"
            height={250}
            width={450}
            borderWidth={1}
            borderColor="inherit:darker(0.2)"
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor="inherit"
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            fill={[
              {
                match: {
                  id: "ruby"
                },
                id: "dots"
              },
              {
                match: {
                  id: "c"
                },
                id: "dots"
              },
              {
                match: {
                  id: "go"
                },
                id: "dots"
              },
              {
                match: {
                  id: "python"
                },
                id: "dots"
              },
              {
                match: {
                  id: "scala"
                },
                id: "lines"
              },
              {
                match: {
                  id: "lisp"
                },
                id: "lines"
              },
              {
                match: {
                  id: "elixir"
                },
                id: "lines"
              },
              {
                match: {
                  id: "javascript"
                },
                id: "lines"
              }
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000"
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
