/*
 *
 * `MembersList.jsx` 
 *
 * Renders a members of a chat room! It get it's data from the
 * `MembersStore`.
 *
 * Usage:
 * ```
 *    <MembersList roomId='123'/>
 * ```
 */
//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import logger from 'bragi-browser';
import _ from 'lodash';
import { RouteHandler, Link } from 'react-router';
import Immutable from 'immutable';
//==============================================================================
// Internal dependencies
//==============================================================================
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
//==============================================================================
// Module definition
//==============================================================================
let MembersList = React.createClass({
  displayName: 'MembersList',
  contextTypes: {
    router: React.PropTypes.func
  },
  render() {
    let self = this;
    logger.log("MembersList:render", "state",self.props);

    var members;
    if(self.props.members){
      var memberKeys = Object.keys(self.props.members.toObject());

      logger.log("MembersList:render", "memberKeys", memberKeys);
      members = memberKeys.map(function(memberId, key){
        var member = self.props.members.get(memberId);
        return <div key={member.get("id")} className="members-area__item">{member.get("name")}-{member.get("id")}</div>;
      });

    }
    return (<div className="members-list">
          <h2>Members of room: {this.props.roomId}</h2>
          <div className="members-area">
              {members}              
          </div>
      </div>);
    }
});


export default MembersList;
