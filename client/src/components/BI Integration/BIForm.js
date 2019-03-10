import React, { useState } from "react";
import { FormControl, TextField, FormLabel, Button } from "@material-ui/core";

class BIForm extends React.Component {
  state = {
    reportid: "",
    embedUrl: "",
    embedToken: "",
    pageId: "",
    embedType: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit = async () => {
    const response = await fetch("/bi/create", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });
    if (response.ok) {
      this.props.history.replace("/bi");
    }
  };

  render() {
    return (
      <div style={{ display: "block", textAlign: "center" }}>
        <FormControl
          style={{
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <TextField
            value={this.state.reportId}
            label="reportId"
            onChange={this.handleChange("reportId")}
          />
          <TextField
            value={this.state.embedUrl}
            label="embedUrl"
            onChange={this.handleChange("embedUrl")}
          />
          <TextField
            value={this.state.embedToken}
            label="embedToken"
            onChange={this.handleChange("embedToken")}
          />
          <TextField
            value={this.state.pageId}
            label="pageId"
            onChange={this.handleChange("pageId")}
          />
          <TextField
            value={this.state.embedType}
            label="embedType"
            onChange={this.handleChange("embedType")}
          />
          <Button variant="outlined" color="primary" onClick={this.onSubmit}>
            Save
          </Button>
        </FormControl>
      </div>
    );
  }
}

export default BIForm;
