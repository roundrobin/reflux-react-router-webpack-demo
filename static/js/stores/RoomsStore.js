'use strict';
//==============================================================================
// External dependencies
//==============================================================================
import logger from 'bragi-browser';
import Reflux from 'reflux';
import Immutable from 'immutable';
//==============================================================================
// Internal dependencies
//==============================================================================
import ActionCreators from '../actions/ActionCreator';
//==============================================================================
// Private data structures
//==============================================================================
// Keeps track which is the active room!
var _activeRoomId;
// Private data structure holding all views.
var _rooms = Immutable.Map();
//==============================================================================
// Store definition
//==============================================================================
let RoomsStore = Reflux.createStore({
    listenables: ActionCreators,
    init: function() {
        logger.log("RoomsStore:init", "called..");
    },
    getInitialState: function() {
        logger.log("RoomsStore:getInitialState", "_rooms.toObject()..", _rooms.toObject());
        return _rooms.toObject();
    },
    onOpenRoom: function(room) {
        logger.log("RoomsStore:onOpenRoom", "called...roomId", room);
        if (_activeRoomId) {
            logger.log("RoomsStore:onOpenRoom:_activeRoomId", "Found activeRoom");
            var activeRoomObj = _rooms.get(_activeRoomId);
            activeRoomObj.isActive = false;
            _rooms = _rooms.set(_activeRoomId, activeRoomObj);
        }
        var roomObj = _rooms.get(room.id);
        if (roomObj) {
            roomObj.isMember = true;
            roomObj.isActive = true;
            _rooms = _rooms.set(room.id, roomObj);
            _activeRoomId = room.id;
        }
        this.trigger(this.getAllRooms());
    },
    onAddRoom: function(room) {
        logger.log("RoomsStore:onAddRoom", "called..room", room);
        _rooms = _rooms.set(room.id, room);
        this.trigger(this.getAllRooms());
    },
    getAllRooms: function() {
        return _rooms.toObject();
    }
});
module.exports = RoomsStore;
