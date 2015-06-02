//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import { RouteHandler, Link, Navigation } from 'react-router';
import logger from 'bragi-browser';
//==============================================================================
// Internal dependencies
//==============================================================================
import RoomsStore from '../stores/RoomsStore.js';
import ActiveRoomsStore from '../stores/ActiveRoomsStore.js';
import ActionCreators from '../actions/ActionCreators.js';
//==============================================================================
// Configs
//==============================================================================
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

//==============================================================================
// Module definition
//==============================================================================
let RoomListMaster = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [
    Navigation,
    Reflux.connect(RoomsStore, 'rooms')
  ],
  componentDidMount(){
    logger.log("RoomListMaster:componentDidMount", "props", this.props);

  },
  _clickAddRoomsBtn: function(){
    logger.log("RoomListMaster:_clickAddRoomsBtn", "called");    

    let id = Math.floor(Math.random()*1000);
    let newRoom = {
      title: "room-"+id,
      id: id
    };

    ActionCreators.onAddRoom(newRoom);
    

  },
  _openRoom: function(room){
    //Reponds to a click event on a room list item!
    logger.log("RoomListMasterTest:render", "called...", room); 
    
    ActionCreators.onOpenRoom(room);

    this.transitionTo('/room/'+room.id);
  },   
  render() {
    let self = this;
    logger.log("RoomListMaster:render", "state", this.state);

    //Create list of rooms
    let roomKeys = Object.keys(this.state.rooms);
    let roomsList = roomKeys.map(function(roomId, i){
      let room = self.state.rooms[roomId];
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
          <button className={"btn"} onClick={this._clickAddRoomsBtn}>Add random chat room</button>
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
