import React, { Component } from 'react';
import Job from './Job.jsx';

class JobsList extends Component {
  state = {
    newJobs: {},
    jobsInfo: {},
  };

  componentDidMount() {
    fetch(`/connection/getConnections/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(jobs => {
        const tempJobs = {};
        const jobsInfo = {};
        jobs.map(job => {
          const jobId = job.jobId;
          tempJobs[jobId] = {};
          jobsInfo[jobId] = { jobName: job.jobName };
          return 0;
        });
        jobs.map(job => {
          const jobId = job.jobId;
          const instanceId = job.instanceId;
          tempJobs[jobId][instanceId] = { ...job };
          return 0;
        });
        Object.keys(tempJobs).map(key => {
          Object.keys(tempJobs[key]).sort((a, b) => {
            const job1 = tempJobs[key][a].runDate;
            const job2 = tempJobs[key][b].runDate;
            return job1 - job2;
          });
          return 0;
        });
        this.setState({ jobsInfo, newJobs: tempJobs });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="jobslist mb-3">
        <h1> Jobs </h1>
        <div className="row justify-content-around">
          {Object.keys(this.state.newJobs).map(key => (
            <Job
              key={key}
              job={this.state.newJobs[key]}
              jobInfo={this.state.jobsInfo[key]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JobsList;
