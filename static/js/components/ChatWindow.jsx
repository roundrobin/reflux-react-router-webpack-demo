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
import ActionCreator from '../actions/ActionCreator.js';
import ChatMessagesStore from '../stores/ChatMessagesStore.js';
//==============================================================================
// Constants / Configs
//==============================================================================
let ENTER_KEY_CODE = 13;
//==============================================================================
// Module definition
//==============================================================================
let ChatWindow = React.createClass({
  mixins: [Navigation],
  getInitialState: function(){
    return { text: ""}  
  },
  componentDidMount(){
    logger.log("ChatWindow:componentDidMount", "props", this.props);
  },
  _clickSend: function(){
    logger.log("ChatWindow:_clickSend", "called...");
    alert("send message");
      
  },
  _handleChange: function(event){
    logger.log("ChatWindow:_onChange", "called...", event);
    this.setState({value: event.text.value});
  },
  _onKeyDown: function(event){
    logger.log("ChatWindow:_onKeyDown", "called...", event);
     if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        ActionCreator.addMessage(msg, this.props.roomId);
        logger.log("ChatWindow:_onKeyDown", "Enter key hit!");
      }
      this.setState({text: ''});
    } 
  },
  render() {
    var self = this;
    logger.log("ChatWindow:render", "state", this.state);
 
    return (<div className="chat-window">
          <h2>Chat window</h2>
          <header>{this.props.children}</header>  
          <div className="chat-window__reply-box">
            <input className="chat-window__input" 
                   type="text" 
                   onKeyDown={this._onKeyDown}
                   onChange={this._handleChange} 
                   value={this.state.text} 
                   placeholder="Type chat message here"/>
            <div className="chat-window__send" onClick={this._clickSend}>
              Send
            </div>
          </div>
      </div>);
    }
});


export default ChatWindow;
