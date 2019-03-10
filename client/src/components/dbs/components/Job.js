import React from 'react';
import moment from 'moment';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';

const Job = () => {
  return (
    <div className="success col-5 m-1">
      <h3>Name:{this.props.jobInfo.jobName}</h3>
      {Object.keys(this.props.job).map(key2 => (
        <ExpansionPanel
          key={key2}
          className={`card ${
            this.props.job[key2].status === 1 ? 'bg-success' : 'bg-danger'
          }`}
        >
          <ExpansionPanelSummary className="card-header pr-0" key={key2}>
            <div className="container pr-0">
              <div className="row justify-content-between">
                <div className="col col-6">
                  <h5>{this.props.job[key2].stepName}</h5>
                </div>
                <div className="col col-6 p-0 container">
                  <span className="col align-self-end">
                    {moment(this.props.job[key2].runDate, 'YYYYMMDD')
                      .add(this.props.job[key2].runTime, 'milliseconds')
                      .format('YYYY-MM-DD hh:mm:ss')}
                  </span>
                </div>
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="card-body bg-light">
            <p>{this.props.job[key2].message}</p>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

export default Job;
