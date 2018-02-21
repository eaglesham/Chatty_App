import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }
  
  componentDidMount() {
    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("simulating incoming message");
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage);
    //   this.setState({messages: messages})
    // }, 3000);
       // When this component mounts (gets added to the DOM)
    // Initiate a socket connection to our websocket server
    this.socket = new WebSocket("ws://localhost:3001");
    // When the socket opens, log a message to the console
    this.socket.onopen = e => {
      console.log("Connected to websocket");
    };

  }


  handleMessage = (content) => {
    console.log('AHHHHHHHHHH', this.state);
    const newMessage = {
      type: 'message',
      username: this.state.currentUser.name,
      content: content
    }
    let messages = this.state.messages
    messages.push(newMessage)
    this.setState({messages: messages})
  }

  render() {
    console.log("Rendering <App/>");
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages = {this.state.messages} />
      <ChatBar username = {this.state.currentUser.name} handleMessage = {this.handleMessage} />  
    </div>
  );
  }
}
export default App;
