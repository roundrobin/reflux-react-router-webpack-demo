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
let RoomDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [Navigation, FluxMixin({
        rooms: (store, props) => ({
            room: store.getActiveRoomById(props.params.roomSlug)
        })
  })],
  componentDidMount(){
    logger.log("RoomDetail:componentDidMount", "props", this.props);

  },
  render() {
    var self = this;
    logger.log("RoomDetail:render", "state", this.state);
    var view;
      if(this.state.room){
          view =<div>Openend room: {this.state.room.id}</div>
      }else{
        view="room not found"
        this.transitionTo('/list/popular');

      }
    return (<div className="active-rooms">
          {view}
      </div>);
    }
});


export default RoomDetail;
