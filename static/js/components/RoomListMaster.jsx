//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import { RouteHandler, Link, Navigation } from 'react-router';
import logger from 'bragi-browser';
import {FluxComponent} from 'flummox/component'
import FluxMixin from 'flummox/mixin';

//==============================================================================
// External dependencies
//==============================================================================
//==============================================================================
// Configs
//==============================================================================
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

//==============================================================================
// Module definition
//==============================================================================
let RoomListMaster = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [Navigation, FluxMixin({
        rooms: store => ({
            rooms: store.getRooms()
        })
  })],
  componentDidMount(){
    logger.log("RoomListMaster:componentDidMount", "props", this.props);

  },
  _clickButton: function(){
    logger.log("RoomListMaster:_clickButton", "called");    

    var id = Math.floor(Math.random()*1000);
    this.props.flux.getActions('rooms').addRandomRoom({
      title: "room-"+id,
      id: id
    });  

  },
  _openRoom: function(room){
    //Reponds to a click event on a room list item!
    logger.log("RoomListMasterTest:render", "called...", room); 
    this.props.flux.getActions('rooms').openRoom(room);  
    this.transitionTo('/room/'+room.id);
  },   
  render() {
    var self = this;
    logger.log("RoomListMaster:render", "state", this.state);

    //Create list of rooms
    var roomKeys = Object.keys(this.state.rooms);
    var roomsList = roomKeys.map(function(roomId, i){
      var room = self.state.rooms[roomId];
      return (<div className={"room-list__item"} 
                  key={i} 
                  title="open chat room"
                  onClick={self._openRoom.bind(null, room)}>
                  {room.title}
              </div>);
    });
    //Render the Markup of this component
    return (<div className="list-view">
         <div className={"room-list"}>
          <button className={"btn"} onClick={this._clickButton}>Add random chat room</button>
          <br/>
          <br/>
          <div className={"room-list-wrapper"}>          
            <ReactCSSTransitionGroup transitionName="room" className="animated-list">
              {roomsList}
            </ReactCSSTransitionGroup>
          </div>
        </div>

        <RouteHandler/>
      </div>);
    }
});


export default RoomListMaster;
