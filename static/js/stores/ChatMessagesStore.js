/*
 *
 * `ChatMessagesStore.js` 
 *
 * The `ChatMessagesStore` stores all chat messages per room.
 * 
 */
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
// The `_messages` object maps `roomId` to an map of `messageId`.
// An examples of that structure looks like:
//
// _messages = Immutable.fromJS({
//      "roomid-1": {
//          "message-1": {user: {...}, msg: "Hello, how are you?", ...}
//          "message-2": {user: {...}, msg: "thanks you dude, pretty good!", ...}
//          "message-3": {user: {...}, msg: "Glad to hear!", ...}
//       }
// });
//
let exampleUser = Immutable.Map({
    id: 1,
    name: "roundrobin"
});

let _messages = Immutable.Map();
// Auto increment for message ids!
let _unconfirmedId = 0;
//==============================================================================
// Store definition
//==============================================================================
let ChatMessagesStore = Reflux.createStore({
    listenables: [AsyncActionCreator, ActionCreator],
    init() {
        logger.log("ChatMessagesStore:init", "Called");
    },
    onAddUnconfirmedMessage(text, roomId, user){
    	logger.log("ChatMessagesStore:onAddUnconfirmedMessage", "called...message %o room %o", text, roomId);	
        var chatMessages = _messages.get(roomId);

        //If no chat message was added yet, we add the default message.
        if (!chatMessages) {
            this._addMessage(roomId, `Welcome to the chat room (${roomId}!)`, user);
        }

        this._addMessage(roomId, text, user);

        // We inform all subscribers of this store, about a data change
    	this.trigger(this.getMessages(roomId));
    			
    },
    _addMessage: function(roomId, text, user){
        _messages = _messages.setIn([roomId, _unconfirmedId], Immutable.Map({
            id: _unconfirmedId,
            text: text,
            date: +new Date(),
            user: user,
            confirmed: false
        }));

        _unconfirmedId++;
            
    },
    getInitialState(roomId){
        return {};
    },
    getMessages(roomId) {
        return _messages.get(roomId);
    }
});
module.exports = ChatMessagesStore;
