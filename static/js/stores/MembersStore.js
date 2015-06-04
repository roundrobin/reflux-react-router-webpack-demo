'use strict';
//==============================================================================
// External dependencies
//==============================================================================
import logger from 'bragi-browser';
import Reflux from 'reflux';
import _ from 'lodash';
import Immutable from 'immutable';
//==============================================================================
// Internal dependencies
//==============================================================================
import ActionCreator from '../actions/ActionCreator';
import AsyncActionCreator from '../actions/AsyncActionCreator';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//==============================================================================
// Store definition
//==============================================================================
var _members = Immutable.Map();
var _idIndex = 0;
let MembersStore = Reflux.createStore({
    listenables: [AsyncActionCreator, ActionCreator],
    init: function() {
        logger.log("MembersStore:init", "Called");
    },
    getInitialState: function() {
        return _members.toObject();
    },
    getAllMembers: function(){
        return _members.toObject();      
    },
    onLoadRoomsCompleted: function(data) {
        logger.log("MembersStore:onLoadRoomsCompleted", "called...", data);
        this.trigger(_members);
    },
    onOpenRoom: function(data) {
        logger.log("MembersStore:onOpenRoom", "called...", data);
        if (!_members[data.id]) {
            logger.log("MembersStore:onOpenRoom", "Add new room to the object");


            var randId = Math.floor(Math.random()*1000);
            _members = _members.set(data.id, {
                members: {
                    1: { 
                        name: `Mr. Radish ${randId}`,
                        id: 1
                    }
                }
            });
        }
        this.trigger(this.getAllMembers());
    },
    onAddUser: function(roomId, user) {
        // Adds a new user in room `roomId` with the following data `user`
        user.id = _idIndex;
        var entry = _members[roomId];
        if (entry) {
            _members = _members.set(_idIndex, user);
            _idIndex++;
        } else {
            logger.log("error:MembersStore:onAddUser", "Didnt find room", roomId, user);
            //Initialize a new object for the room!
            _members = _members.set(roomId, { members: {} });
            // Get the object to mutate the data
            var membersOfRoom = _members.get(roomId);
            //Add a new user to the members object!
            membersOfRoom.members[_idIndex] = user;
            //Create a new instance of the members data structure
            _members = _members.set(roomId, membersOfRoom);
            //Increase the user id
            _idIndex++;

        }
        this.trigger(this.getAllMembers());
    },
    onRemoveUser: function(roomId) {
        logger.log("MembersStore:onRemoveUser", "Remove a random user in room:", roomId);
        var keys = Object.keys(_members[roomId].members);
        var sample = _.sample(keys);
        var membersOfRoom = _members[roomId];
        delete membersOfRoom.members[sample];
        _members = _members.set(roomId, membersOfRoom);
        this.trigger(this.getAllMembers());
    }
});
module.exports = MembersStore;
