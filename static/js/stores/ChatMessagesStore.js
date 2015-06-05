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
//          "message-1": {user: 1, msg: "Hello, how are you?"}
//          "message-2": {user: 2, msg: "thanks you dude, pretty good!"}
//          "message-3": {user: 1, msg: "Glad to hear!"}
//       }
// });
//
let _messages = Immutable.Map();
//==============================================================================
// Store definition
//==============================================================================
let ChatMessagesStore = Reflux.createStore({
    listenables: [AsyncActionCreator, ActionCreator],
    init: function() {
        logger.log("ChatMessagesStore:init", "Called");
    },
    getInitialState: function() {
        return _messages;
    }
});
module.exports = ChatMessagesStore;
