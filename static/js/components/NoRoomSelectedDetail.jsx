//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import logger from 'bragi-browser';
import { RouteHandler, Link, Navigation } from 'react-router';
import FluxMixin from 'flummox/mixin';
//==============================================================================
// Module definition
//==============================================================================
let NoRoomSelectedDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [Navigation, FluxMixin({
        rooms: store => ({
            activeRooms: store.getActiveRooms()
        })
  })],  

  componentDidMount(){
    logger.log("NoRoomSelectedDetail:componentDidMount", "props", this.props);

  },
  _openRoom: function(){
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
