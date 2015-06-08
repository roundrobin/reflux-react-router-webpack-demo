/*
 *
 * `ChatWindow` component
 *    
 * This view shows how to implement a set ofstate which has some of it's data derrive
 * from a store and some of the data add locally. In this example the state of 
 * the HTML input field is kept locally, but the messages come from the 
 * `ChatMessagesStore`.
 *
 * Usage:
 * ```
 *   <ChatWindow roomId="123" />
 * ```  
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
import ImmutableRenderMixin from 'react-immutable-render-mixin';
//==============================================================================
// Internal dependencies
//==============================================================================
import ActionCreator from '../actions/ActionCreator.js';
import AsyncActionCreator from '../actions/AsyncActionCreator.js';
import ChatMessagesStore from '../stores/ChatMessagesStore.js';
let PureRenderMixin  = React.addons.PureRenderMixin;

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
    shouldComponentUpdate(nextProps, nextState){
        // Shows an example on how to override `shouldComponentUpdate` to avoid 
        // uneccessary renders.
        // var sameProps = JSON.stringify(this.props) === JSON.stringify(nextProps);
        // var sameState = nextState === this.state;
        // return !(sameProps && sameState);
        return true;;
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
        // The user hit the "Send button" button.
        logger.log("ChatWindow:_clickSend", "called...");
        this._addMessage(this.state.text.trim(), exampleUser);

        // Reset the reply box
        this.setState({
            text: ""
        });
    },
    _handleChange(event) {
        // The user typed in characters in the reply box.
        logger.log("ChatWindow:_onChange", "called...", event);
        this.setState({
            text: event.target.value
        });
    },
    _addMessage(text, user) {
        // The enter key was hit, so we trigger an action!
        logger.log("ChatWindow:_onChange", "called...text", text);
        ActionCreator.addUnconfirmedMessage(text, this.props.roomId, user);
    },
    _onKeyDown(event) {
        // The user typed in any character.
        if (event.keyCode === ENTER_KEY_CODE) {
            // The ENTER key was pressed
            event.preventDefault();
            let text = this.state.text.trim();
            // If there is any text in the text box, add it to the chat messages.
            if (text) {
                this._addMessage(text, exampleUser);
                logger.log("ChatWindow:_onKeyDown", "Enter key hit!");
                // After adding the message to the chat messages DIV we can
                // clear out the text state.
                this.setState({
                    text: ""
                });
            }
        }
    },
    render() {
        logger.log("ChatWindow:render", "state", this.state);
        var self = this;

        // First sort all the chat messages by date.
        // Next it creates a collection of chat messages markup.
        var messages = Object.keys(this.state.messages)
            .sort(function sortMsgByDate(idFirst, idSecond) {
                var objA = self.state.messages[idFirst];
                var objB = self.state.messages[idSecond];
                return objA.get("date") - objB.get("date");
            })
            .map(function mapKeys(messageId, index) {
                var msg = self.state.messages[messageId];
                let classString = classNames("message", {
                    "message--unfirmed": msg.get("confirmed")
                });
                return (
                    <div className={classString} key={index}>[{index}][<em>{msg.get("id")}</em>] 
                        <b>{msg.get("user").get("name")}:</b> {msg.get("text")}
                    </div>
                );
            });

        return (<div className="chat-window">
          <h2>Chat window</h2>
          <header>Open rooms: {this.props.roomId}</header>  
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
