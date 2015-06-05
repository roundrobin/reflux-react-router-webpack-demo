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

let _unconfirmedId = 0;
//==============================================================================
// Store definition
//==============================================================================
let ChatMessagesStore = Reflux.createStore({
    listenables: [AsyncActionCreator, ActionCreator],
    init: function() {
        logger.log("ChatMessagesStore:init", "Called");
    },
    onAddUnconfirmedMessage: function(text, roomId, user){
    	logger.log("ChatMessagesStore:onAddUnconfirmedMessage", "called...message %o room %o", text, roomId);	

        let randomMessageId= Math.floor(Math.random()*1000000);

    	_messages = _messages.setIn([roomId, randomMessageId], Immutable.Map({
            id: _unconfirmedId,
            text: text,
            date: +new Date(),
            user: user,
            confirmed: false
        }));

        _unconfirmedId++;


        logger.log("ChatMessagesStore:onAddUnconfirmedMessage", "_messages", _messages.toJS());   

    	this.trigger(this.getMessages(roomId));
    			
    },
    getInitialState: function(roomId){
        return {};
    },
    getMessages: function(roomId) {
        return _messages.get(roomId);
    }
});
module.exports = ChatMessagesStore;
