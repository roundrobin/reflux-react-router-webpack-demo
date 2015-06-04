//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import logger from 'bragi-browser';
import { RouteHandler, Link, Navigation } from 'react-router';
import classNames from 'classnames';

//==============================================================================
// Internal dependencies
//==============================================================================
import ActionCreators from '../actions/ActionCreator.js';
import RoomsStore from '../stores/RoomsStore.js';
import MembersList from './MembersList.jsx';
import ChatWindow from './ChatWindow.jsx';
//==============================================================================
// Configs
//==============================================================================
let PureRenderMixin = React.addons.PureRenderMixin;
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
//==============================================================================
// Module definition
//==============================================================================
let RoomList = React.createClass({
  mixins: [PureRenderMixin],
  render() {
    logger.log("RoomList:render", "called...");
    let self = this;
    let roomKeys = Object.keys(this.props.rooms);

    let roomsList = roomKeys.map(function(roomId, i) {
            let room = self.props.rooms[roomId];
            let classNameString = classNames("room-list__item", {
                "room-list__item--is-member": room.isMember,
                "room-list__item--active": room.isActive
            });
            return (<div className={classNameString} 
                key={i} 
                title="open chat room"
                onClick={self.props.onRoomCellClick.bind(null, room)}>
                {room.title}
            </div>);
        });

    return  (<div className={"room-list-wrapper"}>          
          <ReactCSSTransitionGroup transitionName="room" className="animated-list">
            {roomsList}
          </ReactCSSTransitionGroup>
      </div>);
    }
});


export default RoomList;
