//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import logger from 'bragi-browser';
import { RouteHandler, Link} from 'react-router';
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
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState: function() {
        return {
            text: "",
            messages: {
                1: {
                    text: "Hello, welcome to the room!",
                    date: +new Date()
                },
            }
        }
    },
    componentDidMount() {
        logger.log("ChatWindow:componentDidMount", "props", this.props);
    },
    _clickSend: function() {
        logger.log("ChatWindow:_clickSend", "called...");
        //alert(`send message: ${this.state.text}`);
        this._addMessage(this.state.text.trim());
    },
    _handleChange: function(event) {
        logger.log("ChatWindow:_onChange", "called...", event);
        this.setState({
            text: event.target.value
        });
    },
    _addMessage: function(text) {
        var id = Math.floor(Math.random() * 100000);
        var messages = this.state.messages;
        messages[id] = {
            text: text,
            date: +new Date()
        };
        this.setState({
            messages: messages,
            text: ''
        });
    },
    _onKeyDown: function(event) {
        logger.log("ChatWindow:_onKeyDown", "called...", event);
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            var text = this.state.text.trim();
            if (text) {
                this._addMessage(text);
                //ActionCreator.addMessage(msg, this.props.roomId);
                logger.log("ChatWindow:_onKeyDown", "Enter key hit!");
            }
        }
    },
    render() {
        var self = this;
        logger.log("ChatWindow:render", "state", this.state);
        var messages = Object.keys(this.state.messages)
            .sort(function(idFirst, idSecond) {
                var objA = self.state.messages[idFirst];
                var objB = self.state.messages[idSecond];
                return objA.date - objB.date;
            })
            .map(function(messageId, index) {
                var msg = self.state.messages[messageId];
                return <div>[{index}] {msg.text}</div>
            });
        return (<div className="chat-window">
          <h2>Chat window</h2>
          <header>{this.props.children}</header>  
          <div className={"messages-thread"}>{messages}</div>  
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
