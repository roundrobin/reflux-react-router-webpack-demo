//==============================================================================
// External dependencies
//==============================================================================
import logger from 'bragi-browser';
import $ from 'jquery';
//==============================================================================
// Internal dependencies
//==============================================================================
import AsyncActionCreator from '../actions/AsyncActionCreator';
//==============================================================================
// Helpers
//==============================================================================
function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //==============================================================================
    // Module
    //==============================================================================
var interval;
var rand = 300;
var DemoHelpers = {
   
    randomUsersJoinOrLeave: function(roomId) {
    
    }
};
module.exports = DemoHelpers;
