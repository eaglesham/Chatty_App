import React, {Component} from 'react';

export default class ChatBar extends Component {
  render(props) {
    const username = this.props.username;

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={username} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}