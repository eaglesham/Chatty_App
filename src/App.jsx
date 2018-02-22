import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      numLoggedIn: 0
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

      switch(messageObj.type) {
        case "incomingMessage":        
          messages.push(messageObj)
          this.setState({messages: messages})
          break;
        case "incomingNotification":
          messages.push(messageObj)
          this.setState({messages: messages}) 
          break;
        case "clients":
          this.setState({numLoggedIn: messageObj.clientNum})
          break;
        default:
        throw new Error("Unknown event type " + messageObj.type)
      }
    }
  }


  handleMessage = (content) => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: content
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  handleName = (content) => {
   const newName = {
     type: "postNotification",
     username: this.state.currentUser.name,
     content: content
   }
   this.socket.send(JSON.stringify(newName));
   this.setState({currentUser: {name: content}})
  } 

  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="usersCount">{this.state.numLoggedIn} users online.</span>
      </nav>
      <MessageList messages = {this.state.messages} />
      <ChatBar username = {this.state.currentUser.name} handleMessage = {this.handleMessage} handleName = {this.handleName} />  
    </div>
  );
  }
}
export default App;
