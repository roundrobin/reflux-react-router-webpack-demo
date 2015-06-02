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
let ActiveRoomsStore = Reflux.createStore({
    listenables: ActionCreators,

    init: function () {

        logger.log("ActiveRoomsStore:init", "called..");

        this._activeRooms= {
            "123": {
                title: "Default room ",
                id: 123
            }
        };
    },
    getInitialState: function () {
        return this._activeRooms;
    },
    onOpenRoom: function (room) {
        logger.log("ActiveRoomsStore:onOpenRoom", "called..room", room);
            
        this._activeRooms[room.id] = room;

        logger.log("ActiveRoomsStore:onOpenRoom", "all active rooms", this._activeRooms);

        this.trigger(this._activeRooms);  
    },

    getAllActiveRooms: function () {
        return this._activeRooms;
    }
});

module.exports = ActiveRoomsStore;