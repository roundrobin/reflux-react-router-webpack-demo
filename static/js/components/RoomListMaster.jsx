//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import { RouteHandler, Link} from 'react-router';
import logger from 'bragi-browser';
import Immutable from 'immutable';
//==============================================================================
// Internal dependencies
//==============================================================================
import RoomList from '../components/RoomList.jsx';
import RoomsStore from '../stores/RoomsStore.js';
import ActionCreators from '../actions/ActionCreator.js';
//==============================================================================
// Module definition
//==============================================================================
let RoomListMaster = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    mixins: [
        Reflux.connect(RoomsStore, 'rooms')
    ],
    componentDidMount() {
        logger.log("RoomListMaster:componentDidMount", "props", this.props);
    },
    _clickAddRoomsBtn: function() {
        logger.log("RoomListMaster:_clickAddRoomsBtn", "called");
        let id = Math.floor(Math.random() * 10000)+"";
        let newRoom = Immutable.Map({
            "title": "room-" + id,
            "id": id+""
        });
        ActionCreators.addRoom(newRoom);
    },
    _onRoomOpen: function(room){
        ActionCreators.openRoom(room);
        this.context.router.transitionTo('/room/' + room.get("id"));
            
    },
    render() {
        let self = this;
        logger.log("RoomListMaster:render", "state", this.state);
        //Render the Markup of this component
        return (<div className="list-view">
         <div className={"room-list"}>
          <button className={"btn"} onClick={this._clickAddRoomsBtn}>Add random chat room</button>
          <br/>
          <br/>
          <RoomList rooms={this.state.rooms} onRoomOpen={this._onRoomOpen}/>
        </div>

        <RouteHandler/>
      </div>);
    }
});
export default RoomListMaster;
