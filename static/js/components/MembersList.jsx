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
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
//==============================================================================
// Module definition
//==============================================================================
let MembersList = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [Navigation, Reflux.connectFilter(MembersStore, "members", function(state) {
        let membersObj = state.get(this.props.roomId+"");
        let returnObj = Immutable.Map();
        if(membersObj && membersObj.get("members")){
          returnObj = membersObj.get("members");
        }

        logger.log("MembersList:connectFilter", "props: %o members: %o ", this.props.roomId, returnObj.toJS());
        return returnObj;
    })],
  render() {
    let self = this;
    logger.log("MembersList:render", "state",self.state);

    var members;
    if(self.state.members){

      members = self.state.members.map(function(member, key){
        logger.log("MembersList:render:map", "key", member.toJS(), key);
        return <div key={member.get("id")} className="members-area__item">{member.get("name")}-{member.get("id")}</div>;
      })

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
