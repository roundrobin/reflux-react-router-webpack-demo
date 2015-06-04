//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import logger from 'bragi-browser';
import { RouteHandler, Link, Navigation } from 'react-router';

//==============================================================================
// Internal dependencies
//==============================================================================
//import ActionCreators from '../actions/ActionCreators.js';
//import RoomsStore from '../stores/RoomsStore.js';

//==============================================================================
// Module definition
//==============================================================================
let ChatWindow = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [Navigation],
  componentDidMount(){
    logger.log("ChatWindow:componentDidMount", "props", this.props);
  },
  _clickSend: function(){
    logger.log("ChatWindow:_clickSend", "called...");
    alert("send message");
      
  },
  render() {
    var self = this;
    logger.log("ChatWindow:render", "state", this.state);
 
    return (<div className="chat-window">
          <h2>Chat window</h2>
          <header>{this.props.children}</header>  
          <div className="chat-window__reply-box">
            <input className="chat-window__input" type="text" placeholder="Type chat message here"/>
            <div className="chat-window__send" onClick={this._clickSend}>
              Send
            </div>
          </div>
      </div>);
    }
});


export default ChatWindow;
