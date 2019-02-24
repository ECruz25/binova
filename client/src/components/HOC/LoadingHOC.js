import React, { PureComponent } from 'react';
import './LoadingHOC.css';

const isEmpty = prop =>
  prop === null ||
  prop === undefined ||
  (prop.constructor === Object && Object.keys(prop).length === 0);

const LoadingHOC = loadingProp => WrappedComponent =>
  class LoadingHOC2 extends PureComponent {
    render() {
      return isEmpty(this.props[loadingProp]) ? (
        <div className="loader" />
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };

export default LoadingHOC;
