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
    "removeUser" : {},
    "addMessage" : {
        asyncResult: true
    }
});

//==============================================================================
// Action listenerns
//==============================================================================
Actions.loadRooms.listen( function() {

	logger.log("AsyncActionCreators:loadRooms", "called...", WebAPIUtils);
    // Fires of a Ajax call to an open Github endpoint, to test how Ajax calls
    // are integrated within React/Flux.
    var promise = WebAPIUtils.getProfile();
    // After initializing the Ajax promise, we hook it up to some callbacks.
    promise
        .done( this.completed )
        .fail( this.failed );
});

module.exports = Actions;
