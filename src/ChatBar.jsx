import React, {Component} from 'react';

export default class ChatBar extends Component {

  messageSubmit = (ev, props) => {
    if (ev.key === "Enter") {
      this.props.handleMessage(ev.target.value)
      ev.target.value = ""
    }
  }

  nameChange = (ev, props) => {
    if (ev.key === "Enter") {
      this.props.handleName(ev.target.value);
    }
  }

  render(props) {
    const username = this.props.username;

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={username} onKeyPress={this.nameChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.messageSubmit} />
      </footer>
    )
  }
}