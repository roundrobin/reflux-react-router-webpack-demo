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
import RoomsStore from './RoomsStore';
import ActionCreator from '../actions/ActionCreator';
import AsyncActionCreator from '../actions/AsyncActionCreator';
//==============================================================================
// Private data structures
//==============================================================================
//
// The `_members` object maps `roomId` to an map of `userId`.
// An examples of that structure looks like:
//
// _members = Immutable.fromJS({
//      "roomid-1": {
//          "user-1": {id: "user-1", name: "Scotty Pippen"}
//          "user-2": {id: "user-2", name: "Michael Jordan"}
//          "user-3": {id: "user-3", name: "Shaquille o'neal"}
//       }
// });
//
var _members = Immutable.Map();
// Keeps track of all intervals created when opening a rooms!
var _checkIntervals = [];
//==============================================================================
// Store definition
//==============================================================================
let MembersStore = Reflux.createStore({
    listenables: [AsyncActionCreator, ActionCreator],
    init() {
        logger.log("MembersStore:init", "Called");
    },
    getInitialState() {
        return _members;
    },
    getAllMembers() {
        return _members;
    },
    onLoadRoomsCompleted(data) {
        logger.log("MembersStore:onLoadRoomsCompleted", "called...", data);
        this.trigger(_members);
    },
    onOpenRoom(room) {
        logger.log("MembersStore:onOpenRoom", "called...", room);
        var self = this;
        if (!_members[room.get("id")]) {
            logger.log("MembersStore:onOpenRoom", "Add new room to the object");
            var randId = Math.floor(Math.random() * 1000);
            _members = _members.set(room.get("id"), Immutable.Map({
                members: Immutable.Map({
                    "1": Immutable.Map({
                        name: `Room Host ${randId}`,
                        id: "1"
                    })
                })
            }));
        }
        var activeRoom = RoomsStore.getActiveRoom();
        // Check if there is currently an active room set
        if (activeRoom) {
            logger.log("MembersStore:onOpenRoom:activeRoom", "found active room", activeRoom);
            // If the user had previously rooms open, we clear out all the setIntervals.
            _checkIntervals.forEach(function(intervalId) {
                logger.log("MembersStore:onOpenRoom:activeRoom", "clear interval", intervalId);
                clearInterval(intervalId);
            });
            // For demo purposes we add or remove random users to the members during
            // a session in a room.
            var intervalId = setInterval(function() {
                // Choose randomly between 0 and 1, and either add or remove a member.
                if (Math.round(Math.random()) === 1) {
                    var id = Math.floor(Math.random() * 1000000) + "";
                    logger.log("MembersStore:onOpenRoom:activeRoom", "Add new user", id);
                    self.onAddUser(activeRoom.get("id"), Immutable.Map({
                        "id": id,
                        name: "Visitor-" + id
                    }));
                } else {
                    self.onRemoveUser(activeRoom.get("id"));
                }
            }, 1000);
            _checkIntervals.push(intervalId);
        }
        this.trigger(this.getAllMembers());
    },
    onAddUser(roomId, user) {
        logger.log("MembersStore:onAddUser", "called...", roomId, user);
        //Adds a new user in room `roomId` with the following data `user`
        var members = _members.getIn([roomId, "members"]);
        // Check if the room has a members map
        if (members) {
            // Set the new user infos for the passed in room!
            members = members.set(user.get("id"), user)
                // Set the new members map
            //_members = _members.setIn([roomId, "members"], members);
            var membersArr = _members.get(roomId).set("members", members)
            _members = _members.set(roomId, membersArr);

            //Inform all the views and other stores that the data changed!
            this.trigger(this.getAllMembers());
        }
    },
    onRemoveUser(roomId) {
        logger.log("MembersStore:onRemoveUser", "Remove a random user in room:", roomId);
        var keys = Object.keys(_members.get(roomId).get("members").toObject());
        // Get a random key from the members map
        var randomKey = _.sample(keys);
        // Remove the random member from the members map
        var newMembers = _members.getIn([roomId, "members"]).delete(randomKey);
        // Set the new members map to the main data structure.
        _members = _members.setIn([roomId, "members"], newMembers);
        //Inform all the views and other stores that the data changed!
        this.trigger(this.getAllMembers());
    }
});
module.exports = MembersStore;
