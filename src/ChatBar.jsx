import React, {Component} from 'react';

export default class ChatBar extends Component {
  
  onKeyPress = (ev, props) => {
    if (ev.key === "Enter") {
      this.props.handleMessage(ev.target.value)
      ev.target.value = ""
    }
  }
  render(props) {
    const username = this.props.username;

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={username} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onKeyPress} />
      </footer>
    )
  }
}