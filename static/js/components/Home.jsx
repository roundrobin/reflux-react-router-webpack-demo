/*
 *
 * `Home.jsx` 
 *
 * Renders the `Home` component.
 *
 * Usage:
 * ```
 *    <Home/>
 * ```
 */
//==============================================================================
// External dependencies
//==============================================================================
import React from 'react';
import { RouteHandler, Link } from 'react-router';
import logger from 'bragi-browser';
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
      <h1>Home route</h1>
      <p>Click on <i>Popular Rooms</i> in the nav bar.</p>
    </div>;
  }
});

export default HomeView;
