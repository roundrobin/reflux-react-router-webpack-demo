//==============================================================================
// External dependencies
//==============================================================================
import React from 'react';
import { RouteHandler, Link } from 'react-router';
import logger from 'bragi-browser';
import FluxComponent from 'flummox/component'

//==============================================================================
// Module definition
//==============================================================================
let HomeView = React.createClass({
  componentDidMount(){
    logger.log("ListView:componentDidMount", "props", this.props);
    logger.log("ListView:componentDidMount", "state", this.state);
  },
  render() {
    return <div className="home-view">
      Home route
    </div>;
  }
});

export default HomeView;
