import React, { Component } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  TextField,
  CardActionArea
} from "@material-ui/core";
import ColumnList from "./ColumnList";

class KpiViewer extends Component {
  state = {
    columns: [],
    selectedColumns: {},
    data: { title: "", value: "" }
  };

  componentDidMount() {
    this.fetchColumns();
  }

  fetchColumns = async () => {
    const response = await fetch("/files");
    const columns = await response.json();
    const filteredColumns = columns.filter(a => a.type === "int");
    this.setState({ columns: filteredColumns });
  };

  handleOnSave = () => {
    this.fetchData();
  };

  handleListItemClick = columnKey => {
    this.setState({
      selectedColumns: { [columnKey]: true }
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  fetchData = async () => {
    try {
      const { selectedColumns } = this.state;
      const response = await fetch("/getTotal", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(selectedColumns)
      });
      const data = await response.json();
      this.setState({ data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { columns, selectedColumns, data } = this.state;

    return (
      <div className="dashboard-item">
        <div className="dashboard-item-columns-selection">
          <ColumnList
            columns={columns}
            selectedColumns={selectedColumns}
            handleListItemClick={this.handleListItemClick}
          />
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={this.handleOnSave}
          >
            Save
          </Button>
        </div>
        <Card
          style={{
            maxWidth: 200,
            maxHeight: 200
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              <TextField
                value={this.state.name}
                onChange={this.handleChange("name")}
              />
            </Typography>
            <Typography component="h4">
              {data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </CardContent>
          <CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => this.props.returnGraph(undefined)}
              >
                Cancel
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default KpiViewer;
