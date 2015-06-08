/*
 *
 * `RoomListDetail.jsx` 
 *
 * Is responsible for rendering the `ChatWindow` and  `MembersList` component.
 * It derrives it's data from the `Rooms` store by filtering the by the url query
 * param.
 *
 *
 * Usage:
 * ```
 *    <RoomDetail roomId='123'/>
 * ```
 */
//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import logger from 'bragi-browser';
import { RouteHandler, Link } from 'react-router';
import Immutable from 'immutable';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

//==============================================================================
// Internal dependencies
//==============================================================================
//-------------------------------------
// Actions
//-------------------------------------
import ActionCreators from '../actions/ActionCreator.js';
//-------------------------------------
// Stores
//-------------------------------------
import RoomsStore from '../stores/RoomsStore.js';
import MembersStore from '../stores/MembersStore';
//-------------------------------------
// Views
//-------------------------------------
import ChatWindow from './ChatWindow.jsx';
import MembersList from './MembersList.jsx';
//==============================================================================
// Module definition
//==============================================================================
let RoomDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    willTransitionTo(transition, params, query, callback){
      logger.log("RoomDetail:willTransitionTo", "called.....", arguments);
      callback()
    },
    willTransitionFrom(transition, component){
      logger.log("RoomDetail:willTransitionFrom", "called.....");
    }
  },
  mixins: [
    ImmutableRenderMixin,
    // Connect to the Room store and pick the object for the passed in room.
    Reflux.connectFilter(RoomsStore, "room", function(rooms) {
      var room = rooms.get(this.props.params.roomSlug);
      logger.log("RoomDetail:connectFilter:RoomsStore", "room", room);
      return room;
    }),
    Reflux.connectFilter(MembersStore, "members", function(members) {
        var membersOfRoom = members.get(this.props.params.roomSlug);
        // Checks if a record for the passed in room was found.
        if(membersOfRoom && membersOfRoom.get("members")){
          return membersOfRoom.get("members");  
        }

        //If no record was found, we return an empty map.
        return Immutable.Map();
    })    
  ],
  componentWillMount(){
    logger.log("RoomDetail:componentWillMount", "called...", this.state);
    // if the passed in room is empty we transition to the rooms list and
    if(!this.state.room){
      this.context.router.transitionTo('/404');
      //Overwrite the normal render!
      this.render = function(){
        return <div />;
      }
    }
  },
  render() {
    logger.log("RoomDetail:render", "state. roomId:", this.state);
    var self = this;
    var view;    
    var roomId = this.state.room.get("id");
    logger.log("RoomDetail:render", "Found a room");
    view = <div>
          <ChatWindow roomId={roomId}/>         
          <MembersList roomId={roomId} members={this.state.members}/>
    </div>;
     
    return (
        <div className="active-rooms">      
          {view}      
        </div>
    );
  }
});
export default RoomDetail;
