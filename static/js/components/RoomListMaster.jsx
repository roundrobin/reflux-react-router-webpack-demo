//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import {
    RouteHandler, Link, Navigation
}
from 'react-router';
import logger from 'bragi-browser';
import classNames from 'classnames';
//==============================================================================
// Internal dependencies
//==============================================================================
import RoomsStore from '../stores/RoomsStore.js';
import RoomActionCreators from '../actions/ActionCreator.js';
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
    componentDidMount() {
        logger.log("RoomListMaster:componentDidMount", "props", this.props);
    },
    _clickAddRoomsBtn: function() {
        logger.log("RoomListMaster:_clickAddRoomsBtn", "called");
        let id = Math.floor(Math.random() * 1000);
        let newRoom = {
            title: "room-" + id,
            id: id
        };
        RoomActionCreators.addRoom(newRoom);
    },
    _openRoom: function(room) {
        //Reponds to a click event on a room list item!
        logger.log("RoomListMaster:_openRoom", "called...", room);
        RoomActionCreators.openRoom(room);
        this.transitionTo('/room/' + room.id);
    },
    render() {
        let self = this;
        logger.log("RoomListMaster:render", "state", this.state);
        //Create list of rooms
        let roomKeys = Object.keys(this.state.rooms);
        logger.log("RoomListMaster:render", "roomKeys", roomKeys);
        let roomsList = roomKeys.map(function(roomId, i) {
            let room = self.state.rooms[roomId];
            let classNameString = classNames("room-list__item", {
                "room-list__item--is-member": room.isMember,
                "room-list__item--active": room.isActive
            });
            return (<div className={classNameString} 
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
