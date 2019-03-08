import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

class KpiViewer extends Component {
  componentDidMount() {
    this.fetchColumns();
  }
  fetchColumns = async () => {
    const response = await fetch('/files');
    const columns = await response.json();
    debugger;
    this.setState({ columns });
  };

  render() {
    return (
      <div>
        <Card
          style={{
            maxWidth: 200,
            maxHeight: 200
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              Titulo
            </Typography>
            <Typography component="p">Datos</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default KpiViewer;
