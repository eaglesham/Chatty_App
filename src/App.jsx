import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
  }
  
  componentDidMount() {
    // When this component mounts (gets added to the DOM)
    // Initiate a socket connection to our websocket server
    this.socket = new WebSocket("ws://localhost:3001");
    // When the socket opens, log a message to the console
    this.socket.onopen = e => {
      console.log("Connected to websocket");
    };
    
    this.socket.onmessage = (event) => {
      let messageObj = JSON.parse(event.data);
      let messages = this.state.messages;
      
      messages.push(messageObj)
      this.setState({messages: messages})
      }
  }


  handleMessage = (content) => {
    const newMessage = {
      type: 'message',
      username: this.state.currentUser.name,
      content: content
    }
    this.socket.send(JSON.stringify(newMessage))
  }

  handleName = (content) => {
   this.setState({currentUser: {name: content}})
  }

  render() {
    console.log("Rendering <App/>");
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages = {this.state.messages} />
      <ChatBar username = {this.state.currentUser.name} handleMessage = {this.handleMessage} handleName = {this.handleName} />  
    </div>
  );
  }
}
export default App;
