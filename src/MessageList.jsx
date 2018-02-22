import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render(props) {
    const allMessages = this.props.messages.map((message, index) => {
      return (
        <Message type  = {message.type} username = {message.username} content = {message.content} key={index} />
      )
    });
      return (
        <main className="messages">
          {allMessages}
        </main>
        )

  }
}