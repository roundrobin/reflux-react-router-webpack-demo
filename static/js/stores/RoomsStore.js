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
// Keeps track of which is the currently active room!
var _activeRoomId;
//
// The `_rooms` object maps a`roomId` to an map of room objects.
// An examples of that structure looks like:
//
// _rooms = Immutable.fromJS({
//      "roomid-1": {
//          id: "roomid-1",    
//          name: "demo room",
//          isActive: false,
//          isMember: false    
//       }
// });
//
var _rooms = Immutable.Map();
//==============================================================================
// Store definition
//==============================================================================
let RoomsStore = Reflux.createStore({
    listenables: ActionCreators,
    init() {
        logger.log("RoomsStore:init", "called..");
    },
    getInitialState() {
        logger.log("RoomsStore:getInitialState", "_rooms", _rooms);
        return _rooms;
    },
    onOpenRoom(room) {
        logger.log("RoomsStore:onOpenRoom", "called...roomId", room);
        // If a active room is set, we change it's active status to false!
        if (_activeRoomId) {
            var activeRoomObj = _rooms.get(_activeRoomId);
            activeRoomObj = activeRoomObj.set("isActive", false);
            _rooms = _rooms.set(_activeRoomId, activeRoomObj);
        }
        // For the room going to be opened, we set the `isMember` and `isActive`
        // status to `true`.
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
    onAddRoom(roomMap) {
        logger.log("RoomsStore:onAddRoom", "called..roomMap", roomMap);
        _rooms = _rooms.set(roomMap.get("id"), roomMap);
        this.trigger(this.getAllRooms());
    },
    getActiveRoom(){
        logger.log("RoomsStore:getActiveRoom", "called...");
        // If there is a active room set, we return it!
        if(_activeRoomId){
            return _rooms.get(_activeRoomId); 
        }
        return;        
    },
    getAllRooms() {
        logger.log("RoomsStore:getAllRooms", "called...");
        return _rooms;
    }
});
module.exports = RoomsStore;
