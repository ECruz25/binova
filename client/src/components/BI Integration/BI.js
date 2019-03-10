import React, { useState, useEffect } from "react";
import PowerbiEmbedded from "react-powerbi";

export default class BI extends React.Component {
  state = {
    embed: {
      reportid: "",
      embedUrl: "",
      embedToken: "",
      pageId: "",
      embedType: ""
    }
  };
  constructor() {
    super();
    this.fetch();
  }
  fetch = async () => {
    try {
      const response = await fetch("/api/bi");
      const embed = await response.json();
      this.setState({ embed });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <PowerbiEmbedded
        id={this.state.embed.reportId}
        embedUrl={this.state.embed.embedUrl}
        accessToken={this.state.embed.embedToken}
        filterPaneEnabled={false}
        navContentPaneEnabled={false}
        pageName={this.state.embed.pageId}
        embedType={this.state.embed.embedType}
        width="600px"
        height="900px"
      />
    );
  }
}
