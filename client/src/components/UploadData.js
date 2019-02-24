import React, { Component } from 'react';

class UploadData extends Component {
  state = {
    selectedFile: null,
    loaded: 0
  };

  handleSelectedFile = event => {
    console.log(event.target.files);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  handleUpload = async () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile, this.state.selectedFile.name);
    console.log(data, this.state.selectedFile);
    console.log('enviando datos', this.state.selectedFile);
    try {
      const response = await fetch('/uploadData', {
        method: 'POST',
        body: data
      });
      const dataResponse = await response.json();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <input
          type="file"
          name="data"
          id="data"
          onChange={this.handleSelectedFile}
        />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
      </div>
    );
  }
}

export default UploadData;
