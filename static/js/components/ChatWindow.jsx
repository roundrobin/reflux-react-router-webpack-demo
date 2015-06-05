/*
 *
 * `ChatWindow` component
 *
 * Usage:
 * ```
 *   <ChatWindow roomId="123" />
 * ```     
 * 
 * This view shows how to implement a set ofstate which has some of it's data derrive
 * from a store and some of the data add locally. In this example the state of 
 * the HTML input field is kept locally, but the messages come from the 
 * `ChatMessagesStore`.
 *
 */
//==============================================================================
// External dependencies
//==============================================================================
import React from 'react/addons';
import Reflux from 'reflux';
import logger from 'bragi-browser';
import { RouteHandler, Link } from 'react-router';
import Immutable from 'immutable';
import classNames from 'classnames';
//==============================================================================
// Internal dependencies
//==============================================================================
import ActionCreator from '../actions/ActionCreator.js';
import AsyncActionCreator from '../actions/AsyncActionCreator.js';
import ChatMessagesStore from '../stores/ChatMessagesStore.js';
//==============================================================================
// Constants / Configs
//==============================================================================
const ENTER_KEY_CODE = 13;
let exampleUser = Immutable.Map({
    id: 1,
    name: "roundrobin"
});
//==============================================================================
// Module definition
//==============================================================================
let ChatWindow = React.createClass({
    mixins: [Reflux.ListenerMixin],
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState() {
        logger.log("ChatWindow:getInitialState", "called...", this.props.roomId);
        return {
            messages: ChatMessagesStore.getInitialState(this.props.roomId),
            text: ''
        };
    },
    componentDidMount() {
        logger.log("ChatWindow:componentDidMount", "props", this.props);
        this.listenTo(ChatMessagesStore, this._onStatusChange);
        this._addMessage("Welcome to the chat room!", Immutable.Map({
            id: 2,
            name: "System"
        }));
    },
    _onStatusChange(storeMessages) {
        logger.log("ChatWindow:onStatusChange", "storeMessages:", storeMessages.toObject());
        this.setState({
            messages: storeMessages.toObject(),
        }, function() {
            // After the new message got added to the messages object, we want to make
            // sure the message thread DIV is scrolled to the bottom.
            var messageThreadNode = this.refs.messagesThread.getDOMNode();
            var scrollHeight = messageThreadNode.scrollHeight;
            messageThreadNode.scrollTop = scrollHeight;
        });
    },
    _clickSend() {
        logger.log("ChatWindow:_clickSend", "called...");
        this._addMessage(this.state.text.trim(), exampleUser);
        this.setState({
            text: ""
        });
    },
    _handleChange(event) {
        logger.log("ChatWindow:_onChange", "called...", event);
        this.setState({
            text: event.target.value
        });
    },
    _addMessage(text, user) {
        logger.log("ChatWindow:_onChange", "called...text", text);
        ActionCreator.addUnconfirmedMessage(text, this.props.roomId, user);
    },
    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            let text = this.state.text.trim();
            if (text) {
                this._addMessage(text, exampleUser);
                logger.log("ChatWindow:_onKeyDown", "Enter key hit!");
                this.setState({
                    text: ""
                });
            }
        }
    },
    render() {
        logger.log("ChatWindow:render", "state", this.state);
        var self = this;
        var messages = Object.keys(this.state.messages)
            .sort(function(idFirst, idSecond) {
                var objA = self.state.messages[idFirst];
                var objB = self.state.messages[idSecond];
                return objA.get("date") - objB.get("date");
            })
            .map(function(messageId, index) {
                var msg = self.state.messages[messageId];
                let classString = classNames("message", {
                    "message--unfirmed": msg.get("confirmed")
                });
                return (<div className={classString} key={index}>[{index}] 
                        <b>{msg.get("user").get("name")}:</b> {msg.get("text")}
                </div>);
            });
        return (<div className="chat-window">
          <h2>Chat window</h2>
          <header>{this.props.children}</header>  
          <div className={"messages-thread"} ref="messagesThread">{messages}</div>  
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
