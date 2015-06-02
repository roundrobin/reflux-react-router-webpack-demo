'use strict';

//==============================================================================
// External dependencies
//==============================================================================
import logger from 'bragi-browser';
import Reflux from 'reflux';
//==============================================================================
// Internal dependencies
//==============================================================================
import ActionCreators from '../actions/ActionCreators';

//==============================================================================
// Store definition
//==============================================================================
let RoomsStore = Reflux.createStore({
    listenables: ActionCreators,

    init: function () {

        logger.log("RoomsStore:init", "called..");

        this._rooms = {
            "123": {
                title: "Default room ",
                id: 123
            }

        };

    },

    getInitialState: function () {
        return this._rooms;
    },

    onAddRoom: function (room) {
        logger.log("RoomsStore:onAddRoom", "called..room", room);
            
        this._rooms[room.id] = room;

        this.trigger(this._rooms);
    },

    getAllRooms: function () {
        return this._rooms;
    }
});

module.exports = RoomsStore;