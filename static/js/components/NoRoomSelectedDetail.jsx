/*
 *
 * `NoRoomSelectedDetail.jsx` 
 *
 * Renders a default view if no chat room is selected yet!
 *
 * Usage:
 * ```
 *     <NoRoomSelectedDetail/>
 * ```
 */
//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import logger from 'bragi-browser';
import { RouteHandler, Link, Navigation } from 'react-router';

//==============================================================================
// Module definition
//==============================================================================
let NoRoomSelectedDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount(){
    logger.log("NoRoomSelectedDetail:componentDidMount", "props", this.props);

  },
  _openRoom(){
    logger.log("", '↪ Called');
      
  },
 
  render() {
    var self = this;
    logger.log("NoRoomSelectedDetail:render", "state", this.state);
    return (<div className={"active-rooms"}>
          No chat rooms selected!
        </div>);
    }
});


export default NoRoomSelectedDetail;
