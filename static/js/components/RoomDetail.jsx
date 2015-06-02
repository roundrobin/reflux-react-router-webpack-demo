//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import logger from 'bragi-browser';
import { RouteHandler, Link, Navigation } from 'react-router';

//==============================================================================
// Internal dependencies
//==============================================================================
import ActiveRoomsStore from '../stores/ActiveRoomsStore.js';
import ActionCreators from '../actions/ActionCreators.js';

//==============================================================================
// Module definition
//==============================================================================
let RoomDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [Navigation, Reflux.connectFilter(ActiveRoomsStore, "room", function(rooms) {
    logger.log("RoomDetail:connectFilter", "props", this.props, rooms);
    var roomId = Object.keys(rooms).filter(function(roomId) {
      return String(rooms[roomId].id) === String(this.props.params.roomSlug);
    }.bind(this))[0];


    logger.log("RoomDetail:connectFilter", "Found a rooms for this URL param:", rooms[roomId]);

    return rooms[roomId];
  })],
  componentDidMount(){
    logger.log("RoomDetail:componentDidMount", "props", this.props);

  },
  render() {
    var self = this;
    logger.log("RoomDetail:render", "state", this.state);
    var view;
      if(this.state.room){
          logger.log("RoomDetail:render", "Found a room");
          view =<div>Openend room: {this.state.room.id}</div>
      }else{
        logger.log("RoomDetail:render", "Not found the room");
        view="room not found"
        this.transitionTo('/list/popular');

      }
    return (<div className="active-rooms">
          {view}
      </div>);
    }
});


export default RoomDetail;
