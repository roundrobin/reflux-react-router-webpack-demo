//==============================================================================
// External dependencies
//==============================================================================
import logger from 'bragi-browser';
import $ from 'jquery';

//==============================================================================
// Internal dependencies
//==============================================================================
import ActionCreator from '../actions/ActionCreator';

//==============================================================================
// Module
//==============================================================================
var WebAPIUtils = {
    getProfile: function() {
        logger.log("WebAPIUtils:getProfile", "called...");
        // For the demo we just hitting a random public endpoint to simulate
        // how async request flow through the app.
        return $.ajax({
            url: "https://api.github.com/users/roundrobin"
        });
    }
};
module.exports = WebAPIUtils;
