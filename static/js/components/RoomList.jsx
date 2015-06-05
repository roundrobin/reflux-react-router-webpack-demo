//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import logger from 'bragi-browser';
import classNames from 'classnames';
import Immutable from 'immutable';
//==============================================================================
// Internal dependencies
//==============================================================================
import ActionCreators from '../actions/ActionCreator.js';
//==============================================================================
// Configs
//==============================================================================
let PureRenderMixin = React.addons.PureRenderMixin;
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
//==============================================================================
// Module definition
//==============================================================================
let RoomList = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState){
    return !Immutable.is(nextProps.rooms, this.props.rooms);
  }, 
  render() {
    logger.log("RoomList:render", "called...", this.props);
    let self = this;
    let roomKeys = Object.keys(this.props.rooms.toObject());

    let roomsList = roomKeys.map(function(roomId, i) {
            let room = self.props.rooms.get(roomId);
            let classNameString = classNames("room-list__item", {
                "room-list__item--is-member": room.get("isMember"),
                "room-list__item--active": room.get("isActive")
            });
            return (<div className={classNameString} 
                key={room.get("id")} 
                title="open chat room"
                onClick={self.props.onRoomOpen.bind(null, room)}>
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
