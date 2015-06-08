/*
 *
 * `RoomList.jsx` 
 *
 * Renders a list of chat rooms. It uses the `ReactCSSTransitionGroup` react
 * addon to animate newly added/removed rooms. It derrives it's data from the 
 * parent component.
 *
 * Usage:
 * ```
 *    <RoomList rooms={objectWithRoomKeys} onRoomOpen={this.someCallback}/>
 * ```
 */
//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import logger from 'bragi-browser';
import classNames from 'classnames';
import Immutable from 'immutable';
//==============================================================================
// Configs
//==============================================================================
let PureRenderMixin = React.addons.PureRenderMixin;
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
//==============================================================================
// Module definition
//==============================================================================
let RoomList = React.createClass({
  shouldComponentUpdate(nextProps, nextState){
    // Shows an example on how to override `shouldComponentUpdate` to hook into 
    // the app lifecycle.
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
          <ReactCSSTransitionGroup transitionName="room" className="room-list__animated-list">
            {roomsList}
          </ReactCSSTransitionGroup>
      </div>);
    }
});


export default RoomList;
