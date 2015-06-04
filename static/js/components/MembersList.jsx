//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import logger from 'bragi-browser';
import _ from 'lodash';
import { RouteHandler, Link, Navigation } from 'react-router';
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
        var membersObj = state[this.props.roomId+""];
        var returnObj = {};
        if(membersObj && membersObj.members){
          returnObj = membersObj.members;
        }

        logger.log("MembersList:connectFilter", "props: ", this.props.roomId);
        return returnObj;
    })],
  componentDidMount(){
    logger.log("MembersList:componentDidMount", "props", this.props);
    var self = this;        
  },
  render() {
    var self = this;
    logger.log("MembersList:render", "state",self.state);

    var members = Object.keys(self.state.members).map(function(memberId, index){
      var member = self.state.members[memberId];
      return <div key={index} className="members-area__item">{member.name}-{member.id}</div>;
    });
 
    return (<div className="members-list">
          <h2>Friendlist for room: {this.props.roomId}</h2>
          <div className="members-area">
            {members}
          </div>
      </div>);
    }
});


export default MembersList;
