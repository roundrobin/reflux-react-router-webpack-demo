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
import ChatMessagesStore from './ChatMessagesStore';
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
// Holds an array of chat message for the bots.
var _randomChatMessages = [
    "Hey",
    "Need some help!",
    "Hey man, how are you?",
    "Yo peeps!",
    "Bonjour!",
    "Someone here?"
];
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
        var activeRoomId = RoomsStore.getActiveRoom().get("id");

        // If the room is empty we will add a host user
        var members = _members.getIn([activeRoomId, "members"]);
        //if (!members || (members && members.size === 0)) {
            var id = Math.floor(Math.random() * 1000000) + "";
            var user = Immutable.Map({
                "id": id,
                name: "RoomHost-" + id
            });
            // Adds a random user to the currently active chat room!
            this.onAddUser(activeRoomId, user);
            logger.log("MembersStore:onOpenRoom", "Adds room host to the members");
            var randMsg = Math.floor(Math.random() * _randomChatMessages.length) + 1;
            ActionCreator.addUnconfirmedMessage(_randomChatMessages[randMsg - 1], activeRoomId, user);
        //}
        return;
        // Check if there is currently an active room set
        if (activeRoomId) {
            logger.log("MembersStore:onOpenRoom:activeRoomId", "found active room", activeRoomId);
            // If the user had previously rooms open, we clear out all the setIntervals.

            logger.log("MembersStore:onOpenRoom:clearInterval", "_checkIntervals", _checkIntervals.length);
            
            _checkIntervals.forEach(function(intervalId) {
                logger.log("MembersStore:onOpenRoom:clearInterval", "clear interval", intervalId);
                clearInterval(intervalId);
            });

            _checkIntervals = [];
            // For demo purposes we add or remove random users to the members during
            // a session in a room.
            var intervalId = setInterval(function() {
                // Choose randomly between 0 and 1, and either add or remove a member.
                if (Math.round(Math.random()) === 1) {
                    var id = Math.floor(Math.random() * 1000000) + "";
                    logger.log("MembersStore:onOpenRoom:setInterval", "Add to active room: %o new user", activeRoomId, id);
                    // Creates a random user, which will be added to the room
                    var user = Immutable.Map({
                        "id": id,
                        name: "Visitor-" + id
                    });
                    // Adds a random user to the currently active chat room!
                    self.onAddUser(activeRoomId, user);
                    var randMsg = Math.floor(Math.random() * _randomChatMessages.length) + 1;
                    // To simulate a normal chat session, each Bot which connects
                    // to the chat room sends a random message to the room.
                    ActionCreator.addUnconfirmedMessage(_randomChatMessages[randMsg - 1], activeRoomId, user);
                } else {
                    logger.log("MembersStore:onOpenRoom:setInterval", "Remove random user from room");
                    self.onRemoveUser(activeRoomId);
                }
                // We inform all subscribers of this store, about a data change
                self.trigger(self.getAllMembers());
            }, 1000);
            _checkIntervals.push(intervalId);
        }
    },
    onAddUser(roomId, user) {
        logger.log("MembersStore:onAddUser", "called... Add user to room: %o", roomId);
        //Adds a new user in room `roomId` with the following data `user`
        var members = _members.getIn([roomId, "members"]);
        // Check if the room has a members map defined
        if (!members) {
            // Because the members map is not defined yet, we will initialize it
            // with an empty map!
            _members = _members.setIn([roomId, "members"], Immutable.Map());
        }
        // Let's set the new user to the correct room!
        _members = _members.setIn([roomId, "members", user.get("id")], user);
        // We inform all subscribers of this store, about a data change
        this.trigger(this.getAllMembers());
    },
    onRemoveUser(roomId) {
        logger.log("MembersStore:onRemoveUser", "Remove a random user in room:", roomId);
        var members = _members.getIn([roomId, "members"]);
        if (!members) {
            // Because the members map is not defined yet, we will create it!
            _members = _members.setIn([roomId, "members"], Immutable.Map());
        }
        var keys = Object.keys(_members.get(roomId).get("members").toObject());
        // Get a random key from the members map
        var randomKey = _.sample(keys);
        // Remove the random member from the members map
        var newMembers = _members.getIn([roomId, "members"]).delete(randomKey);
        // Set the new members map to the main data structure.
        _members = _members.setIn([roomId, "members"], newMembers);
        // We inform all subscribers of this store, about a data change
        this.trigger(this.getAllMembers());
    }
});
module.exports = MembersStore;
