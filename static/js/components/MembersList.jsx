//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import logger from 'bragi-browser';
import _ from 'lodash';
import { RouteHandler, Link, Navigation } from 'react-router';
import Immutable from 'immutable';
//==============================================================================
// Internal dependencies
//==============================================================================
import MembersStore from '../stores/MembersStore';
//==============================================================================
// Module definition
//==============================================================================
let MembersList = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [Navigation, Reflux.connectFilter(MembersStore, "members", function(state) {
        var membersObj = state.get(this.props.roomId+"");
        var returnObj = Immutable.Map();
        if(membersObj && membersObj.get("members")){
          returnObj = membersObj.get("members");
        }

        logger.log("MembersList:connectFilter", "props: %o members: %o ", this.props.roomId, returnObj);
        return returnObj;
    })],
  componentDidMount(){
    logger.log("MembersList:componentDidMount", "props", this.props);
    var self = this;        
  },
  render() {
    var self = this;
    logger.log("MembersList:render", "state",self.state);
    var members;

    if(self.state.members){
      var members = Object.keys(self.state.members.toObject()).map(function(memberId, index){
        var member = self.state.members.get(memberId);
        return <div key={index} className="members-area__item">{member.get("name")}-{member.get("id")}</div>;
      });
    }
    
 
    return (<div className="members-list">
          <h2>Friendlist for room: {this.props.roomId}</h2>
          <div className="members-area">
            {members}
          </div>
      </div>);
    }
});


export default MembersList;
