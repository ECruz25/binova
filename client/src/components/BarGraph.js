import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import ColumnList from './ColumnList';

class BarGraph extends Component {
  state = {
    columns: [],
    selectedColumns: {},
    data: undefined
  };
  componentDidMount() {
    this.fetchColumns();
  }
  fetchColumns = async () => {
    const response = await fetch('/files');
    const columns = await response.json();
    this.setState({ columns });
  };

  fetchData = async () => {
    try {
      const { selectedColumns } = this.state;
      const response = await fetch('/getAmount', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(selectedColumns)
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

  handleListItemClick = columnKey => {
    this.setState({
      selectedColumns: { [columnKey]: true }
    });
  };
  render() {
    const { columns, selectedColumns, data } = this.state;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '80% 20%' }}>
        {data && (
          <ResponsiveBar
            width={900}
            height={500}
            margin={{
              top: 60,
              right: 120,
              bottom: 60,
              left: 80
            }}
            colors="accent"
            data={data.data1}
            indexBy={data.indexBy}
            keys={data.keys1}
            padding={0.2}
            labelTextColor="inherit:darker(1.4)"
            labelSkipWidth={16}
            labelSkipHeight={16}
            groupMode="grouped"
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        )}
        <ColumnList
          columns={columns}
          selectedColumns={selectedColumns}
          handleListItemClick={this.handleListItemClick}
          handleOnSave={this.handleOnSave}
        />
      </div>
    );
  }
}

export default BarGraph;
