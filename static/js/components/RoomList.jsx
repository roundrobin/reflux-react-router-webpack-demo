//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import logger from 'bragi-browser';
import { RouteHandler, Link, Navigation } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
import Immutable from 'immutable';
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
  //mixins: [PureRenderMixin],
  // shouldComponentUpdate: function(nextProps, nextState){
  //   logger.log("RoomList:shouldComponentUpdate", 'isEqual', 
  //     nextProps.rooms,
  //     this.props.rooms,
  //     _.isEqual(nextProps.rooms, this.props.rooms));
  //   return !_.isEqual(nextProps.rooms, this.props.rooms);
  // },
  render() {
    logger.log("RoomList:render", "called...", this.props.rooms);
    let self = this;
    let roomKeys = Object.keys(this.props.rooms.toObject());
    logger.log("RoomList:render", "roomKeys...", roomKeys);

    let roomsList = roomKeys.map(function(roomId, i) {
            let room = self.props.rooms.get(roomId);
            let classNameString = classNames("room-list__item", {
                "room-list__item--is-member": room.get("isMember"),
                "room-list__item--active": room.get("isActive")
            });
            return (<div className={classNameString} 
                key={room.get("id")} 
                title="open chat room"
                onClick={self.props.onRoomCellClick.bind(null, room)}>
                {room.get("title")}
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
