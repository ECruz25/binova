import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import LoadingHOC from './HOC/LoadingHOC';

class Graph extends Component {
  render() {
    return (
      <div className="graphs">
        {this.props.type === 'bar' && (
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
            data={this.props.data}
            indexBy={this.props.indexBy}
            keys={this.props.keys}
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
      </div>
    );
  }
}
export default LoadingHOC('data')(Graph);
