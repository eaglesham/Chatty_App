import React, {Component} from 'react';

export default class Message extends Component {
  render() {
    if(this.props.type === "incomingNotification") {
      return (
      <div className="message system">
        {this.props.content}.
      </div>
      )
    }   
    if(this.props.type === "incomingMessage") { 
      return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
      )
    }
  }
}