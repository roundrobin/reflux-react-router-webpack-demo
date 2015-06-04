'use strict';
//==============================================================================
// External dependencies
//==============================================================================
import Reflux from 'reflux';
import logger from 'bragi-browser';
//==============================================================================
// External dependencies
//==============================================================================
import WebAPIUtils from '../utils/WebAPIUtils.js';
//==============================================================================
// Module definition
//==============================================================================
let Actions = Reflux.createActions({
    "loadRooms": {
    	asyncResult: true
    },
    "addUser" : {},
    "removeUser" : {}
});

//==============================================================================
// Action listenerns
//==============================================================================
// when 'load' is triggered, call async operation and trigger related actions
Actions.loadRooms.listen( function() {

	logger.log("AsyncActionCreators:loadRooms", "called...", WebAPIUtils);
    // By default, the listener is bound to the action
    // so we can access child actions using 'this'
    var promise = WebAPIUtils.getProfile();
    // After initializing the Ajax promise, we hook it up to some callback.
    promise
        .done( this.completed )
        .fail( this.failed );
});

module.exports = Actions;
