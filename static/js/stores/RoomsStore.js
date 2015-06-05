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
        logger.log("RoomsStore:getInitialState", "_rooms", _rooms);
        return _rooms;
    },
    onOpenRoom: function(room) {
        logger.log("RoomsStore:onOpenRoom", "called...roomId", room);
        if (_activeRoomId) {
            var activeRoomObj = _rooms.get(_activeRoomId);
            activeRoomObj = activeRoomObj.set("isActive", false);
            _rooms = _rooms.set(_activeRoomId, activeRoomObj);
        }
        var roomId = room.get("id");
        var roomObj = _rooms.get(roomId);
        logger.log("RoomsStore:onOpenRoom", "roomObj", roomObj);
        if (roomObj) {
            logger.log("RoomsStore:onOpenRoom", "Found room to activate it");
            roomObj = roomObj.set("isMember", true);
            roomObj = roomObj.set("isActive", true);
            _rooms = _rooms.set(roomId, roomObj);
            _activeRoomId = roomId;
        }
        this.trigger(this.getAllRooms());
    },
    onAddRoom: function(roomMap) {
        logger.log("RoomsStore:onAddRoom", "called..roomMap", roomMap);
        _rooms = _rooms.set(roomMap.get("id"), roomMap);
        this.trigger(this.getAllRooms());
    },
    getActiveRoom: function(){
        logger.log("RoomsStore:getActiveRoom", "called...");
        if(_activeRoomId){
            return _rooms.get(_activeRoomId); 
        }
        return;        
    },
    getAllRooms: function() {
        logger.log("RoomsStore:getAllRooms", "called...");
        return _rooms;
    }
});
module.exports = RoomsStore;
